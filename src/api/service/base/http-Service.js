export class HttpService {
  async get(url, options = {}) {
    const requestUrl = new URL(url, window.location.origin);

    if (options.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          requestUrl.searchParams.set(key, value);
        }
      });
    }

    const response = await fetch(requestUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed (${response.status})`);
    }

    return response.json();
  }

  async post(url, body = {}) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Request failed (${response.status})`);
    }

    return response.json();
  }

  async getValidated(url, responseSchema, options = {}) {
    const response = await this.get(url, options);

    return responseSchema.parse(response);
  }

  async postValidated(
    url,
    body,
    responseSchema,
    options = {},
  ) {
    const response = await this.post(url, body, options);

    return responseSchema.parse(response);
  }
}