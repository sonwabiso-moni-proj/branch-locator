import { delay, http, HttpResponse } from "msw";
import { setupWorker } from "msw/browser";

import { API_PATHS } from "../../constants/api-paths";
console.info("🟡 USING MOCK SERVICE (Branch Locator)");

const branches = [
  {
    id: "1",
    name: "Sandton City Branch",
    province: "Gauteng",
    address: {
      street: "5 Rivonia Road",
      suburb: "Sandton",
      city: "Johannesburg",
      province: "Gauteng",
      postalCode: "2196",
    },
    coordinates: {
      latitude: -26.1076,
      longitude: 28.0567,
    },
    languages: ["English", "Zulu", "Xitsonga"],
    facilities: [
      "Parking",
      "ATM",
      "Wheelchair Access",
      "WiFi",
    ],
    services: [
      "Loans",
      "Insurance",
      "Savings",
      "Account Opening",
    ],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0115550101",
      email: "sandton@bank.co.za",
    },
    rating: 4.8,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "09:00", level: "Busy" },
        { time: "10:00", level: "Very Busy" },
        { time: "14:00", level: "Moderate" },
      ],
    },
    imageUrl: null,
    notes: "Located inside Sandton City Mall.",
  },

  {
    id: "2",
    name: "Rosebank Branch",
    province: "Gauteng",
    address: {
      street: "50 Oxford Road",
      suburb: "Rosebank",
      city: "Johannesburg",
      province: "Gauteng",
      postalCode: "2196",
    },
    coordinates: {
      latitude: -26.1466,
      longitude: 28.0418,
    },
    languages: ["English", "Zulu", "Sotho"],
    facilities: [
      "Parking",
      "ATM",
      "WiFi",
    ],
    services: [
      "Savings",
      "Insurance",
      "Account Opening",
    ],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0115550102",
      email: "rosebank@bank.co.za",
    },
    rating: 4.6,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "09:00", level: "Moderate" },
        { time: "12:00", level: "Busy" },
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "3",
    name: "Menlyn Branch",
    province: "Gauteng",
    address: {
      street: "12 Atterbury Road",
      suburb: "Menlyn",
      city: "Pretoria",
      province: "Gauteng",
      postalCode: "0181",
    },
    coordinates: {
      latitude: -25.785,
      longitude: 28.276,
    },
    languages: [
      "English",
      "Xitsonga",
      "Afrikaans",
    ],
    facilities: [
      "Parking",
      "ATM",
      "Wheelchair Access",
    ],
    services: [
      "Loans",
      "Savings",
    ],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0125550103",
      email: "menlyn@bank.co.za",
    },
    rating: 4.5,
    isOpen: false,
    busyTimes: {
      Monday: [
        { time: "09:00", level: "Busy" },
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "4",
    name: "Cape Town CBD Branch",
    province: "Western Cape",
    address: {
      street: "80 Adderley Street",
      suburb: "CBD",
      city: "Cape Town",
      province: "Western Cape",
      postalCode: "8001",
    },
    coordinates: {
      latitude: -33.9249,
      longitude: 18.4241,
    },
    languages: [
      "English",
      "Afrikaans",
      "Xhosa",
    ],
    facilities: [
      "Parking",
      "ATM",
      "WiFi",
      "Wheelchair Access",
    ],
    services: [
      "Loans",
      "Insurance",
      "Savings",
      "Account Opening",
    ],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0215550104",
      email: "capetown@bank.co.za",
    },
    rating: 4.9,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "09:00", level: "Very Busy" },
        { time: "15:00", level: "Busy" },
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "5",
    name: "Century City Branch",
    province: "Western Cape",
    address: {
      street: "Century Boulevard",
      suburb: "Century City",
      city: "Cape Town",
      province: "Western Cape",
      postalCode: "7441",
    },
    coordinates: {
      latitude: -33.8938,
      longitude: 18.508,
    },
    languages: [
      "English",
      "Afrikaans",
    ],
    facilities: [
      "Parking",
      "ATM",
    ],
    services: [
      "Savings",
      "Insurance",
      "Account Opening",
    ],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0215550105",
      email: "centurycity@bank.co.za",
    },
    rating: 4.3,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "11:00", level: "Moderate" },
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "6",
    name: "Durban Central Branch",
    province: "KwaZulu-Natal",
    address: {
      street: "101 Dr Pixley KaSeme Street",
      suburb: "CBD",
      city: "Durban",
      province: "KwaZulu-Natal",
      postalCode: "4001",
    },
    coordinates: {
      latitude: -29.8587,
      longitude: 31.0218,
    },
    languages: [
      "English",
      "Zulu",
    ],
    facilities: [
      "ATM",
      "Parking",
      "Wheelchair Access",
    ],
    services: [
      "Loans",
      "Savings",
      "Insurance",
    ],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0315550106",
      email: "durban@bank.co.za",
    },
    rating: 4.5,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "09:00", level: "Busy" },
        { time: "13:00", level: "Moderate" },
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "7",
    name: "Umhlanga Branch",
    province: "KwaZulu-Natal",
    address: {
      street: "1 Lighthouse Road",
      suburb: "Umhlanga",
      city: "Durban",
      province: "KwaZulu-Natal",
      postalCode: "4320",
    },
    coordinates: {
      latitude: -29.7266,
      longitude: 31.0845,
    },
    languages: [
      "English",
      "Zulu",
    ],
    facilities: [
      "Parking",
      "ATM",
      "WiFi",
    ],
    services: [
      "Savings",
      "Account Opening",
    ],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0315550107",
      email: "umhlanga@bank.co.za",
    },
    rating: 4.7,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "10:00", level: "Moderate" },
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "8",
    name: "Gqeberha Branch",
    province: "Eastern Cape",
    address: {
      street: "25 Govan Mbeki Avenue",
      suburb: "Central",
      city: "Gqeberha",
      province: "Eastern Cape",
      postalCode: "6001",
    },
    coordinates: {
      latitude: -33.9608,
      longitude: 25.6022,
    },
    languages: [
      "English",
      "Xhosa",
    ],
    facilities: [
      "ATM",
      "Parking",
    ],
    services: [
      "Loans",
      "Savings",
      "Insurance",
    ],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0415550108",
      email: "gqeberha@bank.co.za",
    },
    rating: 4.2,
    isOpen: false,
    busyTimes: {},
    imageUrl: null,
    notes: null,
  },

  {
    id: "9",
    name: "Bloemfontein Branch",
    province: "Free State",
    address: {
      street: "155 Nelson Mandela Drive",
      suburb: "Westdene",
      city: "Bloemfontein",
      province: "Free State",
      postalCode: "9301",
    },
    coordinates: {
      latitude: -29.1183,
      longitude: 26.2299,
    },
    languages: [
      "English",
      "Sotho",
      "Afrikaans",
    ],
    facilities: [
      "ATM",
      "Parking",
      "Wheelchair Access",
    ],
    services: [
      "Loans",
      "Savings",
      "Insurance",
      "Account Opening",
    ],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0515550109",
      email: "bloem@bank.co.za",
    },
    rating: 4.4,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "09:00", level: "Busy" },
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "10",
    name: "Polokwane Branch",
    province: "Limpopo",
    address: {
      street: "45 Market Street",
      suburb: "CBD",
      city: "Polokwane",
      province: "Limpopo",
      postalCode: "0700",
    },
    coordinates: {
      latitude: -23.9045,
      longitude: 29.4689,
    },
    languages: [
      "English",
      "Xitsonga",
      "Sepedi",
    ],
    facilities: [
      "Parking",
      "ATM",
      "WiFi",
    ],
    services: [
      "Savings",
      "Loans",
      "Insurance",
    ],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0155550110",
      email: "polokwane@bank.co.za",
    },
    rating: 4.1,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "10:00", level: "Moderate" },
      ],
    },
    imageUrl: null,
    notes: null,
  },
];

/* ------------------------------------------------------------------
   Branch Locator Mock Endpoints
-------------------------------------------------------------------*/

export const branchLocatorService = [

      /**
   * ------------------------------------------------------------------
   * GET /v1/branches
   * ------------------------------------------------------------------
   */
  http.get(API_PATHS.BRANCHES, async ({ request }) => {
    await delay(800);

    const url = new URL(request.url);

    const simulateError = url.searchParams.get("simulateError");

    if (simulateError === "400") {
      return HttpResponse.json(
        {
          success: false,
          message: "Invalid request.",
        },
        {
          status: 400,
        },
      );
    }

    if (simulateError === "500") {
      return HttpResponse.json(
        {
          success: false,
          message: "Internal server error.",
        },
        {
          status: 500,
        },
      );
    }

    const province = url.searchParams.get("province");
    const language = url.searchParams.get("language");
    const facility = url.searchParams.get("facility");
    const service = url.searchParams.get("service");
    const search = url.searchParams.get("search");

    const page = Number(url.searchParams.get("page") || 1);
    const pageSize = Number(url.searchParams.get("pageSize") || 20);

    let filtered = [...branches];

    if (province) {
      filtered = filtered.filter(
        (branch) => branch.province === province,
      );
    }

    if (language) {
      filtered = filtered.filter((branch) =>
        branch.languages.includes(language),
      );
    }

    if (facility) {
      filtered = filtered.filter((branch) =>
        branch.facilities.includes(facility),
      );
    }

    if (service) {
      filtered = filtered.filter((branch) =>
        branch.services.includes(service),
      );
    }

    if (search) {
      const value = search.toLowerCase();

      filtered = filtered.filter(
        (branch) =>
          branch.name.toLowerCase().includes(value) ||
          branch.address.city.toLowerCase().includes(value) ||
          branch.address.suburb
            ?.toLowerCase()
            .includes(value),
      );
    }

    const total = filtered.length;

    const start = (page - 1) * pageSize;

    const end = start + pageSize;

    const paginatedBranches = filtered.slice(start, end);

    return HttpResponse.json({
      success: true,
      branches: paginatedBranches.map((branch) => ({
        id: branch.id,
        name: branch.name,
        province: branch.province,
        coordinates: branch.coordinates,
        address: `${branch.address.street}, ${branch.address.city}`,
        rating: branch.rating,
        isOpen: branch.isOpen,
      })),
      total,
      page,
      pageSize,
    });
  }),

  /**
   * ------------------------------------------------------------------
   * GET /v1/branches/:branchId
   * ------------------------------------------------------------------
   */
  http.get(
    `${API_PATHS.BRANCHES}/:branchId`,
    async ({ params, request }) => {
      await delay(600);

      const url = new URL(request.url);

      const simulateError =
        url.searchParams.get("simulateError");

      if (simulateError === "500") {
        return HttpResponse.json(
          {
            success: false,
            message: "Internal server error.",
          },
          {
            status: 500,
          },
        );
      }

      const branch = branches.find(
        (branch) => branch.id === params.branchId,
      );

      if (!branch) {
        return HttpResponse.json(
          {
            success: false,
            message: "Branch not found.",
          },
          {
            status: 404,
          },
        );
      }

      return HttpResponse.json({
        success: true,
        ...branch,
      });
    },
  ),
];
export const worker = setupWorker(...branchLocatorService);