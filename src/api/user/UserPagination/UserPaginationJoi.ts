import Joi from "joi";
import ErrorUtility from "../../../domain/constants/message/ErrorUtility";

const UserPaginationJoi = Joi.object({
  page: Joi.string().required().messages(ErrorUtility.joiHelper("page", "number", false)),
  pageSize: Joi.string().optional().messages(ErrorUtility.joiHelper("pageSize", "number", false)),
});

export default UserPaginationJoi;
