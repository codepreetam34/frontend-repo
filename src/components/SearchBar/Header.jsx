import { Avatar, Box, Grid } from "@mui/material";
import SearchBar from "../../components/SearchBar/SearchBar";
import React, { useEffect, useState } from "react";
import monkeyLogo from "../../assets/monkeyLogo.svg";
import VibezterLogo from "../../assets/VibezterLogo.svg";
import cart from "../../assets/cart.svg";
import profileIcon from "../../assets/profileIcon.svg";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  Col,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
  Row,
} from "react-bootstrap";
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
import PincodeWrapper from "components/PincodeWrapper";

const useStyles = makeStyles((theme) => ({
  commonStyle: {
    [theme.breakpoints.down("xs")]: {
      gap: "2rem",
    },
    [theme.breakpoints.down("sm")]: {
      gap: "2rem",
    },
    [theme.breakpoints.up("md")]: {
      gap: "3rem",
    },
    [theme.breakpoints.up("lg")]: {
      gap: "3rem",
    },
    [theme.breakpoints.up("xl")]: {
      gap: "7rem",
    },
  },
  link: {
    "&:hover": {
      textDecoration: "none",
    },
  },
  profileIconStyle: {
    width: "30px !important",
    height: "30px !important",
  },
  locationIconStyle: {
    width: "30px !important",
    height: "30px !important",
  },
  cartItemCountStyle: {
    position: "absolute",
    top: "-2px",
    right: "7px",
    backgroundColor: "#801317",
    color: "white",
    borderRadius: "50%",
    padding: "2px 10px",
    fontSize: "12px",
  },
  pincodeItemCountStyle: {
    color: "white",
    fontSize: "12px",
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

  iconGridContainer: {
    margin: "0",
    display: "flex",
    justifyContent: "space-between",
    padding: "3px 50px",
    background: "rgb(252, 237, 238)",
  },
  headerFullStyle: {
    backgroundColor: "white !important",
    boxShadow: "0 2px 4px rgba(0,0,0,.2)",
  },
  flexDisplayStyle: {
    display: "flex",
  },
  logoStyle: {
    display: "flex",
    alignItems: "center",
  },
  monkeyLogoStyle: {
    width: "45px",
    height: "45px",
  },
  logoStyle: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "1rem",
  },
  menuStyle: {
    padding: "2rem",
    ".MuiMenu-list": {
      width: "236px",
    },
    ".MuiPopover-paper": {
      padding: "1rem 1rem 1rem 0",
      borderRadius: "20px",
      width: "236px",
    },
  },
  menuDropdownStyle: {
    display: "flex",
    marginBottom: ".5rem",
  },
  profileStyle: {
    marginLeft: "1rem",
  },
  menuFontSize: { fontSize: "14px" },
  buttonStyle: {
    color: "#717171",
    padding: "0",
    fontSize: "10px",
    backgroundColor: "none",
    borderRadius: "10px !important",
    border: "none",
    "&:hover": {
      backgroundColor: "white",
      border: "none",
    },
  },
  typoStyle: {
    color: "#717171",
    marginLeft: "12px",
    fontSize: "10px",
    color: "black",
  },
  menuItemImg: {
    marginRight: "12px",
  },

  navPadding: {
    padding: "0px 60px",
  },

  navbarContainerPadding: {
    display: "flex",
    flexWrap: "nowrap",
    margin: "0",
    padding: "0",
    justifyContent: "start",
  },

  navbarToggle: {
    margin: "5px 8px",
    background: "#FFF",
  },
  navbarTitle: {
    color: "#fff",
    fontWeight: "600",
  },
  menuItemStyle: {
    padding: "1rem !important",
  },
}));
const Header = ({ setLandingPageModalOpen, landingPageModalOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const [menuVisible, setMenuVisible] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [showErrorToastMessage, setShowErrorToastMessage] = useState();
  const [showToast, setShowToast] = useState(false);
  const location = useLocation();
  const showToastMessage = location?.state?.showToastMessage;
  const [isHovered, setIsHovered] = useState(false);
  const [headerPageModalOpen, setHeaderPageModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [show, setShow] = useState("");
  const [pincodeData, setPincodeData] = useState("");
  const [pincodeModalOpen, setPincodeModalOpen] = useState(true);

  const personLoggedIn = JSON.parse(
    localStorage.getItem("Sidebar_Module_Assigned")
  )?.fullName;
  const personLoggedData = JSON.parse(
    localStorage.getItem("Sidebar_Module_Assigned")
  );

  const open = Boolean(anchorEl);

  const categoryList = useSelector(
    (state) => state?.menuList?.getMenuOptionsData?.categoryList
  );

  const addedData = useSelector(
    (state) => state?.addToCartProducts?.getAddToCartProductsListData?.cartItems
  );

  const personLoggedInId = JSON.parse(
    localStorage.getItem("Sidebar_Module_Assigned")
  )?._id;

  const profileNavigation = () => {
    navigate(`/my-profile/${personLoggedInId}`);
  };
  const orderNavigation = () => {
    navigate(`/my-orders`);
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
        } else {
          setShowErrorToast(true);
          setShowErrorToastMessage(response.paylaod.error.message);
        }
      })
      .catch((err) => {
        setShowErrorToast(true);
        setShowErrorToastMessage(err?.error?.response?.data?.message);
      });
  };

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
      pincodeData,
    };
    const productPageUrl = `/product-page/${payload.categoryId}/${payload.pincodeData}/${payload.tagName}`;
    window.location.href = productPageUrl;
  };

  const handleCategoryClick = (categoryId) => {
    const categoryPageUrl = `/category-page/${categoryId}`;
    window.location.href = categoryPageUrl;
  };

  // const navigateToLogin = () => {
  //   navigate(LOGIN);
  // };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModalOpenController = () => {
    setPincodeModalOpen(true);
    setHeaderPageModalOpen(true);
  };

  useEffect(() => {
    dispatch(getMenuBarList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(addToCartProductsFinal());
  }, [dispatch]);

  const [showMenu, setShowMenu] = useState(false);

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // const items = [1, 2, 3];

  // useEffect(() => {
  //   items.forEach((item) => {
  //     console.log("item", item);
  //   });
  // }, []);

  return (
    <Grid className={`${classes.headerFullStyle}`}>
      <Row className={`d-none d-md-flex ${classes.iconGridContainer}`}>
        <Col className={`${classes.flexDisplayStyle}`}>
          <a href={"/"} className={`${classes.logoStyle}`}>
            <img
              src={monkeyLogo}
              alt="monkeyLogo"
              className={`${classes.monkeyLogoStyle}`}
            />
            <img
              src={VibezterLogo}
              alt="VibezterLogo"
              claasName={`${classes.vibezterLogoStyle}`}
            />
          </a>
        </Col>
        <Col className="searchBar-col">
          <SearchBar placeholder={"Search gifts, experiences and more..."} />
        </Col>
        <Col className={`${classes.logoStyle}`}>
          <Box>
            <a href={`/add-to-cart`}>
              <Button>
                <img
                  src={cart}
                  alt="cart"
                  className={classes.profileIconStyle}
                />
                {addedData && Object.keys(addedData)?.length > 0 && (
                  <div class={classes.cartItemCountStyle}>
                    {Object.keys(addedData)?.length}
                  </div>
                )}
              </Button>
            </a>
          </Box>
          <Box>
            <Button onClick={handleClick}>
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
              className={`${classes.menuStyle}`}
            >
              <Box
                className={`${classes.menuDropdownStyle}`}
                style={{ width: "15rem" }}
              >
                <Stack
                  direction="row"
                  spacing={2}
                  className={`${classes.profileStyle}`}
                >
                  <Avatar
                    src={
                      personLoggedData?.profilePicture
                        ? personLoggedData?.profilePicture
                        : "/broken-image.jpg"
                    }
                  />
                </Stack>
                {personLoggedIn ? (
                  <Box sx={{ marginLeft: "12px" }}>
                    <FMTypography
                      displayText={personLoggedIn}
                      className={`${classes.menuFontSize}`}
                    />
                    <FMButton
                      displayText={"See your Profile"}
                      variant={"outlined"}
                      styleData={{
                        color: "black",
                        fontWeight: "600",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                      href={`/my-profile/${personLoggedInId}`}
                    />
                  </Box>
                ) : (
                  <Box>
                    <FMButton
                      displayText={"Log in"}
                      variant={"outlined"}
                      styleData={{
                        color: "black",
                        fontWeight: "600",
                        borderRadius: "10px",
                        backgroundColor: "white",
                      }}
                      href={LOGIN}
                    />
                    <FMTypography
                      displayText={"To access account"}
                      className={`${classes.typoStyle}`}
                    />
                  </Box>
                )}
              </Box>
              <hr style={{ margin: "0" }} />
              <MenuItem
                onClick={orderNavigation}
                divider
                className={`${classes.menuItemStyle}`}
              >
                <img
                  src={orderIcon}
                  alt="order-icon"
                  className={`${classes.menuItemImg}`}
                />
                My Orders
              </MenuItem>

              <MenuItem
                onHover={handleClose}
                divider
                className={`${classes.menuItemStyle}`}
              >
                <img
                  src={contactIcon}
                  alt="contact-icon"
                  className={`${classes.menuItemImg}`}
                />
                Contact Us
              </MenuItem>

              <MenuItem
                onClick={faqsHandler}
                divider
                className={`${classes.menuItemStyle}`}
              >
                <img
                  src={faqIcon}
                  alt="faqIcon-icon"
                  className={`${classes.menuItemImg}`}
                />
                FAQ's
              </MenuItem>

              {personLoggedIn && (
                <MenuItem
                  onClick={logoutHandler}
                  divider
                  className={`${classes.menuItemStyle}`}
                >
                  <img
                    src={logoutIcon}
                    alt="logout-icon"
                    className={`${classes.menuItemImg}`}
                  />
                  Log Out
                </MenuItem>
              )}
            </Menu>
          </Box>

          <Box>
            {pincodeData && pincodeData ? (
              <div>
                <Button
                  onClick={handleModalOpenController}
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
                      fill={isHovered ? "#801317" : "#801317"}
                      transition="fill 0.3s"
                    />
                  </svg>
                  &nbsp;{pincodeData}
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  onClick={handleModalOpenController}
                  sx={{
                    color: "#801317",
                    transition: "color 0.3s, background 0.3s",
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
              </div>
            )}
          </Box>
        </Col>
      </Row>

      <div className={`d-md-none`}>
        <Navbar expand="lg" bg="light">
          <Container fluid>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              onClick={handleToggleMenu}
            />
          </Container>
        </Navbar>

        {/* Offcanvas menu content */}
        <Offcanvas
          className="offcanvas-menu"
          show={showMenu}
          onHide={() => setShowMenu(false)}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Mobile Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="px-3 py-2" style={{ width: "22rem" }}>
            <Nav className="flex-column">
              <NavDropdown
                title="Parent Item 1"
                id="parent-item-1"
                className="parentMenu"
              >
                <NavDropdown.Item href="#child1">Child 1</NavDropdown.Item>
                <NavDropdown.Item href="#child2">Child 2</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown
                  title="Submenu 1"
                  id="submenu-1"
                  className="submenu"
                >
                  <NavDropdown.Item href="#subchild1">
                    Subchild 1
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#subchild2">
                    Subchild 2
                  </NavDropdown.Item>
                </NavDropdown>
              </NavDropdown>

              <NavDropdown
                title="Parent Item 2"
                id="parent-item-2"
                className="parentMenu"
              >
                <NavDropdown.Item href="#child3">Child 3</NavDropdown.Item>
                <NavDropdown.Item href="#child4">Child 4</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown
                  title="Submenu 2"
                  id="submenu-2"
                  className="submenu"
                >
                  <NavDropdown.Item href="#subchild3">
                    Subchild 3
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#subchild4">
                    Subchild 4
                  </NavDropdown.Item>
                </NavDropdown>
              </NavDropdown>
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      </div>

      <div className={`main_header d-none d-md-flex `}>
        <Navbar bg="" expand="lg">
          <Container fluid className={`${classes.navbarContainerPadding}`}>
            <Navbar.Collapse id="navbarScroll">
              <Nav navbarScroll className={`${classes.navpadding}`}>
                {categoryList &&
                  categoryList?.map((elem, index) => {
                    return (
                      <NavDropdown
                        title={
                          <div
                            onClick={() => handleCategoryClick(elem?._id)}
                            className={`main-heading-clickable heading-text ${classes.navbarTitle}`}
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
                                  <Col
                                    md={2}
                                    key={i}
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      padding: "1rem",
                                      background:
                                        i > 0 && i % 2 != 0
                                          ? "#f2f2f2"
                                          : "#fff",
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
                                        {tag?.names?.map((name, index) => {
                                          return (
                                            <div
                                              key={index}
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

                              <Col
                                md={{ span: 4 }}
                                style={{ padding: " 1rem 2.5rem 0px" }}
                              >
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

        {showErrorToast && (
          <ErrorToaster
            showErrorToast={showErrorToast}
            setShowErrorToast={setShowErrorToast}
            showErrorToastMessage={showErrorToastMessage}
            customErrorMessage={
              "Incorrect login credentials. Please verify and retry."
            }
          />
        )}
        {showToast && (
          <SuccessToaster
            showToast={showToast}
            setShowToast={setShowToast}
            showToastMessage={showToastMessage}
            customMessage={`Logout successful. Have a great day! `}
          />
        )}
      </div>

      <PincodeWrapper
        setHeaderPageModalOpen={setHeaderPageModalOpen}
        headerPageModalOpen={headerPageModalOpen}
        landingPageModalOpen={landingPageModalOpen}
        setLandingPageModalOpen={setLandingPageModalOpen}
        setPincodeData={setPincodeData}
        pincodeData={pincodeData}
        pincodeModalOpen={pincodeModalOpen}
        setPincodeModalOpen={setPincodeModalOpen}
      />
    </Grid>
  );
};

export default Header;
