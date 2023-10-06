import { yupResolver } from "@hookform/resolvers/yup";
import { Box, IconButton, Rating, TextField } from "@mui/material";
import FMButton from "components/FMButton/FMButton";
import FMTypography from "components/FMTypography/FMTypography";
import Header from "components/SearchBar/Header";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { addReviews } from "Redux/Slices/AddReviewSlice/AddReviewSlice";
import { commonStyle } from "Styles/commonStyles";
import uploadReview from "../../assets/upload-review.svg";
import { addReviewsSchema } from "../../validationSchema/addReviewsSchema";
import StarIcon from "@mui/icons-material/Star";

const AddReview = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  const { pId } = params;
  const productName = location.state.productName;
  const totalReviews = location.state.totalReviews;
  const totalRating = location.state.totalRating;
  const [value, setValue] = useState(0);
  const [hover, setHover] = React.useState(-1);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addReviewsSchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    const personLoggedIn = JSON.parse(
      localStorage.getItem("Sidebar_Module_Assigned")
    )?.fullName;
    let payload = {
      rating: value,
      comment: data.review,
      name: personLoggedIn,
      id: pId,
    };
    dispatch(addReviews({ payload }))
      .unwrap()
      .then((res) => {
        if (res) {
          // navigate("/");
        }
      });
  };

  const labels = {
    // 0.5: 'Useless',
    1: "Useless",
    // 1.5: 'Poor',
    2: "Poor",
    // 2.5: 'Ok',
    3: "Ok",
    // 3.5: 'Good',
    4: "Good",
    // 4.5: 'Excellent',
    5: "Excellent",
  };

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col>
            <Box
              sx={{
                boxShadow:
                  "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
                borderRadius: "20px",
                marginTop: "24px",
                marginBottom: "24px",
                padding: "32px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <FMTypography
                displayText={"Ratings & Reviews"}
                styleData={{ fontSize: "40px" }}
              />
              <Box>
                <FMTypography
                  displayText={productName}
                  styleData={{ fontSize: "24px" }}
                />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <FMTypography
                    displayText={totalRating}
                    styleData={{ fontSize: "20px" }}
                  />
                  <FMTypography
                    displayText={`${totalReviews} reviews `}
                    styleData={{ fontSize: "20px" }}
                  />
                </Box>
              </Box>
            </Box>
          </Col>
        </Row>
        {/* box below */}
        <Row>
          <Col>
            <Box
              sx={{
                boxShadow:
                  "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
                borderRadius: "20px",
                marginTop: "24px",
                marginBottom: "24px",
                padding: "32px",
                //   display: "flex",
                //   justifyContent: "space-between",
              }}
            >
              <FMTypography
                displayText={"Rate this product"}
                styleData={{ fontSize: "32px" }}
              />

              <Box
                sx={{
                  width: 200,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Rating
                  name="hover-feedback"
                  value={value}
                  // precision={0.5}
                  getLabelText={getLabelText}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
                {value !== null && (
                  <Box sx={{ ml: 2 }}>
                    {labels[hover !== -1 ? hover : value]}
                  </Box>
                )}
                <FMTypography
                  styleData={commonStyle.errorText}
                  displayText={errors.rating?.message}
                />
              </Box>

              <FMTypography
                displayText={"Review this product"}
                styleData={{ fontSize: "32px", marginTop: "80px" }}
              />
              <TextField
                id="outlined-multiline-static"
                // label="Multiline"
                placeholder="Description"
                multiline
                rows={4}
                fullWidth
                sx={{
                  marginTop: "1rem",
                  border: "1px solid #C4C4C4",
                  borderRadius: "10px",
                  //   "&:hover": { border: "1px solid #C4C4C4" },
                }}
                {...register("review")}
                error={errors.review ? true : false}
              />
              <FMTypography
                styleData={commonStyle.errorText}
                displayText={errors.review?.message}
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <input hidden accept="image/*" type="file" />
                {/* <PhotoCamera /> */}
                <img
                  src={uploadReview}
                  alt="upload-icon"
                  style={{ width: "48px", height: "48px" }}
                />
              </IconButton>
            </Box>
          </Col>
        </Row>
        <Row>
          <Col>
            <FMButton
              displayText={"Submit"}
              variant={"contained"}
              styleData={{
                ...commonStyle.buttonStyles,
              }}
              onClick={handleSubmit(onSubmit)}
            />
            <input type={"submit"} hidden />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddReview;
