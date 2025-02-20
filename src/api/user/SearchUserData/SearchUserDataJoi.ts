import Joi from "joi";
import ErrorUtility from "../../../domain/constants/message/ErrorUtility";

const SearchUserDataJoi = Joi.object({
  search: Joi.string().required().messages(ErrorUtility.joiHelper("search", "string", false)),
});

export default SearchUserDataJoi;
