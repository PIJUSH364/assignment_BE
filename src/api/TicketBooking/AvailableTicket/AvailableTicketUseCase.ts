import BookingRepository from '../../../repositories/BookingRepository';
import PassengerRepository from '../../../repositories/PassengerRepository';
import TrainRepository from '../../../repositories/TrainRepository';
import BaseUseCase from '../../BaseUseCase';

export default class UpdateContactUseCase extends BaseUseCase {

    private bookingRepository: BookingRepository;
    private passengerRepository: PassengerRepository;
    private trainRepository: TrainRepository;

    constructor(request, response, bookingRepository, passengerRepository, trainRepository) {
        super(request, response);
        this.bookingRepository = bookingRepository;
        this.passengerRepository = passengerRepository;
        this.trainRepository = trainRepository;
    }

    public static create(request, response) {
        return new UpdateContactUseCase(request, response, new BookingRepository(), new TrainRepository(), new PassengerRepository());
    }

    public async execute() {
        try {

            return {
                code: 200,
                message: "update Contact data successfully",
            };
        } catch (error) {
            throw error;
        }
    }
}
