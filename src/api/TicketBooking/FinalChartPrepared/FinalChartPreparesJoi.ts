import Joi from "joi";
import ErrorUtility from "../../../domain/constants/message/ErrorUtility";

const FinalChartPreparesJoi = Joi.object({
    trainId: Joi.number().messages(ErrorUtility.joiHelper("trainId", "number", false)),
});

export default FinalChartPreparesJoi;
