import { joiObjectEnum } from '../../../domain/enumerations/Enumerations';
import PassengerRepository from '../../../repositories/PassengerRepository';
import BaseUseCase from '../../BaseUseCase';
import CreatePassengerJoi from './CreatePassengerJoi';

interface requestBodyType {
    name: string,
    email: string,
    age: number,
    gender: string,
    hasSeniorCitizen?: boolean,
    hasChild?: boolean
}

export default class CreatePassengerUseCase extends BaseUseCase {
    private passengerRepository: PassengerRepository;
    protected requestBody: requestBodyType
    constructor(request, response, passengerRepository: PassengerRepository) {
        super(request, response);
        this.passengerRepository = passengerRepository;
    }

    public static create(request, response) {
        return new CreatePassengerUseCase(request, response, new PassengerRepository());
    }

    public async execute() {
        try {
            this.validate(joiObjectEnum.REQUEST_BODY, CreatePassengerJoi);

            if (this.requestBody.age >= 60) this.requestBody.hasSeniorCitizen = true
            if (this.requestBody.age <= 5) this.requestBody.hasChild = true

            const data = await this.passengerRepository.create(this.requestBody)

            return {
                code: 200,
                message: "create passenger data successfully",
                data
            };
        } catch (error) {
            throw error;
        }
    }
}
