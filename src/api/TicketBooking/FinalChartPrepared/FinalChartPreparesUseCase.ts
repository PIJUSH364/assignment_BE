import { Op, Sequelize } from 'sequelize';
import { joiObjectEnum } from '../../../domain/enumerations/Enumerations';
import BookingRepository from '../../../repositories/BookingRepository';
import BaseUseCase from '../../BaseUseCase';
import FinalChartPreparesJoi from './FinalChartPreparesJoi';
import PassengerModel from '../../../domain/schemas/TicketBooking/Passenger';
import TrainRepository from '../../../repositories/TrainRepository';
import { randomInt } from 'crypto'; // Import for random number generation
export default class FinalChartPreparesUseCase extends BaseUseCase {
    private bookingRepository: BookingRepository;
    private trainRepository: TrainRepository;
    constructor(request, response, bookingRepository: BookingRepository, trainRepository: TrainRepository) {
        super(request, response);
        this.bookingRepository = bookingRepository;
        this.trainRepository = trainRepository;
    }

    public static create(request, response) {
        return new FinalChartPreparesUseCase(request, response, new BookingRepository(), new TrainRepository());
    }


    public async execute() {
        try {
            this.validate(joiObjectEnum.REQUEST_QUERY, FinalChartPreparesJoi);
            const { trainId } = this.pathParams;
            // total 63 confirm seat --> 27 lower and 27 upper and 9 side-upper
            // total 18 rac seat that hold 9 rac side-lower

            // Fetch train details
            const train = await this.trainRepository.find({ where: { id: trainId } });

            if (!train) {
                throw new Error("Train details not found");
            }

            // Allocate RAC tickets to side-lower berths
            await this.bookingRepository.update(
                {
                    isSeatAllocating: true,
                    berthType: "side-lower",
                },
                {
                    where: { trainId, status: 'rac' },
                }
            );

            // Allocate senior citizen seats to lower berths
            let [seniorCitizenCount] = await this.bookingRepository.update(
                {
                    isSeatAllocating: true,
                    berthType: "lower",

                },
                {
                    where: {
                        trainId,
                        status: 'confirmed',
                        isSeatAllocating: false,
                        berthType: "lower"// if preference is lower then only set as a lower bath 
                    },
                    include: [
                        {
                            model: PassengerModel,
                            as: 'passenger',
                            where: {
                                age: { [Op.gte]: "60" },
                            },
                            required: true,
                        },
                    ],
                    limit: 27,
                }
            );

            // Allocate remaining lower berths to women
            let remainingLowerBerths = 27 - seniorCitizenCount;
            if (remainingLowerBerths > 0) {
                let [womenCount] = await this.bookingRepository.update(
                    {
                        isSeatAllocating: true,
                        berthType: "lower",
                    },
                    {
                        where: {
                            trainId,
                            status: 'confirmed',
                            isSeatAllocating: false,
                            berthType: "lower"// if preference is lower then only set as a lower bath 
                        },
                        include: [
                            {
                                model: PassengerModel,
                                as: 'passenger',
                                where: { gender: "female" },
                                required: true,
                            },
                        ],
                        limit: remainingLowerBerths,
                    }
                );

                remainingLowerBerths -= womenCount;
            }

            // Fetch remaining unallocated tickets
            const remainingTickets = await this.bookingRepository.find({
                where: {
                    trainId,
                    status: 'confirmed',
                    isSeatAllocating: false,
                },
                limit: 63 - 27, // Total confirm seats minus allocated lower
            });

            // Allocate remaining tickets to upper and side-upper berths
            let upperBerthCount = 27;
            let sideUpperBerthCount = 9;


            for (const ticket of remainingTickets) {
                const availableBerths = [];

                // Add each berth type to the available options based on remaining count
                if (remainingLowerBerths > 0) availableBerths.push('lower');
                if (upperBerthCount > 0) availableBerths.push('upper');
                if (sideUpperBerthCount > 0) availableBerths.push('side-upper');

                // Randomly select a berth type from the available options
                const randomIndex = randomInt(availableBerths.length);
                const berthType = availableBerths[randomIndex];

                // Update the respective count based on the selected berth type
                switch (berthType) {
                    case 'lower':
                        remainingLowerBerths--;
                        break;
                    case 'upper':
                        upperBerthCount--;
                        break;
                    case 'side-upper':
                        sideUpperBerthCount--;
                        break;
                }

                // Update the booking record with the randomly selected berth type
                await this.bookingRepository.update(
                    {
                        isSeatAllocating: true,
                        berthType,
                    },
                    {
                        where: { id: ticket.id },
                    }
                );
            }

            const result = await this.bookingRepository.find({
                attributes: [
                    'berthType',
                    [Sequelize.cast(Sequelize.fn('COUNT', Sequelize.col('berthType')), 'integer'), 'count']
                ],
                where: { trainId, isSeatAllocating: true },
                group: ['berthType']
            });

            return {
                code: 200,
                message: "Chart prepared successfully",
                result
            };
        } catch (error) {
            throw error;
        }
    }

}
