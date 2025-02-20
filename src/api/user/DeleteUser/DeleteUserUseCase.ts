import { joiObjectEnum } from "../../../domain/enumerations/Enumerations";
import UserRepository from "../../../repositories/UserRepository";
import BaseUseCase from "../../BaseUseCase";
import DeleteUserJoi from "./DeleteUserJoi";

export default class DeleteUserUseCase extends BaseUseCase {
  private userRepository: UserRepository;
  constructor(request, response, userRepository: UserRepository) {
    super(request, response);
    this.userRepository = userRepository;
  }
  public static create(request, response) {
    return new DeleteUserUseCase(request, response, new UserRepository());
  }
  public async execute() {
    try {
      this.validate(joiObjectEnum.REQUEST_BODY, DeleteUserJoi);

      const data = await this.userRepository.softDelete({ where: { id: this.requestBody.id } });
      console.log(data);
      return {
        code: 200,
        message: "Delete user data successfully",
      };
    } catch (error) {
      throw error;
    }
  }
}
