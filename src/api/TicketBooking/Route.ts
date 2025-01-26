
import express, { Request, Response } from "express";
import urlConstant from '../../domain/constants/urlConstant/urlConstant';
import BookTicketUseCase from './BookTicket/BookTicketUseCase';

const router = express.Router();

router.post(urlConstant.tickets.book, async (request: Request, response: Response) => {
    const useCase = BookTicketUseCase.create(request, response);
    await useCase.executeAndHandleErrors();
});
export default router