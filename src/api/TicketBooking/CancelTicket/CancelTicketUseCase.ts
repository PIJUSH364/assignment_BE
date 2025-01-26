import { joiObjectEnum } from '../../../domain/enumerations/Enumerations';
import BookingRepository from '../../../repositories/BookingRepository';
import BaseUseCase from '../../BaseUseCase';
import CancelTicketJoi from './cancelTicketJoi';

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
        try {
            this.validate(joiObjectEnum.REQUEST_QUERY, CancelTicketJoi);
            const ticketId = this.pathParams.ticketId;

            // Perform a soft delete on the booking (mark as deleted but not permanently removed)
            const data = await this.bookingRepository.softDelete({ where: { id: ticketId } });

            if (!data) {
                throw new Error("Ticket not found or cannot be canceled");
            }


            return {
                code: 200,
                message: "Ticket canceled successfully",
                data,
            }

        } catch (error) {
            throw error;
        }
    }
}
