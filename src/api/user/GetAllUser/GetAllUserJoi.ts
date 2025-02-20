import Joi from "joi";
import ErrorUtility from "../../../domain/constants/message/ErrorUtility";

const CreateUserJoi = Joi.object({
  name: Joi.string().required().messages(ErrorUtility.joiHelper("name", "string", false)),
  email: Joi.string().email().messages(ErrorUtility.joiHelper("email", "email", false)),
  role: Joi.string().valid("admin", "member").messages(ErrorUtility.joiHelper("role", "string", false)),
});

export default CreateUserJoi;
