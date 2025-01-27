import { Sequelize } from 'sequelize';
import BookingModel from '../domain/schemas/TicketBooking/Booking';
import BaseRepositories from './BaseRepository';
import { postgresConnector } from '../core/utils/absoluteFilePath';

export default class BookingRepository extends BaseRepositories {
    public sequelize: Sequelize;

    constructor() {
        super();
        this.sequelize = postgresConnector;
    }

    public model() {
        return BookingModel;
    }

    // Promote the next waiting ticket to RAC
    public async promoteWaitingToRac(): Promise<void> {
        try {
            const nextWaitingTicket = await this.findOne({
                where: { status: 'waiting' },
                order: [['createdAt', 'ASC']],
            });

            if (nextWaitingTicket) {
                await this.update(
                    { status: 'rac' },
                    { where: { id: nextWaitingTicket.id } }
                );
                console.log(`Promoted ticket ${nextWaitingTicket.id} from waiting to RAC.`);
            }
        } catch (error) {
            console.error('Error promoting waiting ticket to RAC:', error);
        }
    }

    // Promote the next RAC ticket to confirmed
    public async promoteRacToConfirmed(): Promise<void> {
        try {
            const nextRacTicket = await this.findOne({
                where: { status: 'rac' },
                order: [['createdAt', 'ASC']], // Order by oldest RAC ticket
            });

            if (nextRacTicket) {
                await this.update(
                    { status: 'confirmed' },
                    { where: { id: nextRacTicket.id } }
                );
                console.log(`Promoted ticket ${nextRacTicket.id} from RAC to confirmed.`);

                // Continue promoting the waiting ticket to RAC
                await this.promoteWaitingToRac();
            }
        } catch (error) {
            console.error('Error promoting RAC ticket to confirmed:', error);
        }
    }
}
