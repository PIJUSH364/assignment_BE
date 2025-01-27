import Joi from "joi";
import ErrorUtility from "../../../domain/constants/message/ErrorUtility";

const BookedTicketJoi = Joi.object({
    ticketId: Joi.number().messages(ErrorUtility.joiHelper("ticketId", "number", false)),
});

export default BookedTicketJoi;
