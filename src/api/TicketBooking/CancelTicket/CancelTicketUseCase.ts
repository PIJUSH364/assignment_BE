import { joiObjectEnum } from '../../../domain/enumerations/Enumerations';
import BookingRepository from '../../../repositories/BookingRepository';
import BaseUseCase from '../../BaseUseCase';
import CancelTicketJoi from './CancelTicketJoi';

export default class CancelTicketUseCase extends BaseUseCase {
    private bookingRepository: BookingRepository;

    constructor(request, response, bookingRepository: BookingRepository) {
        super(request, response);
        this.bookingRepository = bookingRepository;
    }

    public static create(request, response) {
        return new CancelTicketUseCase(request, response, new BookingRepository());
    }

    public async execute() {
        const transaction = await this.bookingRepository.sequelize.transaction();
        try {
            this.validate(joiObjectEnum.REQUEST_QUERY, CancelTicketJoi);
            const ticketId = this.pathParams.ticketId;

            // Fetch the ticket to be canceled
            const ticket = await this.bookingRepository.findOne({ where: { id: ticketId }, transaction });

            if (!ticket) {
                throw new Error("Ticket not found or cannot be canceled");
            }

            const ticketStatus = ticket.status;

            // Perform a soft delete on the ticket
            const cancelTicket = await this.bookingRepository.softDelete(
                { where: { id: ticketId } },
                { transaction }
            );

            if (!cancelTicket) {
                throw new Error("Failed to cancel ticket. Please try again later.");
            }

            // Handle ticket reallocation based on the canceled ticket's status
            if (ticketStatus === 'confirmed') {
                await this.bookingRepository.promoteRacToConfirmed();
            } else if (ticketStatus === 'rac') {
                await this.bookingRepository.promoteWaitingToRac();
            }

            // Commit the transaction if everything is successful
            await transaction.commit();

            return {
                code: 200,
                message: "Ticket canceled successfully",
            };
        } catch (error) {
            // Rollback the transaction if something goes wrong
            await transaction.rollback();
            throw error;
        }
    }
}
