import TrainModel from '../domain/schemas/TicketBooking/Train';
import BaseRepositories from "./BaseRepository";

export default class TrainRepository extends BaseRepositories {
    constructor() {
        super();
    }

    public model() {
        return TrainModel;
    }
}
