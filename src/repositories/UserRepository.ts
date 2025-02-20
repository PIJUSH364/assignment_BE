import UserModel from "../domain/schemas/user/User";
import BaseRepositories from "./BaseRepository";

export default class UserRepository extends BaseRepositories {
  constructor() {
    super();
  }

  public model() {
    return UserModel;
  }
}
