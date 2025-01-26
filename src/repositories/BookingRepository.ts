import BookingModel from '../domain/schemas/TicketBooking/Booking';
import BaseRepositories from "./BaseRepository";

export default class BookingRepository extends BaseRepositories {
    constructor() {
        super();
    }

    public model() {
        return BookingModel;
    }
}
