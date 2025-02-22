import Joi from "joi";
import ErrorUtility from "../../../domain/constants/message/ErrorUtility";

const UserPaginationJoi = Joi.object({
  page: Joi.number().required().messages(ErrorUtility.joiHelper("page", "number", false)),
  pageSize: Joi.number().optional().messages(ErrorUtility.joiHelper("pageSize", "number", false)),
  search: Joi.string().allow("").optional().messages(ErrorUtility.joiHelper("search", "string", false)),
  role: Joi.string()
    .allow("admin", "super_admin", "member")
    .optional()
    .messages(ErrorUtility.joiHelper("role", "string", false)),
  status: Joi.string()
    .allow("active", "inactive")
    .optional()
    .messages(ErrorUtility.joiHelper("status", "string", false)),
});

export default UserPaginationJoi;
