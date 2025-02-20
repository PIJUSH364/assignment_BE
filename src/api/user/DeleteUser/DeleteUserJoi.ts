import Joi from "joi";
import ErrorUtility from "../../../domain/constants/message/ErrorUtility";

const DeleteUserJoi = Joi.object({
  id: Joi.string().required().messages(ErrorUtility.joiHelper("id", "number", false)),
});

export default DeleteUserJoi;
