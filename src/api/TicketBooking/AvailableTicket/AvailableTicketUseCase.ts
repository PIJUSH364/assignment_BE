import { Sequelize } from 'sequelize';
import { joiObjectEnum } from '../../../domain/enumerations/Enumerations';
import BookingRepository from '../../../repositories/BookingRepository';
import BaseUseCase from '../../BaseUseCase';
import AvailableTicketJoi from './AvailableTicketJoi';



export default class AvailableTicketUseCase extends BaseUseCase {
    private bookingRepository: BookingRepository;

    constructor(request, response, bookingRepository) {
        super(request, response);
        this.bookingRepository = bookingRepository;
    }

    public static create(request, response) {
        return new AvailableTicketUseCase(request, response, new BookingRepository());
    }

    public async execute() {
        try {

            this.validate(joiObjectEnum.REQUEST_QUERY, AvailableTicketJoi);
            const { trainId } = this.pathParams;

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

            const confirmedAvailable = Math.max(63 - (ticketCounts['confirmed'] || 0), 0);
            const racAvailable = Math.max(9 - (ticketCounts['rac'] || 0), 0);
            const waitingAvailable = Math.max(10 - (ticketCounts['waiting'] || 0), 0);

            const response = { confirmedAvailable, racAvailable, waitingAvailable };

            if (confirmedAvailable <= 63 && confirmedAvailable > 0) {
                delete response.racAvailable;
                delete response.waitingAvailable;
            } else if (racAvailable <= 9 && racAvailable > 0) {
                delete response.waitingAvailable;
            }
            return {
                code: 200,
                message: 'All ticket statuses fetched successfully!',
                data: response
            };

        } catch (error) {
            throw error
        }
    }
}
