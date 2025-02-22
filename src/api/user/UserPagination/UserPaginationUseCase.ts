import { joiObjectEnum } from "../../../domain/enumerations/Enumerations";
import UserRepository from "../../../repositories/UserRepository";
import BaseUseCase from "../../BaseUseCase";
import UserPaginationJoi from "./UserPaginationJoi";

export default class UserPaginationUseCase extends BaseUseCase {
  private userRepository: UserRepository;

  constructor(request, response, userRepository: UserRepository) {
    super(request, response);
    this.userRepository = userRepository;
  }

  public static create(request, response) {
    return new UserPaginationUseCase(request, response, new UserRepository());
  }

  public async execute() {
    try {
      this.validate(joiObjectEnum.REQUEST_QUERY, UserPaginationJoi);

      // Get page and limit from query params
      const page = Number(this.queryParams?.page) || 1;
      const limit = Number(this.queryParams?.pageSize) || 5;

      const offset = (page - 1) * limit; // Calculate offset

      const { count, rows } = await this.userRepository.findAndCount({
        offset,
        limit,
      });

      return {
        code: 200,
        message: "Get user data successfully",
        data: rows,
        pagination: {
          page,
          totalPages: Math.ceil(count / limit),
          totalRecords: count,
        },
      };
    } catch (error) {
      throw error;
    }
  }
}
