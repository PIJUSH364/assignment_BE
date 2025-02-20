import Joi from "joi";
import ErrorUtility from "../../../domain/constants/message/ErrorUtility";

const UpdateUserJoi = Joi.object({
  id: Joi.string().required().messages(ErrorUtility.joiHelper("id", "number", false)),
  name: Joi.string().optional().messages(ErrorUtility.joiHelper("name", "string", false)),
  email: Joi.string().optional().email().messages(ErrorUtility.joiHelper("email", "email", false)),
  role: Joi.string().optional().valid("admin", "member").messages(ErrorUtility.joiHelper("role", "string", false)),
});

export default UpdateUserJoi;
