import Joi from "joi";
import ErrorUtility from "../../../domain/constants/message/ErrorUtility";

const UserPaginationJoi = Joi.object({
  page: Joi.string().required().messages(ErrorUtility.joiHelper("page", "number", false)),
});

export default UserPaginationJoi;
