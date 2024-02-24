import {
  EMAIL_REGEX,
  MOBILE_NUMBER_REGEX,
} from "../constants/AppConstant";
import * as Yup from "yup";

export const memberRegisterFormSchema = Yup.object().shape({
  vendorName: Yup.string().required("Vendor Name is mandatory"),
});
