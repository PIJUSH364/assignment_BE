import { joiObjectEnum } from "../../../domain/enumerations/Enumerations";
import UserRepository from "../../../repositories/UserRepository";
import BaseUseCase from "../../BaseUseCase";
import UpdateUserJoi from "./UpdateUserJoi";

export default class UpdateUserUseCase extends BaseUseCase {
  private userRepository: UserRepository;
  constructor(request, response, userRepository: UserRepository) {
    super(request, response);
    this.userRepository = userRepository;
  }

  public static create(request, response) {
    return new UpdateUserUseCase(request, response, new UserRepository());
  }

  public async execute() {
    try {
      this.validate(joiObjectEnum.REQUEST_BODY, UpdateUserJoi);

      const data = await this.userRepository.update(this.requestBody, {
        where: { id: this.requestBody.id },
      });

      return {
        code: 200,
        message: "update user data successfully",
        data,
      };
    } catch (error) {
      throw error;
    }
  }
}
