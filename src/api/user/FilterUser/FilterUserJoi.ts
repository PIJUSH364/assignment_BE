import Joi from "joi";
import ErrorUtility from "../../../domain/constants/message/ErrorUtility";

const FilterUserJoi = Joi.object({
  role: Joi.string()
    .required()
    .allow("admin", "manager", "member")
    .messages(ErrorUtility.joiHelper("role", "string", false)),
});

export default FilterUserJoi;
