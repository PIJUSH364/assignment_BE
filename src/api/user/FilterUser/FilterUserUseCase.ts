import { joiObjectEnum } from "../../../domain/enumerations/Enumerations";
import UserRepository from "../../../repositories/UserRepository";
import BaseUseCase from "../../BaseUseCase";
import FilterUserJoi from "./FilterUserJoi";

export default class FilterUserUseCase extends BaseUseCase {
  private userRepository: UserRepository;
  constructor(request, response, userRepository: UserRepository) {
    super(request, response);
    this.userRepository = userRepository;
  }

  public static create(request, response) {
    return new FilterUserUseCase(request, response, new UserRepository());
  }

  public async execute() {
    try {
      this.validate(joiObjectEnum.REQUEST_QUERY, FilterUserJoi);

      const data = await this.userRepository.find({
        where: {
          role: this.queryParams?.role,
        },
      });

      return {
        code: 200,
        message: "Get all user data successfully",
        data,
      };
    } catch (error) {
      throw error;
    }
  }
}
