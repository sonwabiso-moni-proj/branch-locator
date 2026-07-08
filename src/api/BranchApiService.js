import { HttpService } from "./service/base/http-Service";
import { API_PATHS } from "./constants/api-paths";

import {
  GetBranchesRequestSchema,
  GetBranchesResponseSchema,
} from "./schemas/getBranches.schema";

import {
  GetBranchByIdParamsSchema,
  GetBranchByIdResponseSchema,
} from "./schemas/getBranchById.schema";

import {
  SearchNearbyBranchesRequestSchema,
  SearchNearbyBranchesResponseSchema,
} from "./schemas/searchNearbyBranches.schema";

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

  async searchNearbyBranches(request, opts) {
    const body = SearchNearbyBranchesRequestSchema.parse(request);

    return this.postValidated(
      API_PATHS.BRANCH_SEARCH,
      body,
      SearchNearbyBranchesResponseSchema,
      opts,
    );
  }
}

export const branchApiService = new BranchApiService();