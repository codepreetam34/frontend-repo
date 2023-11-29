import { Box } from "@mui/material";
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

  console.log("Pamper zone ", pamperZoneData)

  return (
    <div className="pamperzone">
      <Container fluid>
        <Row>
          <Col md={12}>
            <div className="heading_text">
              <h3>Pamper Zone</h3>
            </div>
          </Col>
        </Row>
        <Row style={{}}>
          <Col md={6}>
            <div className="position-relative" style={{ width: "31rem" }}>
              <Box>
                <img
                  src={pamperZoneData && pamperZoneData[0]?.banner}
                  className="img-fluid"
                  style={{ height: "25rem" }}
                  alt=""
                />
              </Box>
              <div className="twobandata">
                <h4>Gift For Her</h4>
                <a href="/">Shop Now</a>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="position-relative" style={{ width: "31rem" }}>
              <Box>
                <img
                  src={pamperZoneData && pamperZoneData[1]?.banner}
                  className="img-fluid"
                  alt=""
                  style={{ height: "25rem" }}
                />
              </Box>
              <div className="twobandata">
                <h4>Gift For Him</h4>
                <a href="/">Shop Now</a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PamperZone;
