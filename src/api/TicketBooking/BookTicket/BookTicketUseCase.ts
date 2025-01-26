import { Sequelize } from 'sequelize';
import { joiObjectEnum } from '../../../domain/enumerations/Enumerations';
import BookingRepository from '../../../repositories/BookingRepository';
import BaseUseCase from '../../BaseUseCase';
import BookTicketJoi from './BookTicketJoi';

export default class BookTicketUseCase extends BaseUseCase {
    private bookingRepository: BookingRepository;
    protected requestBody: any;

    constructor(request, response, bookingRepository) {
        super(request, response);
        this.bookingRepository = bookingRepository;
    }

    public static create(request, response) {
        return new BookTicketUseCase(request, response, new BookingRepository());
    }

    public async execute() {
        try {

            this.validate(joiObjectEnum.REQUEST_BODY, BookTicketJoi);
            const { passengerId, trainId, berthType } = this.requestBody;

            // Initialize booking data
            const bookingData = { passengerId, trainId, berthType };

            // Fetch booking counts grouped by status
            const bookingCounts = await this.bookingRepository.find({
                attributes: [
                    'status',
                    [Sequelize.cast(Sequelize.fn('COUNT', Sequelize.col('status')), 'integer'), 'count']
                ],
                where: { trainId },
                group: ['status']
            });

            // Convert booking counts to an object with status as keys
            const ticketCounts = bookingCounts.reduce((acc, { dataValues }) => {
                acc[dataValues.status] = dataValues.count;
                return acc;
            }, {});

            let bookedTicket = null;

            // Determine ticket status based on availability
            if ((ticketCounts["confirmed"] || 0) < 63) {
                bookedTicket = await this.bookingRepository.create({ ...bookingData, status: "confirmed" });
            } else if ((ticketCounts["rac"] || 0) < 9) {
                bookedTicket = await this.bookingRepository.create({ ...bookingData, status: "rac" });
            } else if ((ticketCounts["waiting"] || 0) < 10) {
                bookedTicket = await this.bookingRepository.create({ ...bookingData, status: "waiting" });
            }


            if (!bookedTicket) {
                return {
                    code: 400,
                    message: "No more tickets are available for booking.",
                    data: null
                };
            }

            return {
                code: 200,
                message: "Ticket booked successfully!",
                data: bookedTicket
            };

        } catch (error) {
            throw error
        }
    }
}
