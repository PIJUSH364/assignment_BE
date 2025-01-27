import Joi from "joi";
import ErrorUtility from "../../../domain/constants/message/ErrorUtility";

const BookTicketJoi = Joi.object({
    passengerId: Joi.number().messages(ErrorUtility.joiHelper("passengerId", "number", false)),
    trainId: Joi.number().messages(ErrorUtility.joiHelper("trainId", "number", false)),
    berthType: Joi.string().valid('lower', 'upper', 'side-lower', 'side-upper').messages(ErrorUtility.joiHelper("berthType", "string", false)),
});

export default BookTicketJoi;

