import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getHomePageTwoAdsBanner } from "Redux/Slices/TwoAdsBanner/TwoAdsBannerSlice";
import { makeStyles } from "@material-ui/core/styles";
import FMButton from "../../components/FMButton/FMButton";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from "react-router";

const useStyles = makeStyles((theme) => ({
  twobannersection: {
    padding: "50px 80px 0",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      padding: "20px 15px 0",
    },
  },
  twobannersectionImg: {
    width: "100%",
    borderRadius: "20px",
    height: "180px",
    [theme.breakpoints.down("sm")]: {
      height: "120px",
    },
  },
  twobandata: {
    position: "absolute",
    top: "50%",
    left: "20px",
    transform: "translateY(-50%)",
  },
  twoBannerBackgroundOverlay: {
    position: "absolute",
    content: '""',
    left: 0,
    top: 0,
    borderRadius: "20px",
    background:
      "linear-gradient(270deg, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0.4) 56%)",
    width: "100%",
    height: "100%",
    flexShrink: 0,
  },
  titleStyle: {
    fontSize: "24px",
    color: "#FFC72C",
    fontWeight: "600",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
      marginBottom:"2px"
    },
  },
  paragraphStyle: {
    fontSize: "14px",
    color: "#fff",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "5px",
      fontSize: "12px",
    },
  },
  columnGap: {
    [theme.breakpoints.down("xs")]: {
      gap: "1rem",
    },
  },
}));

const TwoBanner = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const pincodeData = sessionStorage.getItem("pincode");
  const navigate = useNavigate();
  const twoBannerData = useSelector((state) => state?.twoAdsBanner?.twoAdsBanners?.homepageBanner);

  useEffect(() => {
    dispatch(getHomePageTwoAdsBanner());
  }, [dispatch]);

  const handleGiftNow = (tagName) => {
    navigate(`/product-page/all-category/${pincodeData}/${tagName}`)
  }

  const renderBanner = (bannerIndex) => {
    const banner = twoBannerData && twoBannerData[bannerIndex];
    return (
      <Col md={6}>
        <div className="position-relative">
          <div className={classes.twoBannerBackgroundOverlay}></div>
          <img src={banner?.banner} className={classes.twobannersectionImg} alt="" />
          <div className={classes.twobandata}>
            <h4 className={classes.titleStyle}>{banner?.title}</h4>
            <p className={classes.paragraphStyle}>{banner?.subTitle}</p>
            <FMButton
              displayText={"Gift Now "}
              onHover={"white"}
              styleData={{
                backgroundColor: "white",
                color: "#801317",
                textTransform: "capitalize",
                fontWeight: "600",
                fontSize:"12px"
              }}
              onClick={() => handleGiftNow(banner?.title)}
            >
              <KeyboardArrowRightIcon />
            </FMButton>
          </div>
        </div>
      </Col>
    );
  };

  return (
    <div className={classes.twobannersection}>
      <Container fluid className="m-0 p-0">
        <Row className={classes.columnGap}>
          {renderBanner(0)}
          {renderBanner(1)}
        </Row>
      </Container>
    </div>
  );
};

export default TwoBanner;
