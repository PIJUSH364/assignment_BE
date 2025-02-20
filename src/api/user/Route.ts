import express, { Request, Response } from "express";
import urlConstant from "../../domain/constants/urlConstant/urlConstant";
import CreateUserUseCase from "./CreateUser/CreateUserUseCase";
import GetUserUseCase from "./GetUser/GetUserUseCase";
import GetAllUserUseCase from "./GetAllUser/GetAllUserUseCase";
import UpdateUserUseCase from "./UpdateUser/UpdateUserUseCase";
import DeleteUserUseCase from "./DeleteUser/DeleteUserUseCase";
import SearchUserDataUseCase from "./SearchUserData/SearchUserDataUseCase";

const router = express.Router();

router.post(urlConstant.user.create_user, async (request: Request, response: Response) => {
  const useCase = CreateUserUseCase.create(request, response);
  await useCase.executeAndHandleErrors();
});
router.get(urlConstant.user.get_user, async (request: Request, response: Response) => {
  const useCase = GetUserUseCase.create(request, response);
  await useCase.executeAndHandleErrors();
});
router.get(urlConstant.user.get_all_user, async (request: Request, response: Response) => {
  const useCase = GetAllUserUseCase.create(request, response);
  await useCase.executeAndHandleErrors();
});
router.put(urlConstant.user.update_user, async (request: Request, response: Response) => {
  const useCase = UpdateUserUseCase.create(request, response);
  await useCase.executeAndHandleErrors();
});
router.delete(urlConstant.user.delete_user, async (request: Request, response: Response) => {
  const useCase = DeleteUserUseCase.create(request, response);
  await useCase.executeAndHandleErrors();
});
router.get(urlConstant.user.search_user_details, async (request: Request, response: Response) => {
  const useCase = SearchUserDataUseCase.create(request, response);
  await useCase.executeAndHandleErrors();
});

export default router;
