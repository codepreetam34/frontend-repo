import * as Yup from "yup";
export const addReviewsSchema = Yup.object().shape({
  review: Yup.string().required("review is mandatory"),
  rating: Yup.string(),
  // .required("rating is mandatory")
  // .typeError("Security amount is mandatory"),
});
