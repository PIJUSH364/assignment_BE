import Joi from "joi";
import ErrorUtility from "../../../domain/constants/message/ErrorUtility";

const UpdateUserJoi = Joi.object({
  id: Joi.string().required().messages(ErrorUtility.joiHelper("id", "number", false)),
  name: Joi.string().optional().messages(ErrorUtility.joiHelper("name", "string", false)),
  email: Joi.string().optional().email().messages(ErrorUtility.joiHelper("email", "email", false)),
  role: Joi.string()
    .optional()
    .allow("admin", "super_admin", "member")
    .messages(ErrorUtility.joiHelper("role", "string", false)),
  status: Joi.string()
    .optional()
    .allow("active", "inactive")
    .messages(ErrorUtility.joiHelper("status", "string", false)),
});

export default UpdateUserJoi;
