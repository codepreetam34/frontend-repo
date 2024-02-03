import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import FMButton from "components/FMButton/FMButton";
import { getHomePageShopByOccasion } from "Redux/Slices/ShopByOccasion/ShopByOccasionSlice";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useMediaQuery } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  shopbyocca: {
    padding: "50px 80px 0",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      padding: "30px 20px 0",
    },
  },
  heighautoimgfirst: {
    position: "relative",
    overflow: "hidden",
    marginBottom: "10px",
    display: "block",
    height: "210px",
    [theme.breakpoints.down("sm")]: {
      height: "160px",
    },
    "& a": {
      position: "relative",
      overflow: "hidden",
      marginBottom: "25px",
      display: "block",
      height: "210px",
      [theme.breakpoints.down("sm")]: {
        width: "105px",
        height: "160px",
        marginBottom: "0",
      },
    },
    "& p": {
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      margin: 0,
      color: "#fff",
      fontSize: "1.25rem",
      fontWeight: 500,
      textAlign: "center",
      width: "100%",
      [theme.breakpoints.down("sm")]: {
        fontSize: "1rem",
      },
    },
  },
  twobandatalowersection: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  twobandatalowersectionH4: {
    fontSize: "3.125rem",
    fontWeight: 600,
    paddingBottom: "2rem",
    color: "#fff",
    textAlign: "center",
    textTransform: "capitalize",
    margin: 0,
    padding: 0,
  },
  heighautoimg: {
    position: "relative",
    overflow: "hidden",
    marginBottom: "10px",
    display: "block",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "10px",
    },
    "& a img": {
      width: "100%",
      height: "210px", borderRadius: "20px",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        height: "160px",

      },
    },
    "& a": {
      position: "relative",
      overflow: "hidden",
      marginBbottom: "25px",
      display: "block",
      [theme.breakpoints.down("sm")]: {
        width: "105px",
        marginBottom: "0"
      },
      "& p": {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        margin: 0,
        color: "#fff",
        fontSize: "1.25rem",
        fontWeight: 500,
        textAlign: "center",
        width: "100%",
        [theme.breakpoints.down("sm")]: {
          fontSize: "1rem",
        },
      },
    },

    "&:nth-child(2) a img": {
      height: "170px", borderRadius: "20px",
      [theme.breakpoints.down("sm")]: {
        height: "190px",
        width: "105px"
      },
    },
    "&:nth-child(3) a img": {
      height: "180px", borderRadius: "20px",
      [theme.breakpoints.down("sm")]: {
        height: "160px", width: "105px"
      },
    },
    "& .second_row:nth-child(1) a img": {
      height: "190px",
      borderRadius: "20px",
      [theme.breakpoints.down("sm")]: {
        height: "140px", width: "105px"
      },

    },
    "& .second_row:nth-child(2) a img": {
      height: "220px",
      borderRadius: "20px",
      [theme.breakpoints.down("sm")]: {
        height: "190px", width: "105px"
      },
    },
    "& .second_row:nth-child(3) a img": {
      height: "265px",
      borderRadius: "20px",
      [theme.breakpoints.down("sm")]: {
        height: "220px", width: "105px"
      },
    },
    "& .forth_row:nth-child(1) a img": {
      height: "285px",
      borderRadius: "20px",
      [theme.breakpoints.down("sm")]: {
        height: "260px", width: "105px",
      },
    },
    "& .forth_row:nth-child(2) a img": {
      height: "285px",
      borderRadius: "20px",
      [theme.breakpoints.down("sm")]: {
        height: "260px", width: "105px",
      },
    },
  },
  headingText: {
    textAlign: "center",
    fontSize: "2.1875rem",
    fontWeight: 600,
    margin: 0,
    padding: "0 0 35px",
  },
  columnGap: {
    [theme.breakpoints.down("xs")]: {
      gap: "1rem",
    },
  },
  imgMargin: {
    marginBottom: '10px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '10px',
    }
  },
  columnPadding: {
    padding: "0px 20px 0px 10px"
  }
}));
const ShopByOccasion = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState();
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width:600px)");

  const ShopByOccasionCarousels = useSelector(
    (state) => state.shopByOccasion?.shopByOccations?.homepageBanner
  );

  useEffect(() => {
    if (
      ShopByOccasionCarousels == [] ||
      !ShopByOccasionCarousels ||
      ShopByOccasionCarousels?.length === 0
    ) {
      setIsLoading(true);
      dispatch(getHomePageShopByOccasion())
        .then((res) => {
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [dispatch]);

  return (
    <div className={`${classes.shopbyocca} `}>
      <Container fluid className="m-0 p-0">
        <Row>
          <Col md={12}>
            <div>
              <h3 className={classes.headingText}>Shop By Occasions</h3>
            </div>
          </Col>
        </Row>
        <Row className={classes.columnGap}>
          <Col xs={12} md={6} className={`order-md-1 order-2 ${classes.columnPadding}`} >
            <Row>
              <Col xs={4} md={4} className="pe-0">
                <div className={`${isMobile ? "" : "zoomin-img"} ${classes.heighautoimgfirst}`}>
                  <Link
                    href="/product-page"
                    className="overlay"
                    style={{ borderRadius: "20px" }}
                  >
                    <img
                      src={
                        ShopByOccasionCarousels &&
                        ShopByOccasionCarousels[8]?.banner
                      }
                      className="img-fluid"
                      alt=""
                      style={{
                        height: isMobile ? "160px" : "210px",
                      }}
                    />
                    <p>
                      {ShopByOccasionCarousels &&
                        ShopByOccasionCarousels[8]?.title}
                    </p>
                  </Link>
                </div>
                <div className={`${isMobile ? "" : "zoomin-img"} ${classes.heighautoimg}`}>
                  <a href="/" className="overlay">
                    <img
                      src={
                        ShopByOccasionCarousels &&
                        ShopByOccasionCarousels[7]?.banner
                      }
                      className="img-fluid"
                      alt=""
                    />
                    <p>
                      {ShopByOccasionCarousels &&
                        ShopByOccasionCarousels[7]?.title}
                    </p>
                  </a>
                </div>
                <div className={`${isMobile ? "" : "zoomin-img"} ${classes.heighautoimg}`}>
                  <a href="/" className="overlay">
                    <img
                      src={
                        ShopByOccasionCarousels &&
                        ShopByOccasionCarousels[6]?.banner
                      }
                      className="img-fluid"
                      alt=""
                    />
                    <p>
                      {ShopByOccasionCarousels &&
                        ShopByOccasionCarousels[6]?.title}
                    </p>
                  </a>
                </div>
              </Col>

              <Col xs={4} md={4} className="pe-0">
                <div className={`${classes.heighautoimg}`}>
                  <div className={`${isMobile ? "" : "zoomin-img"} forth_row ${classes.imgMargin}`}>
                    <a href="/" className="overlay">
                      <img
                        src={
                          ShopByOccasionCarousels &&
                          ShopByOccasionCarousels[5]?.banner
                        }
                        className="img-fluid"
                        alt=""
                      />
                      <p>
                        {ShopByOccasionCarousels &&
                          ShopByOccasionCarousels[5]?.title}
                      </p>
                    </a>
                  </div>
                  <div className={`${isMobile ? "" : "zoomin-img"} forth_row `}>
                    <a href="/" className="overlay">
                      <img
                        src={
                          ShopByOccasionCarousels &&
                          ShopByOccasionCarousels[4]?.banner
                        }
                        className="img-fluid"
                        alt=""
                      />
                      <p>
                        {ShopByOccasionCarousels &&
                          ShopByOccasionCarousels[4]?.title}
                      </p>
                    </a>
                  </div>
                </div>
              </Col>

              <Col xs={4} md={4} className="pe-0">
                <div className={`${isMobile ? "" : "zoomin-img"} ${classes.heighautoimg}`}>
                  <a href="/" className="overlay">
                    <img
                      src={
                        ShopByOccasionCarousels &&
                        ShopByOccasionCarousels[3]?.banner
                      }
                      className="img-fluid"
                      alt=""
                    />
                    <p>
                      {ShopByOccasionCarousels &&
                        ShopByOccasionCarousels[3]?.title}
                    </p>
                  </a>
                </div>
                <div className={`${isMobile ? "" : "zoomin-img"} ${classes.heighautoimg} `}>
                  <a href="/" className="overlay">
                    <img
                      src={
                        ShopByOccasionCarousels &&
                        ShopByOccasionCarousels[2]?.banner
                      }
                      className="img-fluid"
                      alt=""
                    />
                    <p>
                      {ShopByOccasionCarousels &&
                        ShopByOccasionCarousels[2]?.title}
                    </p>
                  </a>
                </div>
                <div className={`${isMobile ? "" : "zoomin-img"} ${classes.heighautoimg}`}>
                  <a href="/" className="overlay">
                    <img
                      src={
                        ShopByOccasionCarousels &&
                        ShopByOccasionCarousels[1]?.banner
                      }
                      className="img-fluid"
                      alt=""
                    />
                    <p>
                      {ShopByOccasionCarousels &&
                        ShopByOccasionCarousels[1]?.title}
                    </p>
                  </a>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={6} className="shopSecondSection order-md-2 order-1">
            <div className="position-relative">
              <div className="overlay"></div>
              <img
                src={
                  ShopByOccasionCarousels && ShopByOccasionCarousels[0]?.banner
                }
                style={{
                  width: "100%",
                  height: isMobile ? "345px" : "580px",
                  objectFit: "cover",
                  borderRadius: "20px",
                }}
                alt=""
              />
              <div className={classes.twobandatalowersection}>
                <h4 className={classes.twobandatalowersectionH4}>
                  {ShopByOccasionCarousels && ShopByOccasionCarousels[0]?.title}
                </h4>
                <FMButton
                  displayText={
                    <>
                      Explore <KeyboardArrowRightIcon />
                    </>
                  }
                  onHover={"white"}
                  styleData={{
                    backgroundColor: "white",
                    color: "#801317",
                    textTransform: "capitalize",
                    fontWeight: "600",
                  }}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div >
  );
};

export default ShopByOccasion;
