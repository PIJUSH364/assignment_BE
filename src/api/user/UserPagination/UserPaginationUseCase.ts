import { Op } from "sequelize";
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

      // Ensure valid page and limit values
      const page = Math.max(Number(this.queryParams?.page) || 1, 1);
      const limit = Math.max(Number(this.queryParams?.pageSize) || 5, 1);
      const offset = (page - 1) * limit;

      const searchTerm = this.queryParams?.search?.trim();
      const role = this.queryParams?.role;
      const status = this.queryParams?.status;

      let condition = {};
      if (searchTerm) {
        condition = {
          ...condition,
          [Op.or]: [{ name: { [Op.iLike]: `%${searchTerm}%` } }, { email: { [Op.iLike]: `%${searchTerm}%` } }],
        };
      }

      // Filter by role and status
      if (role) condition["role"] = role;
      if (status) condition["status"] = status;

      // Execute query with pagination
      const { count, rows } = await this.userRepository.findAndCount({
        where: condition,
        offset,
        limit,
        order: [["createdAt", "DESC"]], // Optional: Sorting by newest
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
      console.error("UserPaginationUseCase Error:", error);
      throw error;
    }
  }
}
