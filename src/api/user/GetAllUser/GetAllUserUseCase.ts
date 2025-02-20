import UserRepository from "../../../repositories/UserRepository";
import BaseUseCase from "../../BaseUseCase";

export default class GetAllUserUseCase extends BaseUseCase {
  private userRepository: UserRepository;
  constructor(request, response, userRepository: UserRepository) {
    super(request, response);
    this.userRepository = userRepository;
  }

  public static create(request, response) {
    return new GetAllUserUseCase(request, response, new UserRepository());
  }

  public async execute() {
    try {
      const data = await this.userRepository.find();

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
