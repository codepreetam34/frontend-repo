import { Avatar, Box, Grid, Typography } from "@mui/material";
import SearchBar from "components/SearchBar/SearchBar";
import React, { useEffect, useState } from "react";
import monkeyLogo from "../../assets/monkeyLogo.svg";
import VibezterLogo from "../../assets/VibezterLogo.svg";
import cart from "../../assets/cart.svg";
import profileIcon from "../../assets/profileIcon.svg";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled, alpha } from "@mui/material/styles";
import { HeaderStyle } from "./HeaderStyle";
import { commonStyle } from "../../Styles/commonStyles";
import { Col, Container, Nav, Navbar, NavDropdown, Row } from "react-bootstrap";
import "./HeaderBootstrapMenu.css";
import { useDispatch, useSelector } from "react-redux";
import { getMenuBarList } from "Redux/Slices/HeaderMenuList/HeaderMenuListSlice";
import orderIcon from "../../assets/orderIcon.svg";
import contactIcon from "../../assets/contactIcon.svg";
import faqIcon from "../../assets/faqIcon.svg";
import logoutIcon from "../../assets/logoutIcon.svg";

import FMTypography from "components/FMTypography/FMTypography";
import { Stack } from "@mui/system";
import FMButton from "components/FMButton/FMButton";
import { useNavigate } from "react-router-dom";
import { FAQ, LOGIN, MY_PROFILE } from "Routes/Routes";
import { logout } from "Redux/Slices/Login/auth.slice";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const personLoggedIn = JSON.parse(
    localStorage.getItem("Sidebar_Module_Assigned")
  )?.fullName;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElSec, setAnchorElSec] = React.useState(null);
  const [openFilter, setOpenFilter] = useState(false);

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

  useEffect(() => {
    dispatch(getMenuBarList());
  }, [dispatch]);

  const accountDetailData = useSelector(
    (state) => state?.menuList?.getMenuOptionsData?.categoryList
  );

  const navigateToLogin = () => {
    navigate(LOGIN);
  };

  const logoutPerson = () => {
    localStorage.clear();
    navigate(LOGIN);
  };

  const personLoggedInId = JSON.parse(
    localStorage.getItem("Sidebar_Module_Assigned")
  )?._id;
  const profileNavigation = () => {
    navigate(`/my-profile/${personLoggedInId}`);
  };

  const logoutHandler = () => {
    // setDisabledLogout(true);
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

  const [hoverMenu, setHoverMenu] = useState(false);
  const menuOpenedOnHover = () => {
    setHoverMenu(true);
    // const element = document.getElementsByClassName("rowOnHover");
  };

  const [show, setShow] = useState("");
  const showDropdown = (id) => {
    setShow(id);
  };
  const hideDropdown = () => {
    setShow("");
  };

  const faqsHandler = () => {
    navigate(FAQ);
  };

  return (
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
              <Stack direction="row" spacing={2} sx={{ marginLeft: "1rem" }}>
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
                    onClick={profileNavigation}
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

      <div className="main_header">
        <Navbar bg="" expand="lg" className="p-0">
          <Container fluid>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="" navbarScroll>
                {accountDetailData?.map((elem) => {
                  return (
                    <NavDropdown
                      title={elem?.name}
                      key={elem?.id}
                      id="navbarScrollingDropdown"
                      onMouseEnter={() => showDropdown(elem?._id)}
                      onMouseLeave={hideDropdown}
                      show={show === elem?._id}
                    >
                      <Row className="rowOnHover" style={{ padding: "2rem" }}>
                        {elem?.children?.map((secElem) => (
                          <Col md={3}>
                            <div className="cate_area">
                              <h3>{secElem?.name}</h3>

                              {secElem?.children?.map((thirdElem) => (
                                <NavDropdown.Item href="/">
                                  {thirdElem?.name}
                                </NavDropdown.Item>
                              ))}
                            </div>
                          </Col>
                        ))}

                        <Col md={3}>
                          <div className="cate_list_menu">
                            <a href="/">
                              <img
                                src={elem?.categoryImage}
                                className="img-fluid"
                                alt=""
                              />
                              {/* <h4>Cakes</h4> */}
                            </a>
                          </div>
                        </Col>
                      </Row>
                    </NavDropdown>
                  );
                })}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </Grid>
  );
};

export default Header;
