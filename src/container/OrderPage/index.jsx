import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Header from "../../components/SearchBar/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Footer from "../../components/Footer/Footer";
import FMTypography from "components/FMTypography/FMTypography";

const useStyles = makeStyles((theme) => ({}));

const OrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const pincodeData = sessionStorage.getItem("pincode");
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [dispatch]);

  return (
    <>
      <Header />

      <Grid
        sx={{
          padding: "0 100px",
          transition:
            "color 0.5s cubic-bezier(0.645, 0.045, 0.355, 1), background 0.5s cubic-bezier(0.645, 0.045, 0.355, 1)",
          marginTop: "40px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            transition:
              "color 0.5s cubic-bezier(0.645, 0.045, 0.355, 1), background 0.5s cubic-bezier(0.645, 0.045, 0.355, 1)",
          }}
        >
          <FMTypography
            displayText={`No Products`}
            styleData={{
              fontWeight: "500",
              fontSize: "40px",
              textTransform: "capitalize",
              paddingBottom: "1rem",
            }}
          />

          <Box
            sx={{ display: "flex", alignItems: "center", marginLeft: "1rem" }}
          >
            <FMTypography
              displayText={`| Products`}
              styleData={{
                fontWeight: "300",
                fontSize: "20px",
                lineHeight: "30px",
                color: "#717171",
              }}
            />
          </Box>
        </Box>

        <Grid
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexBasis: "33.333333%",
            justifyContent: "space-evenly",
            gap: "2rem",
            padding: "3rem 0",
          }}
        >
          {isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "300px",
              }}
            >
              <CircularProgress color="primary" />
            </div>
          ) : (
            <Box>
              <Card
                sx={{
                  width: "280px",
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
                    No orders available !
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          )}
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default OrderPage;
