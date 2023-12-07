import * as Yup from "yup";
export const addReviewsSchema = Yup.object().shape({
  comment: Yup.string().required("comment is mandatory"),
  rating: Yup.string().required("rating is required"),
//  name: Yup.string().required("name is required"),
  // .required("rating is mandatory")
  // .typeError("Security amount is mandatory"),
});
