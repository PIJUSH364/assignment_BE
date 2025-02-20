import { joiObjectEnum } from "../../../domain/enumerations/Enumerations";
import UserRepository from "../../../repositories/UserRepository";
import BaseUseCase from "../../BaseUseCase";
import CreateUserJoi from "./CreateUserJoi";

export default class CreateUserUseCase extends BaseUseCase {
  private userRepository: UserRepository;
  constructor(request, response, userRepository: UserRepository) {
    super(request, response);
    this.userRepository = userRepository;
  }

  public static create(request, response) {
    return new CreateUserUseCase(request, response, new UserRepository());
  }

  public async execute() {
    try {
      this.validate(joiObjectEnum.REQUEST_BODY, CreateUserJoi);

      const data = await this.userRepository.create(this.requestBody);

      return {
        code: 200,
        message: "create user data successfully",
        data,
      };
    } catch (error) {
      throw error;
    }
  }
}
