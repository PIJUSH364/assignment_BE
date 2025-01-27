import Joi from "joi";
import ErrorUtility from "../../../domain/constants/message/ErrorUtility";

const CreatePassengerJoi = Joi.object({
    name: Joi.string().messages(ErrorUtility.joiHelper("name", "string", false)),
    email: Joi.string().email().messages(ErrorUtility.joiHelper("email", "email", false)),
    age: Joi.number().messages(ErrorUtility.joiHelper("age", "number", false)),
    gender: Joi.string().valid('male', 'female').messages(ErrorUtility.joiHelper("gender", "string", false)),
});

export default CreatePassengerJoi;
