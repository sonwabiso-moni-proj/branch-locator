import { HttpService } from "../services/HttpService";
import { API_PATHS } from "../constants/apiPaths";

import {
  GetBranchesRequestSchema,
  GetBranchesResponseSchema,
} from "../schemas/branches/getBranches.schema";

import {
  GetBranchByIdParamsSchema,
  GetBranchByIdResponseSchema,
} from "../schemas/branches/getBranchById.schema";

export class BranchApiService extends HttpService {
  async getBranches(searchParams = {}, opts) {
    const params = GetBranchesRequestSchema.parse(searchParams);

    return this.getValidated(
      API_PATHS.BRANCHES,
      GetBranchesResponseSchema,
      {
        params,
        ...opts,
      },
    );
  }

  async getBranchById(branchId, opts) {
    GetBranchByIdParamsSchema.parse({
      branchId,
    });

    return this.getValidated(
      `${API_PATHS.BRANCHES}/${branchId}`,
      GetBranchByIdResponseSchema,
      opts,
    );
  }
}

export const branchApiService = new BranchApiService();