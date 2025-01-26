
import express, { Request, Response } from "express";
import urlConstant from '../../domain/constants/urlConstant/urlConstant';
import BookTicketUseCase from './BookTicket/BookTicketUseCase';
import CancelTicketUseCase from './CancelTicket/CancelTicketUseCase';

const router = express.Router();

router.post(urlConstant.tickets.book, async (request: Request, response: Response) => {
    const useCase = BookTicketUseCase.create(request, response);
    await useCase.executeAndHandleErrors();
});

router.post(urlConstant.tickets.cancel, async (request: Request, response: Response) => {
    const useCase = CancelTicketUseCase.create(request, response);
    await useCase.executeAndHandleErrors();
});
export default router