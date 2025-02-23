import Joi from "joi";
import ErrorUtility from "../../../domain/constants/message/ErrorUtility";

const DeleteUserJoi = Joi.object({
  ids: Joi.array().items(Joi.number().integer().required()).min(1).required(),
}).messages(ErrorUtility.joiHelper("ids", "array", false));

export default DeleteUserJoi;
