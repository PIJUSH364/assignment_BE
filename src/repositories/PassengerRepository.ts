import PassengerModel from '../domain/schemas/TicketBooking/Passenger';
import BaseRepositories from "./BaseRepository";

export default class PassengerRepository extends BaseRepositories {
    constructor() {
        super();
    }

    public model() {
        return PassengerModel;
    }
}
