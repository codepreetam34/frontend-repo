import FMButton from "../../components/FMButton/FMButton";
import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getHomePageTwoAdsBanner } from "Redux/Slices/TwoAdsBanner/TwoAdsBannerSlice";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  rowGap: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      gap: '2rem',
      justifyContent: 'center'
    }, [theme.breakpoints.down('sm')]: {
      display: 'flex',
      gap: '2rem',
      justifyContent: 'center'
    },
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      gap: '2rem',
      justifyContent: 'center'
    },
  },


}));
const TwoBanner = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  useEffect(() => {
    dispatch(getHomePageTwoAdsBanner());
  }, [dispatch]);

  const twoBannerData = useSelector(
    (state) => state?.twoAdsBanner?.twoAdsBanners?.homepageBanner
  );

  return (
    <div className="twobannersection">
      <Container fluid className="m-0 p-0">
      <Row className={classes.rowGap}>
          <Col md={6}>
            <div className="position-relative">
              <div class="two-banner-background-overlay"></div>
              <img src={twoBannerData && twoBannerData[0]?.banner} className="img-fluid" alt="" style={{ width: "510px", height: "200px" }} />
              <div className="twobandata">
                <h4 style={{ fontSize: "24px", color: '#FFC72C' }}>The Anniversary</h4>
                <p style={{ fontSize: "14px" }}>
                  Send lots of blooms this anniversary
                </p>
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
          <Col md={6}>
            <div className="position-relative">
              <div class="two-banner-background-overlay"></div>
              <img src={twoBannerData && twoBannerData[1]?.banner} className="img-fluid" alt="" style={{ width: "510px", height: "200px" }} />
              <div className="twobandata">
                <h4 style={{ fontSize: "24px", color: '#FFC72C' }}>Bespoke Hampers</h4>
                <p style={{ fontSize: "14px" }}>
                  To elevate your gifting experience
                </p>
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

export default TwoBanner;
