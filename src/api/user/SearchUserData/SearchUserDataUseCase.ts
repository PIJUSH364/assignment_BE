import { Op } from "sequelize";
import { joiObjectEnum } from "../../../domain/enumerations/Enumerations";
import UserRepository from "../../../repositories/UserRepository";
import BaseUseCase from "../../BaseUseCase";
import SearchUserDataJoi from "./SearchUserDataJoi";

export default class SearchUserDataUseCase extends BaseUseCase {
  private userRepository: UserRepository;

  constructor(request, response, userRepository: UserRepository) {
    super(request, response);
    this.userRepository = userRepository;
  }

  public static create(request, response) {
    return new SearchUserDataUseCase(request, response, new UserRepository());
  }

  public async execute() {
    try {
      this.validate(joiObjectEnum.REQUEST_QUERY, SearchUserDataJoi);

      const searchTerm = this.queryParams?.search?.trim();

      const data = await this.userRepository.find({
        where: {
          [Op.or]: [
            { name: { [Op.iLike]: `%${searchTerm}%` } },
            { email: { [Op.iLike]: `%${searchTerm}%` } },
            // { role: { [Op.iLike]: `%${searchTerm}%` } },
          ],
        },
      });

      return {
        code: 200,
        message: "User data fetched successfully",
        data,
      };
    } catch (error) {
      console.error("Error searching users:", error);
      throw error;
    }
  }
}
