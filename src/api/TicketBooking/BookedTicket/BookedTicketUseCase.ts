import { joiObjectEnum } from '../../../domain/enumerations/Enumerations';
import BookingRepository from '../../../repositories/BookingRepository';
import BaseUseCase from '../../BaseUseCase';
import BookedTicketJoi from './BookedTicketJoi'
export default class BookedTicketUseCase extends BaseUseCase {
    private bookingRepository: BookingRepository;

    constructor(request, response, bookingRepository: BookingRepository) {
        super(request, response);
        this.bookingRepository = bookingRepository;
    }

    public static create(request, response) {
        return new BookedTicketUseCase(request, response, new BookingRepository());
    }

    public async execute() {
        try {
            this.validate(joiObjectEnum.REQUEST_QUERY, BookedTicketJoi);
            const { ticketId } = this.pathParams;

            const data = await this.bookingRepository.findOne({ where: { id: ticketId } });

            if (!data) throw new Error(`Ticket with ID ${ticketId} not found`);

            return {
                code: 200,
                message: "Ticket details fetched successfully",
                data
            };

        } catch (error) {
            throw error;
        }
    }
}
