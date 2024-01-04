import { Box } from "@mui/material";
import FMButton from "components/FMButton/FMButton";
import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getHomePagePamperZone } from "Redux/Slices/PamperZone/PamperZoneSlice";

const PamperZone = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHomePagePamperZone());
  }, [dispatch]);

  const pamperZoneData = useSelector(
    (state) => state?.pamperZone?.pamperZoneData?.homepageBanner
  );


  return (
    <div className="pamperzone">
      <Container fluid className="m-0 p-0">
        <Row>
          <Col md={12}>
            <div className="heading_text">
              <h3>Pamper Zone</h3>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <div className={`position-relative`}>
              <Box>
                <img
                  src={pamperZoneData && pamperZoneData[0]?.banner}
                  className="img-fluid"
                  style={{ height: "auto", width:"100%" }}
                  alt=""
                />
              </Box>
              <div className="twobandata">
                <h4>{pamperZoneData && pamperZoneData[0]?.title}</h4>
                {/* <a href="/">Shop Now</a> */}
                <FMButton
                  displayText={"Shop Now"}
                  styleData={{
                    backgroundColor: "#801319",
                    color: "#ffffff",
                    border: "1px solid #801319",
                    padding: "10px 25px",
                    fontSize: "1.25rem",
                    textTransform: "capitalize",
                    fontWeight: "600",
                  }}
                />
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className={`position-relative`}>
              <Box>
                <img
                  src={pamperZoneData && pamperZoneData[1]?.banner}
                  className="img-fluid"
                  alt=""
                  style={{ height: "auto",width:"100%" }}
                />
              </Box>
              <div className="twobandata">
                <h4>{pamperZoneData && pamperZoneData[1]?.title}</h4>
                <FMButton
                  displayText={"Shop Now"}
                  styleData={{
                    backgroundColor: "#801319",
                    color: "#ffffff",
                    border: "1px solid #801319",
                    padding: "10px 25px",
                    fontSize: "1.25rem",
                    textTransform: "capitalize",
                    fontWeight: "600",
                  }}
                />
                {/* <a href="/">Shop Now</a> */}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PamperZone;
