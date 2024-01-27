// import React, { useEffect, useRef } from "react";
// import Slider from "react-slick-slider";
// import { Container, Row, Col } from "react-bootstrap";
// import {
//   Grid,
//   Typography,
//   CardMedia,
//   Card,
//   CardContent,
//   CardActionArea,
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import FMTypography from "components/FMTypography/FMTypography";
// import { Link, useNavigate } from "react-router-dom";
// import { Box, useMediaQuery } from "@mui/material";
// import ratingStart from "../../assets/ratingStart.svg";
// import { makeStyles } from "@mui/styles";
// import { getProductsDetail } from "Redux/Slices/ProductDetailPage/ProductDetailPageSlice";

// const useStyles = makeStyles((theme) => ({
//   textLimit: {
//     overflow: "hidden",
//     textOverflow: "ellipsis",
//     whiteSpace: "nowrap",
//     display: "-webkit-box",
//     "-webkit-line-clamp": 2,
//     "-webkit-box-orient": "vertical",
//   },
//   headingText: {
//     textAlign: "center",
//     fontSize: "40px",
//     fontWeight: "600",
//     paddingBottom: "1rem",
//   },
//   containerPadding: {
//     padding: "0px 65px 0px",
//     marginBottom: "40px",
//     [theme.breakpoints.down("sm")]: {
//       padding: "30px 20px 0",
//     },
//   },
// }));
// const SimilarProducts = ({ pId, setIsLoading }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const responsiveMobile = useMediaQuery("(max-width: 600px)");
//   const classes = useStyles();
//   const textRef = useRef(null);

//   useEffect(() => {
//     const element = textRef.current;
//     if (element) {
//       if (
//         element.scrollHeight > element.clientHeight ||
//         element.scrollWidth > element.clientWidth
//       ) {
//         element.classList.add("ellipsis"); // Add ellipsis class if overflow
//       }
//     }
//   }, []);

//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     draggable: true,
//     centerPadding: "0px",
//     autoplay: false,
//     arrows: true,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 2,
//           infinite: true,
//         },
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 2,
//           initialSlide: 2,
//           infinite: true,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 2,
//           infinite: true,
//         },
//       },
//     ],
//   };
//   const similarProductDetailedData = useSelector(
//     (state) => state?.getProductsDetail?.getProductsListData?.similarProducts
//   );

//   useEffect(() => {
//     if (
//       !similarProductDetailedData ||
//       similarProductDetailedData.length === 0
//     ) {
//       setIsLoading(true);
//       dispatch(getProductsDetail(pId))
//         .then(() => {
//           setIsLoading(false);
//         })
//         .catch(() => setIsLoading(false));
//     } else {
//       setIsLoading(false);
//     }
//   }, [dispatch, pId]);
//   const finalData =
//     (similarProductDetailedData && similarProductDetailedData) || [];

//   return (
//     <div className={classes.containerPadding}>
//       <Container fluid>
//         <Row className="m-0 p-0">
//           <Col md={12}>
//             <div className={classes.headingText}>
//               <h2>You May Also Like</h2>
//             </div>
//           </Col>

//           <Col md={12}>
//             <Slider {...settings}>
//               {finalData &&
//                 finalData?.map((elem, index) => (
//                   <div
//                     key={elem?._id}
//                     className="banner_img zoomin-img-hover"
//                     style={{
//                       padding: "10px 8px",
//                       display: "flex",
//                       justifyContent: "center",
//                       flexDirection: "column",
//                       alignItems: "center",
//                     }}
//                   >
//                     <Link to={`/product-detail/${elem?._id}`}>
//                       <Box key={index} style={{ position: "relative" }}>
//                         <Box
//                           sx={{
//                             backgroundColor: "#008539",
//                             top: "3%",
//                             display: "flex",
//                             alignItems: "center",
//                             width: "40px",
//                             height: "30px",
//                             justifyContent: "center",
//                             position: "absolute",
//                             left: "81%",
//                             zIndex: "111",
//                             borderRadius: "4px",
//                           }}
//                         >
//                           <img
//                             src={ratingStart}
//                             alt="rating-star"
//                             style={{ width: "14px", height: "auto" }}
//                           />
//                           <FMTypography
//                             displayText={Math.round(elem?.rating * 10) / 10}
//                             styleData={{
//                               color: "#FFFFFF",
//                               fontSize: "12px",
//                               fontWeight: "600",
//                             }}
//                           />
//                         </Box>
//                         <Card
//                           sx={{
//                             width: "250px",
//                             borderRadius: "20px",
//                             height: "auto",
//                           }}
//                         >
//                           <CardActionArea>
//                             <CardMedia
//                               className="not"
//                               component="img"
//                               style={{
//                                 height: "250px",
//                                 width: "100%",
//                                 borderRadius: "0",
//                               }}
//                               image={elem?.productPictures[0]?.img}
//                               alt={elem?.productPictures[0]?.imageAltText}
//                             />
//                             <CardContent>
//                               <Typography
//                                 ref={textRef}
//                                 className={`${classes.textLimit}`}
//                                 gutterBottom
//                                 variant="h5"
//                                 component="div"
//                                 sx={{
//                                   marginBottom: "0",
//                                   fontSize: "18px",
//                                   color: "#222222",
//                                   fontWeight: "500",
//                                   textTransform: "capitalize",
//                                 }}
//                               >
//                                 {elem?.name}
//                               </Typography>
//                               <span style={{ display: "flex" }}>
//                                 <del
//                                   style={{ fontSize: "14px", color: "#717171" }}
//                                 >
//                                   ₹ {elem?.actualPrice}
//                                 </del>

//                                 <Typography
//                                   sx={{
//                                     fontSize: "14px",
//                                     color: "#000000",
//                                     marginLeft: ".5rem",
//                                     fontWeight: "600",
//                                   }}
//                                 >
//                                   ₹ {elem?.discountPrice}
//                                 </Typography>
//                               </span>
//                               <Box
//                                 sx={{
//                                   display: "flex",
//                                   justifyContent: "space-between",
//                                 }}
//                               >
//                                 <Typography
//                                   variant="body2"
//                                   sx={{
//                                     color: "#717171",
//                                     fontWeight: "300",
//                                     textTransform: "capitalize",
//                                     padding: "2px 0",
//                                   }}
//                                 >
//                                   {elem?.deliveryDay}
//                                 </Typography>
//                                 <Typography
//                                   variant="body2"
//                                   sx={{ color: "#008539", fontWeight: "400" }}
//                                 >
//                                   Reviews {elem?.numReviews}
//                                 </Typography>
//                               </Box>
//                             </CardContent>
//                           </CardActionArea>
//                         </Card>
//                       </Box>

//                       {/* <Box className="banner_img">
//                                             <div className="background-overlay"></div>
//                                             <img src={elem?.productPictures[0].img} className="img-fluid" alt="" />
//                                             <div className="card_name">
//                                                 <h4>{elem?.name}</h4>
//                                                 <p>₹ {elem?.discountPrice}</p>
//                                             </div>
//                                         </Box> */}
//                     </Link>
//                   </div>
//                 ))}
//             </Slider>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default SimilarProducts;
import React, { useEffect, useRef } from "react";
import Slider from "react-slick-slider";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  CardMedia,
  Card,
  CardContent,
  CardActionArea,
  Box,
  useMediaQuery,
} from "@mui/material";
import FMTypography from "components/FMTypography/FMTypography";
import ratingStart from "../../assets/ratingStart.svg";
import { getProductsDetail } from "Redux/Slices/ProductDetailPage/ProductDetailPageSlice";
import { theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  bestseller: {
    padding: "50px 80px 20px",
    [theme.breakpoints.down("sm")]: {
      padding: "30px 20px 20px 20px",
    },
  },
  textLimit: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
  },
  headingText: {
    textAlign: "center",
    fontSize: "2.1875rem",
    fontWeight: 600,
    margin: 0,
    padding: "0 0 35px",
  },
  samecard: {
    "& .slick-slide img": {
      width: "225px",
      height: "300px",
      borderRadius: "20px",
      objectFit: "cover",
    },
    "& .slick-prev": {
      left: 0,
    },
    "& .slick-next": {
      right: "0px",
    },
    "& .slick-slide a": {
      display: "grid",
    },
    "& .slick-slide .card_name": {
      position: "absolute",
      bottom: "-5px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "100%",
    },
    "& .slick-slide .card_name h4": {
      color: "#fff",
      padding: "0 10px",
      fontSize: "1rem",
      fontWeight: 500,
    },
    "& .slick-slide .card_name p": {
      color: "#fff",
      padding: 0,
      fontSize: "1rem",
      fontWeight: 400,
      padding: "3px 0px",
    },
  },
}));

const SimilarProducts = ({ setIsLoading, pId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const textRef = useRef(null);

  useEffect(() => {
    const element = textRef.current;
    if (element) {
      if (
        element.scrollHeight > element.clientHeight ||
        element.scrollWidth > element.clientWidth
      ) {
        element.classList.add("ellipsis");
      }
    }
  }, []);
  const similarProductDetailedData = useSelector(
    (state) => state?.getProductsDetail?.getProductsListData?.similarProducts
  );

  useEffect(() => {
    if (
      !similarProductDetailedData ||
      similarProductDetailedData.length === 0
    ) {
      setIsLoading(true);
      dispatch(getProductsDetail(pId))
        .then(() => {
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [dispatch, pId]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    draggable: true,
    centerPadding: "0px",
    autoplay: false,
    arrows: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
    ],
  };

  const finalData =
    (similarProductDetailedData && similarProductDetailedData) || [];

  return (
    <div className={`${classes.bestseller} ${classes.samecard}`}>
      <Container fluid className="m-0 p-0">
        <Row>
          <Col md={12}>
            <div>
              <h3 className={classes.headingText}>You May Also Like This</h3>
            </div>
          </Col>
          <Col md={12} className="m-0 p-0">
            <Slider {...settings}>
              {finalData &&
                finalData?.map((elem, index) => (
                  <div
                    key={elem?._id}
                    className="banner_img zoomin-img-hover"
                    style={{
                      padding: "10px 8px",
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Link to={`/product-detail/${elem?._id}`}>
                      <Box key={index} style={{ position: "relative" }}>
                        <Box
                          sx={{
                            backgroundColor: "#008539",
                            top: "3%",
                            display: "flex",
                            alignItems: "center",
                            width: "40px",
                            height: "30px",
                            justifyContent: "center",
                            position: "absolute",
                            left: "81%",
                            zIndex: "111",
                            borderRadius: "4px",
                            "@media (max-width: 600px)": {
                              left: "73%", // Adjusted left position for mobile devices
                            },
                          }}
                        >
                          <img
                            src={ratingStart}
                            alt="rating-star"
                            style={{ width: "14px", height: "auto" }}
                          />
                          <FMTypography
                            displayText={Math.round(elem?.rating * 10) / 10}
                            styleData={{
                              color: "#FFFFFF",
                              fontSize: "12px",
                              fontWeight: "600",
                            }}
                          />
                        </Box>
                        <Card
                          style={{
                            width: "250px",
                            borderRadius: "20px",
                            height: "auto",
                            ...(window.innerWidth <= 600 && {
                              borderRadius: "20px",
                              height: "auto",
                              width: "180px",
                            }),
                          }}
                        >
                          <CardActionArea>
                            <CardMedia
                              component="img"
                              style={{
                                height: "250px",
                                width: "100%",
                                borderRadius: "0",
                                ...(window.innerWidth <= 600 && {
                                  height: "180px",
                                  width: "100%",
                                  borderRadius: "0",
                                }),
                              }}
                              image={elem?.productPictures[0]?.img}
                              alt={elem?.productPictures[0]?.imageAltText}
                            />
                            <CardContent>
                              <Typography
                                ref={textRef}
                                className={`${classes.textLimit}`}
                                gutterBottom
                                variant="h5"
                                component="div"
                                sx={{
                                  marginBottom: "0",
                                  fontSize: "18px",
                                  color: "#222222",
                                  fontWeight: "500",
                                  textTransform: "capitalize",
                                }}
                              >
                                {elem?.name}
                              </Typography>
                              <span style={{ display: "flex" }}>
                                <del
                                  style={{ fontSize: "14px", color: "#717171" }}
                                >
                                  ₹ {elem?.actualPrice}
                                </del>

                                <Typography
                                  sx={{
                                    fontSize: "14px",
                                    color: "#000000",
                                    marginLeft: ".5rem",
                                    fontWeight: "600",
                                  }}
                                >
                                  ₹ {elem?.discountPrice}
                                </Typography>
                              </span>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: "#717171",
                                    fontWeight: "300",
                                    textTransform: "capitalize",
                                    padding: "2px 0",
                                  }}
                                >
                                  {elem?.deliveryDay}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{ color: "#008539", fontWeight: "400" }}
                                >
                                  Reviews {elem?.numReviews}
                                </Typography>
                              </Box>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </Box>

                      {/* <Box className="banner_img">
                                            <div className="background-overlay"></div>
                                            <img src={elem?.productPictures[0].img} className="img-fluid" alt="" />
                                            <div className="card_name">
                                                <h4>{elem?.name}</h4>
                                                <p>₹ {elem?.discountPrice}</p>
                                            </div>
                                        </Box> */}
                    </Link>
                  </div>
                ))}
            </Slider>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SimilarProducts;
