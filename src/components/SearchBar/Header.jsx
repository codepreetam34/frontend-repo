import { Avatar, Box, Grid, IconButton, Typography } from "@mui/material";
import SearchBar from "../../components/SearchBar/SearchBar";
import React, { useEffect, useState } from "react";
import monkeyLogo from "../../assets/monkeyLogo.svg";
import VibezterLogo from "../../assets/VibezterLogo.svg";
import cart from "../../assets/cart.svg";
import profileIcon from "../../assets/profileIcon.svg";
import headerLocationIcon from "../../assets/headerLocationIcon.svg";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled, alpha } from "@mui/material/styles";
import { HeaderStyle } from "./HeaderStyle";
import { commonStyle } from "../../Styles/commonStyles";
import { Col, Container, Nav, Navbar, NavDropdown, Row } from "react-bootstrap";
import "./HeaderBootstrapMenu.css";
import { useDispatch, useSelector } from "react-redux";
import { getMenuBarList } from "../../Redux/Slices/HeaderMenuList/HeaderMenuListSlice";
import orderIcon from "../../assets/orderIcon.svg";
import contactIcon from "../../assets/contactIcon.svg";
import faqIcon from "../../assets/faqIcon.svg";
import logoutIcon from "../../assets/logoutIcon.svg";
import FMTypography from "../../components/FMTypography/FMTypography";
import { Stack } from "@mui/system";
import FMButton from "../../components/FMButton/FMButton";
import { Link, useNavigate } from "react-router-dom";
import { FAQ, LOGIN, MY_PROFILE } from "../../Routes/Routes";
import { logout } from "../../Redux/Slices/Login/auth.slice";
import { makeStyles } from "@mui/styles";
import { addToCartProductsFinal } from "../../Redux/Slices/AddToCart/AddToCartSlice";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send'
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


const useStyles = makeStyles((theme) => ({

  commonStyle: {
    [theme.breakpoints.down('xs')]: {
      gap: '2rem',
    }, [theme.breakpoints.down('sm')]: {
      gap: '2rem',
    }, [theme.breakpoints.up('md')]: {
      gap: '3rem',
    }, [theme.breakpoints.up('lg')]: {
      gap: '3rem',
    },
    [theme.breakpoints.up('xl')]: {
      gap: '7rem',
    },
  },

  cartItemCountStyle: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    backgroundColor: '#801317',
    color: 'white',
    borderRadius: '50%',
    padding: '4px 8px',
    fontSize: '12px',
  },
  pincodeItemCountStyle: {
    position: 'absolute',
    top: '0',
    right: '1.5rem',
    backgroundColor: '#801317',
    color: 'white',
    borderRadius: '50%',
    padding: '4px 8px',
    fontSize: '12px',
  },

}));
const Header = ({ pincodeData, handleModalOpenController }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
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

  const categoryList = useSelector(
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

  const handleTag = (tagName, categoryId) => {
    const payload = {
      tagName,
      categoryId,
      pincodeData: pincodeData
    };
    navigate(`/product-page/${tagName}`, { state: { payload: payload } });
  };
  const handleCategoryClick = (categoryId) => {
    navigate(`/category-page/${categoryId}`, { state: { pincodeData: pincodeData } });
  };




  useEffect(() => {
    dispatch(addToCartProductsFinal());
  }, [dispatch]);
  const addedData = useSelector(
    (state) => state?.addToCartProducts?.getAddToCartProductsListData?.cartItems
  );



  return (
    <Grid sx={HeaderStyle.headerFullStyle}>
      <Row style={{ ...HeaderStyle.iconGridContainer, margin: "0" }} >
        <Col style={commonStyle.flexDisplayStyle}>
          <Link to={"/"} style={{ display: 'flex', alignItems: 'center', }}>
            <img
              src={monkeyLogo}
              alt="monkeyLogo"
              style={HeaderStyle.monkeyLogoStyle}
            />
            <img
              src={VibezterLogo}
              alt="VibezterLogo"
              style={{ ...HeaderStyle.vibezterLogoStyle }}
            />
          </Link>
        </Col>
        <Col className="searchBar-col">
          <SearchBar placeholder={"Search gifts, experiences and more..."} />
        </Col>
        <Col
          style={{
            marginTop: ".5rem",
            display: "flex",
            justifyContent: "flex-end",
            gap: "1rem",
          }}
        >
          <Box>

            <Button
              onClick={handleModalOpenController}
              style={{
                minWidth: "0",
                "MuiButton-root:hover": {
                  backgroundColor: "red !important",
                  borderRadius: "28px",
                },
              }}
            >


              <div style={{ position: 'relative' }}>
                <img
                  src={headerLocationIcon}
                  alt="headerLocationIcon"
                  style={HeaderStyle.profileIconStyle}
                />
                {pincodeData && pincodeData ?
                  <div class={classes.pincodeItemCountStyle}>
                    {pincodeData}
                  </div> : <></>
                }
              </div>


            </Button>
          </Box>
          <Box>
            <Link to={`/add-to-cart`} style={{ textDecoration: 'none' }}>
              <div style={{ position: 'relative' }}>
                <img
                  src={cart}
                  alt="cart"
                  style={HeaderStyle.cartStyle}
                />
                {addedData && Object.keys(addedData).length > 0 && (
                  <div class={classes.cartItemCountStyle}>
                    {Object.keys(addedData).length}
                  </div>
                )}
              </div>
            </Link>
          </Box>
          {/* profile below */}
          <Box>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              style={{
                minWidth: "0",

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
                />
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
          </Box>
        </Col>
      </Row>

      <div className="main_header">
        <Navbar
          bg=""
          expand="lg"
          className="p-0"
          style={{ paddingBottom: "5px" }}
        >
          <Container
            fluid
            className="d-flex flex-wrap n-0 p-0 justify-content-start"
          >
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav navbarScroll style={{ paddingLeft: "4rem" }}>
                {categoryList &&
                  categoryList?.map((elem) => {
                    return (
                      <NavDropdown
                        title={
                          <div
                            className="main-heading-clickable fw-bold"
                            onClick={() => handleCategoryClick(elem?._id)}
                          >
                            <span>{elem?.name}</span>
                            <i
                              className="fas fa-caret-down"
                              style={{ marginLeft: "0.5rem" }}
                            ></i>
                          </div>
                        }
                        key={elem?.id}
                        id="navbarScrollingDropdown"
                        onMouseEnter={() => showDropdown(elem?._id)}
                        onMouseLeave={hideDropdown}
                        show={show === elem?._id}
                        style={{ textTransform: "capitalize" }}
                      >
                        <Col md={12}>
                          <div>
                            <Row>
                              <Col md={9} className={`${classes.commonStyle} d-lg-flex flex-wrap`} >
                                {elem?.tags?.map((tag) => {
                                  return (
                                    <Box
                                      style={{
                                        paddingBottom: "0.7rem",
                                        paddingTop: "0.2rem",
                                      }}
                                    >
                                      <div
                                        className="fw-bold pb-2"
                                        style={{ fontSize: "1.1rem" }}
                                      >
                                        {tag?.tagType}
                                      </div>
                                      <div>
                                        {tag?.names?.map((name) => {
                                          return (
                                            <div
                                              className="pb-2"
                                              style={{
                                                fontSize: "0.9rem",
                                                cursor: "pointer",
                                              }}
                                              onClick={() =>
                                                handleTag(name, elem?._id)
                                              }
                                            >
                                              {name}
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </Box>
                                  );
                                })}
                              </Col>{" "}
                              <Col md={3}>
                                <div className="cate_list_menu pb-3">
                                  <img
                                    src={elem?.categoryImage}
                                    className="img-fluid"
                                    alt=""
                                  />
                                  <h4>{elem?.name}</h4>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </Col>

                        {/*
                         <Row className="rowOnHover" style={{ padding: "2rem" }}>
                          {elem?.children
                            ?.slice()
                            .reverse()
                            .map((secElem) => (
                              <Col md={3}>
                                <div className="cate_area">
                                  <Link
                                    to={`/category-page/${secElem?._id}`}
                                    style={{ textDecoration: "none" }}
                                  >
                                    <h3>{secElem?.name}</h3>
                                  </Link>


                                  
                                  {secElem?.tags
                                    ?.slice()
                                    .reverse()
                                    .map((thirdElem) => (
                                      <Link
                                        to={`/product-page/${thirdElem?._id}`}
                                        style={{ textDecoration: "none" }}
                                      >
                                        <NavDropdown.Item href="/">
                                          {thirdElem?.}
                                        </NavDropdown.Item>
                                      </Link>
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
                            <h4>Cakes</h4> 
                              </a>
                            </div>
                          </Col>
                        </Row> */}
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
