import * as Yup from "yup";
export const addReviewsSchema = Yup.object().shape({
  comment: Yup.string().required("comment is mandatory"),

//  name: Yup.string().required("name is required"),
  // .required("rating is mandatory")
  // .typeError("Security amount is mandatory"),
});
