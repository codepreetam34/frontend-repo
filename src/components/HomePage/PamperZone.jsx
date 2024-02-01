import { Box, useTheme } from "@mui/system";
import FMButton from "components/FMButton/FMButton";
import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getHomePagePamperZone } from "Redux/Slices/PamperZone/PamperZoneSlice";
import { makeStyles } from "@material-ui/core/styles";
import { useMediaQuery } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  pamperzone: {
    padding: "20px 80px 0",
    [theme.breakpoints.down("sm")]: {
      padding: "30px 20px 0",
    },
  },
  twoBanData: {
    position: "absolute",
    top: "50%",
    left: "20px",
    transform: "translateY(-50%)",
    "& h4": {
      fontWeight: 600,
      color: "#000",
      textTransform: "capitalize",
      margin: 0,
      padding: 0,
      paddingBottom: "5px",
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
}));

const PamperZone = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const classes = useStyles(theme);
  const isMobile = useMediaQuery("(max-width:600px)");


  useEffect(() => {
    dispatch(getHomePagePamperZone());
  }, [dispatch]);

  const pamperZoneData = useSelector(
    (state) => state?.pamperZone?.pamperZoneData?.homepageBanner
  );

  return (
    <div className={`${classes.pamperzone}`}>
      <Container fluid className={`m-0 p-0`}>
        <Row>
          <Col md={12}>
            <div>
              <h3 className={classes.headingText}>Pamper Zone</h3>
            </div>
          </Col>
        </Row>
        <Row className={classes.columnGap}>
          {pamperZoneData?.map((data, index) => (
            <Col key={index} md={6}>
              <div className={`position-relative`}>
                <Box>
                  <img src={data?.banner} className="img-fluid" alt="" />
                </Box>
                <div className={`${classes.twoBanData}`}>
                  <h4 style={{ fontSize: isMobile ? "1.5rem" : "1.875rem", }}>{data?.title}</h4>
                  <FMButton
                    displayText={"Shop Now"}
                    styleData={{
                      backgroundColor: "#801319",
                      color: "#ffffff",
                      border: "1px solid #801319",
                      padding: "10px 25px",
                      fontSize: isMobile ? "1rem" : "1.25rem",
                      textTransform: "capitalize",
                      fontWeight: 600,
                    }}
                  />
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default PamperZone;
