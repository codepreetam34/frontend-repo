import { yupResolver } from "@hookform/resolvers/yup";
import { Box, CardContent, IconButton, Rating, TextField, Typography } from "@mui/material";
import FMButton from "../../components/FMButton/FMButton";
import FMTypography from "../../components/FMTypography/FMTypography";
import Header from "../../components/SearchBar/Header";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { addReviews, checkProductPurchase } from "../../Redux/Slices/AddReviewSlice/AddReviewSlice";
import { commonStyle } from "../../Styles/commonStyles";
import uploadReview from "../../assets/upload-review.svg";
import { addReviewsSchema } from "../../validationSchema/addReviewsSchema";
import StarIcon from "@mui/icons-material/Star";
import Footer from "../../components/Footer/Footer";

const AddReview = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  const { pId } = params;
  const productName = location.state.productName;
  const totalReviews = location.state.totalReviews;
  const totalRating = location.state.totalRating;
  const [value, setValue] = useState(0);
  const [notLoginInfo, setNotLoginInfo] = useState(false);
  const [notNotPurchase, setNotPurchase] = useState(false);
  const [hover, setHover] = React.useState(-1);
  const [imagePreview, setImagePreview] = useState(null);
  const [reviewImage, setReviewImage] = useState(null);
  const personLoggedIn = JSON.parse(
    localStorage.getItem("Sidebar_Module_Assigned")
  );
  const fullName = JSON.parse(
    localStorage.getItem("Sidebar_Module_Assigned")
  )?.fullName;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addReviewsSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (personLoggedIn?._id) {
      dispatch(checkProductPurchase(pId))
        .unwrap()
        .then((res) => {
          if (res) {

          }
          else {

          }
        });
    }
    else {
      setNotLoginInfo(true)
    }
  }, [])

  const checkProductPurchaseResponse = useSelector(
    (state) => state?.addReviews?.checkProductPurchase
  );

  const onSubmit = (data) => {

    let payload = {
      rating: value,
      comment: data.review,
      name: fullName,
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setReviewImage(file);
    setImagePreview(URL.createObjectURL(file));
  };
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
                    displayText={totalRating ? `${totalRating} ratings ` : "0 rating"}
                    styleData={{ fontSize: "20px" }}
                  />
                  <FMTypography
                    displayText={totalReviews ? `${totalReviews} reviews` : "0 review"}
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
              {
                notLoginInfo && notLoginInfo ? <>  <Box>
                  <Box>
                    <Card
                      sx={{
                        width: "260px",
                        borderRadius: "20px",
                      }}
                    >
                      <CardContent style={{ height: "4rem", textAlign: "center" }}>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          sx={{ fontSize: "18px", color: "#801317" }}
                        >
                          You must log in before being able to submit a review.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>

                </Box> </> :
                  checkProductPurchaseResponse && checkProductPurchaseResponse?.purchase ?
                    <>

                      <Box sx={{
                        border: "1px solid #000",
                        borderRadius: "20px",
                        padding: "1rem"
                      }}>
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

                        <Box>
                          <FMTypography
                            displayText={"Review this product"}
                            styleData={{ fontSize: "32px", marginTop: "40px" }}
                          />
                          <TextField
                            id="outlined-multiline-static"
                            // label="Multiline"
                            placeholder="Comment"
                            multiline
                            rows={4}
                            fullWidth
                            sx={{
                              marginTop: "1rem",
                              border: "1px solid #C4C4C4",
                              borderRadius: "10px",
                              //   "&:hover": { border: "1px solid #C4C4C4" },
                            }}
                            {...register("comment")}
                            error={errors.comment ? true : false}
                          />
                          <FMTypography
                            styleData={commonStyle.errorText}
                            displayText={errors.comment?.message}
                          />
                        </Box>

                        <Box>
                          <FMTypography
                            displayText={"Upload a picture"}
                            styleData={{ fontSize: "32px", marginTop: "20px" }}
                          />
                          <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="label"
                          >

                            <input hidden accept="image/*" type="file" onChange={handleImageChange} />

                            <img
                              src={uploadReview}
                              alt="upload-icon"
                              style={{ width: "48px", height: "48px" }}
                            />
                          </IconButton>
                          <Col md={12} className="mb-4">
                            {imagePreview && (
                              <div className="">
                                <div className="mb-2">{`Image Preview`} </div>
                                <div style={{ width: "100%", height: "300px" }}>
                                  <img
                                    src={imagePreview}
                                    alt="categoryImage"
                                    style={{ maxWidth: "100%", height: "300px" }}
                                  />{" "}
                                </div>
                              </div>
                            )}
                          </Col>
                        </Box>
                      </Box>
                      <Col className="pt-4">
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
                    </> : <>

                      <Box>
                        <Box>
                          <Card
                            sx={{
                              width: "260px",
                              borderRadius: "20px",
                            }}
                          >
                            <CardContent style={{ height: "4rem", textAlign: "center" }}>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                                sx={{ fontSize: "18px", color: "#801317" }}
                              >
                                {checkProductPurchaseResponse?.message}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Box>

                      </Box>

                    </>}



            </Box>


          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default AddReview;
