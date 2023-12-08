import { Box } from "@mui/material";
import FMButton from "components/FMButton/FMButton";
import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getHomePagePamperZone } from "Redux/Slices/PamperZone/PamperZoneSlice";
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

  containerSize: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    }, [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
  },
}));
const PamperZone = () => {
  const classes = useStyles();
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
        <Row className={classes.rowGap}>
          <Col md={6}>
            <div className={`position-relative ${classes.containerSize}`}>
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
            <div className={`position-relative ${classes.containerSize}`}>
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
