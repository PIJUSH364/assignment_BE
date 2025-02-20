import { joiObjectEnum } from "../../../domain/enumerations/Enumerations";
import UserRepository from "../../../repositories/UserRepository";
import BaseUseCase from "../../BaseUseCase";
import GetUserJoi from "./GetUserJoi";

export default class GetUserUseCase extends BaseUseCase {
  private userRepository: UserRepository;
  constructor(request, response, userRepository: UserRepository) {
    super(request, response);
    this.userRepository = userRepository;
  }

  public static create(request, response) {
    return new GetUserUseCase(request, response, new UserRepository());
  }

  public async execute() {
    try {
      this.validate(joiObjectEnum.REQUEST_PARAMS, GetUserJoi);

      const data = await this.userRepository.findOne({
        where: {
          id: this.pathParams?.id,
        },
      });

      if (!data) throw new Error("User not found");

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
