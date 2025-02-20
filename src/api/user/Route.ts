import express, { Request, Response } from "express";
import urlConstant from "../../domain/constants/urlConstant/urlConstant";
import CreatePassengerUseCase from "../Passenger/createPassenger/CreatePassengerUseCase";

const router = express.Router();

router.post(urlConstant.passenger.create_passenger, async (request: Request, response: Response) => {
  const useCase = CreatePassengerUseCase.create(request, response);
  await useCase.executeAndHandleErrors();
});
export default router;
