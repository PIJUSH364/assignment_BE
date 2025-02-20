import Joi from "joi";
import ErrorUtility from "../../../domain/constants/message/ErrorUtility";

const GetUserJoi = Joi.object({
  id: Joi.string().required().messages(ErrorUtility.joiHelper("id", "number", false)),
});

export default GetUserJoi;
