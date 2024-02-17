import {
  EMAIL_REGEX,
  MOBILE_NUMBER_REGEX,
} from "../constants/AppConstant";
import * as Yup from "yup";

export const memberRegisterFormSchema = Yup.object().shape({
  vendorName: Yup.string().required("Vendor Name is mandatory"),

  contactNumber: Yup.string()
    .required("Phone number is mandatory")
    .test("check_all_zero", "Phone number is invalid", (val) => +val > 0)
    .matches(MOBILE_NUMBER_REGEX, "Phone number is invalid")
    .max(10, "Phone number should not exceed 10 digits"),
  address: Yup.string().required("Address is mandatory"),

  email: Yup.string()
  .required("User name is mandatory")
  .matches(EMAIL_REGEX, "Please enter valid email")
  .min(6, "Username should be 6 to 100 characters long")
  .max(100, "Username should be 6 to 100 characters long"),
});
