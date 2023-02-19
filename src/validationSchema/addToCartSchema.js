import * as Yup from "yup";

export const addToCartSchema = Yup.object().shape({
  pinCode: Yup.string().required("pincode is mandatory"),
  cakeMessage: Yup.string(),
});
