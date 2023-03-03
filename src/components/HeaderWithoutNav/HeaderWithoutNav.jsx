import { Avatar, Box, Grid, Menu, MenuItem } from "@mui/material";
import React from "react";
import { Button, Col, Row, Stack } from "react-bootstrap";

import SearchBar from "components/SearchBar/SearchBar";
import { HeaderStyle } from "../SearchBar/HeaderStyle";
import { commonStyle } from "../../Styles/commonStyles";
import monkeyLogo from "../../assets/monkeyLogo.svg";
import VibezterLogo from "../../assets/VibezterLogo.svg";
import FMTypography from "components/FMTypography/FMTypography";
import FMButton from "components/FMButton/FMButton";
import cart from "../../assets/cart.svg";
import profileIcon from "../../assets/profileIcon.svg";
import orderIcon from "../../assets/orderIcon.svg";
import contactIcon from "../../assets/contactIcon.svg";
import faqIcon from "../../assets/faqIcon.svg";
import logoutIcon from "../../assets/logoutIcon.svg";
import { useNavigate } from "react-router-dom";
import { FAQ, LOGIN } from "Routes/Routes";
import { logout } from "Redux/Slices/Login/auth.slice";
import { useDispatch } from "react-redux";

const HeaderWithoutNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const personLoggedIn = JSON.parse(
    localStorage.getItem("Sidebar_Module_Assigned")
  )?.fullName;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElSec, setAnchorElSec] = React.useState(null);
  const open = Boolean(anchorEl);
  const openSec = Boolean(anchorElSec);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickSec = (event) => {
    setAnchorElSec(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseSec = () => {
    setAnchorElSec(null);
  };
  const navigateToLogin = () => {
    navigate(LOGIN);
  };

  const faqsHandler = () => {
    navigate(FAQ);
  };
  const logoutHandler = () => {
    dispatch(logout())
      .then((response) => {
        if (response.payload.data.code === 200) {
          setAnchorEl(null);
          localStorage.clear();
          navigate(LOGIN);
        } else {
          // setDisabledLogout(false);
        }
      })
      .catch((rejectedWithValue) => {
        // setDisabledLogout(false);
        localStorage.clear();
        navigate(LOGIN);
        // notify({ type: "success", content: "Logged out successfully" });
        throw new Error("Logout failed");
      });
  };
  return (
    <>
      <Grid sx={HeaderStyle.headerFullStyle}>
        <Row style={{ ...HeaderStyle.iconGridContainer, margin: "0" }}>
          <Col style={commonStyle.flexDisplayStyle}>
            <img
              src={monkeyLogo}
              alt="monkeyLogo"
              style={HeaderStyle.monkeyLogoStyle}
            />
            <img
              src={VibezterLogo}
              alt="VibezterLogo"
              style={{ ...HeaderStyle.vibezterLogoStyle, marginTop: "0.6rem" }}
            />
          </Col>
          <Col className="searchBar-col">
            <SearchBar placeholder={"Search gifts, experiences and more..."} />
          </Col>
          <Col
            style={{
              marginTop: ".5rem",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <img
              src={cart}
              alt="cart"
              style={{ ...HeaderStyle.cartStyle, marginTop: "0" }}
            />

            {/* profile below */}
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              style={{
                minWidth: "0",
                marginTop: "-1.7rem",
                backgroundColor: "white",
                border: "none",
                "MuiButton-root:hover": {
                  backgroundColor: "red !important",
                  borderRadius: "28px",
                },
              }}
            >
              <img
                src={profileIcon}
                alt="profileIcon"
                style={HeaderStyle.profileIconStyle}
              />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              sx={{ padding: "2rem", ...HeaderStyle.lgjaStyle }}
            >
              <Box sx={{ display: "flex", marginBottom: ".5rem" }}>
                <Stack
                  direction="row"
                  spacing={2}
                  style={{
                    marginLeft: "1rem",
                    display: "block",
                    width: "auto",
                  }}
                >
                  <Avatar src="/broken-image.jpg" />
                </Stack>
                {personLoggedIn ? (
                  <Box sx={{ marginLeft: "12px" }}>
                    <FMTypography
                      displayText={personLoggedIn}
                      sx={{ fontSize: "14px" }}
                    />
                    <FMButton
                      displayText={"See your Profile"}
                      variant={"outlined"}
                      styleData={{
                        // ...commonStyle.buttonStyles,padd
                        color: "#717171",
                        padding: "0",
                        fontSize: "10px",
                        backgroundColor: "none",
                        border: "none",
                        "&:hover": {
                          backgroundColor: "white",
                          border: "none",
                        },
                      }}
                    />
                  </Box>
                ) : (
                  <Box>
                    <FMButton
                      displayText={"Log in"}
                      variant={"outlined"}
                      styleData={{
                        textTransform: "capitalize",
                        paddingTop: "0",
                        color: "black",
                        backgroundColor: "none",
                        border: "none",
                        "&:hover": {
                          backgroundColor: "white",
                          border: "none",
                        },
                      }}
                      onClick={navigateToLogin}
                    />
                    <FMTypography
                      displayText={"To access account"}
                      sx={{
                        color: "#717171",
                        marginLeft: "12px",
                        fontSize: "10px",
                        color: "black",
                      }}
                    />
                  </Box>
                )}
              </Box>
              <hr style={{ margin: "0" }} />
              <MenuItem
                onClick={handleClose}
                divider
                sx={{
                  padding: "1rem",
                }}
              >
                <img
                  src={orderIcon}
                  alt="order-icon"
                  style={{ marginRight: "12px" }}
                />{" "}
                Orders
              </MenuItem>

              <MenuItem onHover={handleClose} divider sx={{ padding: "1rem" }}>
                <img
                  src={contactIcon}
                  alt="contact-icon"
                  style={{ marginRight: "12px" }}
                />
                Contact Us
              </MenuItem>

              <MenuItem onClick={faqsHandler} divider sx={{ padding: "1rem" }}>
                <img
                  src={faqIcon}
                  alt="faqIcon-icon"
                  style={{ marginRight: "12px" }}
                />
                FAQ's
              </MenuItem>

              {personLoggedIn && (
                <MenuItem
                  onClick={logoutHandler}
                  divider
                  sx={{ padding: "1rem" }}
                >
                  <img
                    src={logoutIcon}
                    alt="logout-icon"
                    style={{ marginRight: "12px" }}
                  />
                  Log Out
                </MenuItem>
              )}
            </Menu>
          </Col>
        </Row>
      </Grid>
    </>
  );
};

export default HeaderWithoutNav;
