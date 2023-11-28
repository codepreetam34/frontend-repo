import { Avatar, Box, Grid, IconButton, Typography, Modal } from "@mui/material";
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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FAQ, LOGIN, MY_PROFILE } from "../../Routes/Routes";
import { logout } from "../../Redux/Slices/Login/auth.slice";
import { makeStyles } from "@mui/styles";
import { addToCartProductsFinal } from "../../Redux/Slices/AddToCart/AddToCartSlice";
import { ErrorToaster, SuccessToaster } from "constants/util";
import CloseIcon from "@mui/icons-material/Close";
import Pincode from "react-pincode";

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
  link: {
    "&:hover": {
      textDecoration: "underline",
    },
  },
  profileIconStyle: {
    width: "30px",
    height: "30px",
  },
  locationIconStyle: {
    width: "30px",
    height: "30px",
  },
  cartItemCountStyle: {
    position: 'absolute',
    top: '-3px',
    right: '7px',
    backgroundColor: '#801317',
    color: 'white',
    borderRadius: '50%',
    padding: '1px 10px',
    fontSize: '12px',
  },
  pincodeItemCountStyle: {
    color: 'white',
    fontSize: '12px',
    "&:hover": {
      color: "#801317",
    },
  },
  tagDesign: {
    fontSize: "0.9rem",
    cursor: "pointer",
    paddingBottom: "0.5rem",
    "&:hover": {
      color: "#801317",
    },
  },

}));
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const [showArea, setShowArea] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [showErrorToastMessage, setShowErrorToastMessage] = useState();
  const [showToast, setShowToast] = useState(false);
  const location = useLocation();
  const showToastMessage = location?.state?.showToastMessage;
  const [isHovered, setIsHovered] = useState(false);


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

  const personLoggedInId = JSON.parse(
    localStorage.getItem("Sidebar_Module_Assigned")
  )?._id;
  const profileNavigation = () => {
    navigate(`/my-profile/${personLoggedInId}`);
  };

  const logoutHandler = () => {
    dispatch(logout())
      .then((response) => {
        if (
          (response && response?.meta?.requestStatus === "fulfilled") ||
          !response
        ) {
          setAnchorEl(null);
          localStorage.clear();
          navigate("/login", {
            state: {
              showToastMessage: response?.payload?.message
                ? response?.payload?.message
                : "Logout successful. Have a great day!",
            },
          });
        }
        else {
          setShowErrorToast(true);
          setShowErrorToastMessage(response.paylaod.error.message);

        }
      })
      .catch((err) => {
        setShowErrorToast(true);
        setShowErrorToastMessage(err?.error?.response?.data?.message);
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

  const [isInitialRender, setIsInitialRender] = useState(true);
  const [pincodeModalOpen, setPincodeModalOpen] = useState(true);
  const [pincodeData, setPincodeData] = useState("");

  const [checkedStoredPincode, setCheckedStoredPincode] = useState(true);
  useEffect(() => {
    const storedPincode = sessionStorage.getItem("pincode");

    if (storedPincode) {
      setPincodeData(storedPincode);
      // Set pincodeModalOpen to false after processing stored pincode
      setPincodeModalOpen(false);
    } else if (checkedStoredPincode) {
      // Set pincodeModalOpen to true only during the initial render
      setCheckedStoredPincode(false)
    }
    else {
      setPincodeModalOpen(false)
    }
  }, []);
  const handleModalClose = () => {
    setPincodeModalOpen(false);
    sessionStorage.setItem("pincode", pincodeData);
  };
  const handleModalOpenController = () => {
    setPincodeModalOpen(true);
  };

  const getDataFunc = (data) => {
    if (data?.pincode.length === 6 && data?.pincode.length > 0) {
      setPincodeData(data?.pincode);
      setShowArea(true);
    } else {
      setPincodeData(null);
      setShowArea(false);
    }

  };


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
            <Link to={`/add-to-cart`} style={{ textDecoration: 'none' }}>
              <Button
                onClick={handleClick}
              //     style={{ padding: '0' }}

              >
                <img
                  src={cart}
                  alt="cart"
                  className={classes.profileIconStyle}
                />
                {addedData && Object.keys(addedData).length > 0 && (
                  <div class={classes.cartItemCountStyle}>
                    {Object.keys(addedData).length}
                  </div>
                )}
              </Button>
            </Link>
          </Box>
          {/* profile below */}
          <Box>
            <Button
              onClick={handleClick}


            >
              <img
                src={profileIcon}
                alt="profileIcon"
                className={classes.profileIconStyle}
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


          <Box>
            {pincodeData && pincodeData ?
              <div>
                <Button
                  onClick={handleModalOpenController}
                  // sx={{
                  //   color: isHovered ? "#801317" : "#fff",
                  //   background: isHovered ? "#fff" : "#801317",
                  //   borderRadius: "100px",
                  //   padding: "5px 20px",
                  //   transition: "color 0.3s, background 0.3s", // Added smooth transition
                  //   border: '1px solid #801317',
                  //   "&:hover": {
                  //     background: "#fcedee",
                  //     color: "#801317",
                  //     border: '1px solid #801317'
                  //   },
                  // }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <svg
                    className={classes.locationIconStyle}
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    viewBox="0 0 40 40"
                    fill="none"
                  >
                    <path
                      d="M20 19.9999C20.9166 19.9999 21.7016 19.6733 22.355 19.0199C23.0072 18.3677 23.3333 17.5833 23.3333 16.6666C23.3333 15.7499 23.0072 14.9649 22.355 14.3116C21.7016 13.6594 20.9166 13.3333 20 13.3333C19.0833 13.3333 18.2988 13.6594 17.6466 14.3116C16.9933 14.9649 16.6666 15.7499 16.6666 16.6666C16.6666 17.5833 16.9933 18.3677 17.6466 19.0199C18.2988 19.6733 19.0833 19.9999 20 19.9999ZM20 36.6666C15.5277 32.861 12.1877 29.326 9.97996 26.0616C7.77107 22.7983 6.66663 19.7777 6.66663 16.9999C6.66663 12.8333 8.00718 9.51381 10.6883 7.04158C13.3683 4.56936 16.4722 3.33325 20 3.33325C23.5277 3.33325 26.6316 4.56936 29.3116 7.04158C31.9927 9.51381 33.3333 12.8333 33.3333 16.9999C33.3333 19.7777 32.2294 22.7983 30.0216 26.0616C27.8127 29.326 24.4722 32.861 20 36.6666Z"
                      fill={isHovered ? '#801317' : '#801317'}
                      transition="fill 0.3s"
                    />
                  </svg>
                  &nbsp;{pincodeData}
                </Button>
              </div>

              : <div>
                <Button
                  onClick={handleModalOpenController}
                  sx={{
                    color: "#801317",
                    //     background: isHovered ? "#fff" : "#801317",
                    //        borderRadius: "100px",
                    //       padding: "5px 20px",
                    transition: "color 0.3s, background 0.3s", // Added smooth transition
                    //         border: '1px solid #801317',
                    //      "&:hover": {
                    //         background: "#fcedee",
                    //         color: "#801317",
                    //          border: '1px solid #801317'
                    //     },
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <svg
                    className={classes.locationIconStyle}
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                  >
                    <path
                      d="M20 19.9999C20.9166 19.9999 21.7016 19.6733 22.355 19.0199C23.0072 18.3677 23.3333 17.5833 23.3333 16.6666C23.3333 15.7499 23.0072 14.9649 22.355 14.3116C21.7016 13.6594 20.9166 13.3333 20 13.3333C19.0833 13.3333 18.2988 13.6594 17.6466 14.3116C16.9933 14.9649 16.6666 15.7499 16.6666 16.6666C16.6666 17.5833 16.9933 18.3677 17.6466 19.0199C18.2988 19.6733 19.0833 19.9999 20 19.9999ZM20 36.6666C15.5277 32.861 12.1877 29.326 9.97996 26.0616C7.77107 22.7983 6.66663 19.7777 6.66663 16.9999C6.66663 12.8333 8.00718 9.51381 10.6883 7.04158C13.3683 4.56936 16.4722 3.33325 20 3.33325C23.5277 3.33325 26.6316 4.56936 29.3116 7.04158C31.9927 9.51381 33.3333 12.8333 33.3333 16.9999C33.3333 19.7777 32.2294 22.7983 30.0216 26.0616C27.8127 29.326 24.4722 32.861 20 36.6666Z"
                      fill={"#801317"}
                      transition="fill 0.3s"
                    />
                  </svg>
                  &nbsp;{pincodeData}
                </Button>
              </div>}
          </Box>

        </Col>
      </Row>

      <div className="main_header py-1">
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
            <Navbar.Toggle aria-controls="navbarScroll" style={{ margin: "5px 8px", background: '#FFF' }} />
            <Navbar.Collapse id="navbarScroll">
              <Nav navbarScroll style={{ paddingLeft: "4rem" }}>
                {categoryList &&
                  categoryList?.map((elem) => {
                    return (
                      <NavDropdown
                        title={
                          <div
                            className="main-heading-clickable heading-text"
                            onClick={() => handleCategoryClick(elem?._id)}
                            style={{ color: "#fff", fontWeight: '600' }}
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
                        style={{
                          textTransform: "capitalize",

                        }}
                      >
                        <Row>
                          <Col md={12}>
                            <Row>

                              {elem?.tags?.map((tag, i) => {
                                return (

                                  <Col md={2}
                                    style={{
                                      display: 'flex',
                                      justifyContent: 'center',
                                      padding: "1rem",
                                      background: i > 0 && i % 2 != 0 ? "#f2f2f2" : "#fff"
                                    }}
                                  >
                                    <Box>
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
                                              className={`${classes.tagDesign}`}
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
                                  </Col>
                                );
                              })}

                              <Col md={4} style={{ padding: " 1rem 2.5rem 0px" }}>
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

                          </Col>
                        </Row>
                      </NavDropdown>
                    );
                  })}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>


        <Modal open={pincodeModalOpen}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "30rem",
              bgcolor: "white",
              borderRadius: 4,
            }}
          >
            {/* Header */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem",
                borderBottom: "1px solid #ccc",
              }}
            >
              <Typography variant="h6">Select Delivery Location</Typography>
              <IconButton onClick={handleModalClose}>
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Content */}
            <Box sx={{ padding: "2rem" }}>
              <Pincode
                showCity={false}
                showDistrict={false}
                showState={false}
                invalidError="Please check pincode"
                getData={getDataFunc}
                showArea={showArea}
                pincodeInput={{
                  borderRadius: "10px",
                  width: "100%",
                  border: "1px solid grey",
                  height: "55px",
                  padding: "2rem 1rem",
                  marginRight: "1.7rem",
                }}
                areaInput={{
                  backgroundColor: "white",
                  border: "none",
                  color: "red",
                  fontSize: "12px",
                }}
              />
            </Box>

            {/* Footer */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "1rem",
                borderTop: "1px solid #ccc",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                disabled={!pincodeData}
                onClick={handleModalClose}
              >
                Continue Shopping
              </Button>
            </Box>
          </Box>
        </Modal>
        {showErrorToast &&
          <ErrorToaster
            showErrorToast={showErrorToast}
            setShowErrorToast={setShowErrorToast}
            showErrorToastMessage={showErrorToastMessage}
            customErrorMessage={
              "Incorrect login credentials. Please verify and retry."
            }
          />
        }
        {showToast && (
          <SuccessToaster
            showToast={showToast}
            setShowToast={setShowToast}
            showToastMessage={showToastMessage}
            customMessage={`Logout successful. Have a great day! `}
          />
        )}
      </div>
    </Grid>
  );
};

export default Header;
