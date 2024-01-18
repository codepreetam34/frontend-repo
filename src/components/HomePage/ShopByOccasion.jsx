import FMButton from "components/FMButton/FMButton";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getHomePageShopByOccasion } from "Redux/Slices/ShopByOccasion/ShopByOccasionSlice";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  shopbyocca: {
    "&  img": {
      width: "100%",
      height: "725px",
      objectFit: "cover",
      borderRadius: "20px",
    },
    padding: "50px 80px 0",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      padding: "30px 20px 0",
    },
  },

  heighautoimgfirst: {
    position: "relative",
    overflow: "hidden",
    marginBottom: "25px",
    display: "block",
    height: "260px",
    "& a": {
      position: "relative",
      overflow: "hidden",
      marginBottom: "25px",
      display: "block",
      height: "260px",
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
    textTransform: "capitalize",
    margin: 0,
    padding: 0,
  },

  heighautoimg: {
    position: "relative",
    overflow: "hidden",
    marginBottom: "25px",
    display: "block",
    "& a img": {
      width: "100%",
      height: "260px",
    },
    "& a": {
      position: "relative",
      overflow: "hidden",
      marginBbottom: "25px",
      display: "block",
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
      },
    },
    "&:nth-child(2) a img": {
      height: "220px",
    },
    "&:nth-child(3) a img": {
      height: "195px",
    },
    "& .second_row:nth-child(1) a img": {
      height: "190px",
    },
    "& .second_row:nth-child(2) a img": {
      height: "220px",
    },
    "& .second_row:nth-child(3) a img": {
      height: "265px",
    },
    "& .forth_row:nth-child(1) a img": {
      height: "350px",
    },
    "& .forth_row:nth-child(2) a img": {
      height: "350px",
    },
  },
}));
const ShopByOccasion = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState();
  const classes = useStyles();

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
    <div className={`${classes.shopbyocca} shopbyocca`}>
      <Container fluid className="m-0 p-0">
        <Row>
          <Col md={12}>
            <div className="heading_text">
              <h3>Shop By Occasions</h3>
            </div>
          </Col>
          <Col md={6}>
            <Row>
              <Col md={4}>
                <div className={classes.heighautoimgfirst}>
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
                    />
                    <p>
                      {ShopByOccasionCarousels &&
                        ShopByOccasionCarousels[8]?.title}
                    </p>
                  </Link>
                </div>
                <div className="heighautoimg">
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
                <div className="heighautoimg">
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

              <Col md={4}>
                <div className="heighautoimg forth_row">
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
                <div className="heighautoimg forth_row">
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
              </Col>

              <Col md={4}>
                <div className="heighautoimg">
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
                <div className="heighautoimg">
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
                <div className="heighautoimg">
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
          <Col md={6}>
            <div className="position-relative">
              <div className="overlay"></div>
              <img
                src={
                  ShopByOccasionCarousels && ShopByOccasionCarousels[0]?.banner
                }
                alt=""
              />
              <div className={classes.twobandatalowersection}>
                {/* <h4>Birthday</h4> */}
                <h4 className={classes.twobandatalowersectionH4}>
                  {ShopByOccasionCarousels && ShopByOccasionCarousels[0]?.title}
                </h4>
                {/* <a href="/">Gift Now</a> */}
                <FMButton
                  displayText={"Gift Now"}
                  onHover={"white"}
                  styleData={{
                    backgroundColor: "white",
                    color: "black",
                    textTransform: "capitalize",
                    fontWeight: "600",
                  }}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ShopByOccasion;
