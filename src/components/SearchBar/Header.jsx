import { Box, Grid, Typography } from "@mui/material";
import SearchBar from "components/SearchBar/SearchBar";
import React, { useEffect } from "react";
import monkeyLogo from "../../assets/monkeyLogo.svg";
import VibezterLogo from "../../assets/VibezterLogo.svg";
import cart from "../../assets/cart.svg";
import profileIcon from "../../assets/profileIcon.svg";
import menuDownArrow from "../../assets/menuDownArrow.svg";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuItem from "@mui/material/MenuItem";
import { styled, alpha } from "@mui/material/styles";
import { HeaderStyle } from "./HeaderStyle";
import { commonStyle } from "../../Styles/commonStyles";
import { Col, Container, Nav, Navbar, NavDropdown, Row } from "react-bootstrap";
import "./HeaderBootstrapMenu.css";
import { useDispatch } from "react-redux";
import { getMenuBarList } from "Redux/Slices/HeaderMenuList/HeaderMenuListSlice";

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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElSec, setAnchorElSec] = React.useState(null);

  const open = Boolean(anchorEl);
  const openSec = Boolean(anchorElSec);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClickSec = (event) => {
  //   setAnchorElSec(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  // const handleCloseSec = () => {
  //   setAnchorElSec(null);
  // };

  useEffect(() => {
    dispatch(getMenuBarList());
  });

  return (
    <Grid sx={HeaderStyle.headerFullStyle}>
      <Grid sx={HeaderStyle.iconGridContainer}>
        <Box sx={commonStyle.flexDisplayStyle}>
          <img
            src={monkeyLogo}
            alt="monkeyLogo"
            style={HeaderStyle.monkeyLogoStyle}
          />
          <img
            src={VibezterLogo}
            alt="VibezterLogo"
            style={HeaderStyle.vibezterLogoStyle}
          />
        </Box>
        <Box>
          <SearchBar placeholder={"Search gifts, experiences and more..."} />
        </Box>
        <Box>
          <img src={cart} alt="cart" style={HeaderStyle.cartStyle} />
          <img
            src={profileIcon}
            alt="profileIcon"
            style={HeaderStyle.profileIconStyle}
          />
        </Box>
      </Grid>

      <div className="main_header">
        <Navbar bg="" expand="lg" className="p-0">
          <Container fluid>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="" navbarScroll>
                <NavDropdown title="Birthday" id="navbarScrollingDropdown">
                  <Row>
                    <Col md={4}>
                      <div className="cate_area">
                        <h3>By Features</h3>
                        <NavDropdown.Item href="/">Birthday</NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Anniversary{" "}
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Something else here
                        </NavDropdown.Item>
                      </div>

                      <div className="cate_area">
                        <h3>By Features</h3>
                        <NavDropdown.Item href="/">Birthday</NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Anniversary{" "}
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Something else here
                        </NavDropdown.Item>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="cate_area">
                        <h3>Gifts - By Choice</h3>
                        <NavDropdown.Item href="/">Birthday</NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Anniversary{" "}
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Something else here
                        </NavDropdown.Item>
                      </div>

                      <div className="cate_area">
                        <h3>By Cities</h3>
                        <NavDropdown.Item href="/">Birthday</NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Anniversary{" "}
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Something else here
                        </NavDropdown.Item>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="cate_list_menu">
                        <a href="/">
                          <img
                            src="../../../images/profile.jpg"
                            className="img-fluid"
                            alt=""
                          />
                          <h4>Cakes</h4>
                        </a>
                      </div>
                    </Col>
                  </Row>
                </NavDropdown>
                <NavDropdown title="Anniversary" id="navbarScrollingDropdown">
                  <Row>
                    <Col md={3}>
                      <div className="cate_area">
                        <h3>By Features</h3>
                        <NavDropdown.Item href="/">Birthday</NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Anniversary{" "}
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Something else here
                        </NavDropdown.Item>
                      </div>

                      <div className="cate_area">
                        <h3>By Features</h3>
                        <NavDropdown.Item href="/">Birthday</NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Anniversary{" "}
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Something else here
                        </NavDropdown.Item>
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="cate_area">
                        <h3>Gifts - By Choice</h3>
                        <NavDropdown.Item href="/">Birthday</NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Anniversary{" "}
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Something else here
                        </NavDropdown.Item>
                      </div>

                      <div className="cate_area">
                        <h3>By Cities</h3>
                        <NavDropdown.Item href="/">Birthday</NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Anniversary{" "}
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Something else here
                        </NavDropdown.Item>
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="cate_list_menu">
                        <a href="/">
                          <img
                            src="../../../images/profile.jpg"
                            className="img-fluid"
                            alt=""
                          />
                          <h4>Cakes</h4>
                        </a>
                      </div>
                    </Col>
                  </Row>
                </NavDropdown>
                <NavDropdown title="Gift" id="navbarScrollingDropdown">
                  <Row>
                    <Col md={3}>
                      <div className="cate_area">
                        <h3>By Features</h3>
                        <NavDropdown.Item href="/">Birthday</NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Anniversary{" "}
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Something else here
                        </NavDropdown.Item>
                      </div>

                      <div className="cate_area">
                        <h3>By Features</h3>
                        <NavDropdown.Item href="/">Birthday</NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Anniversary{" "}
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Something else here
                        </NavDropdown.Item>
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="cate_area">
                        <h3>Gifts - By Choice</h3>
                        <NavDropdown.Item href="/">Birthday</NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Anniversary{" "}
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Something else here
                        </NavDropdown.Item>
                      </div>

                      <div className="cate_area">
                        <h3>By Cities</h3>
                        <NavDropdown.Item href="/">Birthday</NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Anniversary{" "}
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Something else here
                        </NavDropdown.Item>
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="cate_list_menu">
                        <a href="/">
                          <img
                            src="../../../images/profile.jpg"
                            className="img-fluid"
                            alt=""
                          />
                          <h4>Cakes</h4>
                        </a>
                      </div>
                    </Col>
                  </Row>
                </NavDropdown>
                <NavDropdown title="Experience" id="navbarScrollingDropdown">
                  <Row>
                    <Col md={3}>
                      <div className="cate_area">
                        <h3>By Features</h3>
                        <NavDropdown.Item href="/">Birthday</NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Anniversary{" "}
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Something else here
                        </NavDropdown.Item>
                      </div>

                      <div className="cate_area">
                        <h3>By Features</h3>
                        <NavDropdown.Item href="/">Birthday</NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Anniversary{" "}
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Something else here
                        </NavDropdown.Item>
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="cate_area">
                        <h3>Gifts - By Choice</h3>
                        <NavDropdown.Item href="/">Birthday</NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Anniversary{" "}
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Something else here
                        </NavDropdown.Item>
                      </div>

                      <div className="cate_area">
                        <h3>By Cities</h3>
                        <NavDropdown.Item href="/">Birthday</NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Anniversary{" "}
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Something else here
                        </NavDropdown.Item>
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="cate_list_menu">
                        <a href="/">
                          <img
                            src="../../../images/profile.jpg"
                            className="img-fluid"
                            alt=""
                          />
                          <h4>Cakes</h4>
                        </a>
                      </div>
                    </Col>
                  </Row>
                </NavDropdown>
                <NavDropdown title="Occasions" id="navbarScrollingDropdown">
                  <Row>
                    <Col md={3}>
                      <div className="cate_area">
                        <h3>By Features</h3>
                        <NavDropdown.Item href="/">Birthday</NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Anniversary{" "}
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Something else here
                        </NavDropdown.Item>
                      </div>

                      <div className="cate_area">
                        <h3>By Features</h3>
                        <NavDropdown.Item href="/">Birthday</NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Anniversary{" "}
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Something else here
                        </NavDropdown.Item>
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="cate_area">
                        <h3>Gifts - By Choice</h3>
                        <NavDropdown.Item href="/">Birthday</NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Anniversary{" "}
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Something else here
                        </NavDropdown.Item>
                      </div>

                      <div className="cate_area">
                        <h3>By Cities</h3>
                        <NavDropdown.Item href="/">Birthday</NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Anniversary{" "}
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Something else here
                        </NavDropdown.Item>
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="cate_list_menu">
                        <a href="/">
                          <img
                            src="../../../images/profile.jpg"
                            className="img-fluid"
                            alt=""
                          />
                          <h4>Cakes</h4>
                        </a>
                      </div>
                    </Col>
                  </Row>
                </NavDropdown>
                <NavDropdown title="Cakes" id="navbarScrollingDropdown">
                  <Row>
                    <Col md={3}>
                      <div className="cate_area">
                        <h3>By Features</h3>
                        <NavDropdown.Item href="/">Birthday</NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Anniversary{" "}
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Something else here
                        </NavDropdown.Item>
                      </div>

                      <div className="cate_area">
                        <h3>By Features</h3>
                        <NavDropdown.Item href="/">Birthday</NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Anniversary{" "}
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Something else here
                        </NavDropdown.Item>
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="cate_area">
                        <h3>Gifts - By Choice</h3>
                        <NavDropdown.Item href="/">Birthday</NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Anniversary{" "}
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Something else here
                        </NavDropdown.Item>
                      </div>

                      <div className="cate_area">
                        <h3>By Cities</h3>
                        <NavDropdown.Item href="/">Birthday</NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Anniversary{" "}
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Something else here
                        </NavDropdown.Item>
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="cate_list_menu">
                        <a href="/">
                          <img
                            src="../../../images/profile.jpg"
                            className="img-fluid"
                            alt=""
                          />
                          <h4>Cakes</h4>
                        </a>
                      </div>
                    </Col>
                  </Row>
                </NavDropdown>
                <NavDropdown title="Flowers" id="navbarScrollingDropdown">
                  <Row>
                    <Col md={3}>
                      <div className="cate_area">
                        <h3>By Features</h3>
                        <NavDropdown.Item href="/">Birthday</NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Anniversary{" "}
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Something else here
                        </NavDropdown.Item>
                      </div>

                      <div className="cate_area">
                        <h3>By Features</h3>
                        <NavDropdown.Item href="/">Birthday</NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Anniversary{" "}
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Something else here
                        </NavDropdown.Item>
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="cate_area">
                        <h3>Gifts - By Choice</h3>
                        <NavDropdown.Item href="/">Birthday</NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Anniversary{" "}
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Something else here
                        </NavDropdown.Item>
                      </div>

                      <div className="cate_area">
                        <h3>By Cities</h3>
                        <NavDropdown.Item href="/">Birthday</NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Anniversary{" "}
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Something else here
                        </NavDropdown.Item>
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="cate_list_menu">
                        <a href="/">
                          <img
                            src="../../../images/profile.jpg"
                            className="img-fluid"
                            alt=""
                          />
                          <h4>Cakes</h4>
                        </a>
                      </div>
                    </Col>
                  </Row>
                </NavDropdown>
                <NavDropdown
                  title="Combo & Hampers"
                  id="navbarScrollingDropdown"
                >
                  <Row>
                    <Col md={3}>
                      <div className="cate_area">
                        <h3>By Features</h3>
                        <NavDropdown.Item href="/">Birthday</NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Anniversary{" "}
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Something else here
                        </NavDropdown.Item>
                      </div>

                      <div className="cate_area">
                        <h3>By Features</h3>
                        <NavDropdown.Item href="/">Birthday</NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Anniversary{" "}
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Something else here
                        </NavDropdown.Item>
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="cate_area">
                        <h3>Gifts - By Choice</h3>
                        <NavDropdown.Item href="/">Birthday</NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Anniversary{" "}
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Something else here
                        </NavDropdown.Item>
                      </div>

                      <div className="cate_area">
                        <h3>By Cities</h3>
                        <NavDropdown.Item href="/">Birthday</NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Anniversary{" "}
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          Something else here
                        </NavDropdown.Item>
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="cate_list_menu">
                        <a href="/">
                          <img
                            src="../../../images/profile.jpg"
                            className="img-fluid"
                            alt=""
                          />
                          <h4>Cakes</h4>
                        </a>
                      </div>
                    </Col>
                  </Row>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      {/* menu bootstrap above */}

      {/* <Grid sx={HeaderStyle.menuGridStyle}>
        <Box sx={commonStyle.flexDisplayStyle}>
          <Box sx={HeaderStyle.menuBtnStyle}>
            <Button
              id="demo-positioned-button"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
              disableRipple
              style={commonStyle.capitalizeTextStyle}
            >
              Birthday
            </Button>
          </Box>
          <Menu
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <Grid sx={{ display: "flex" }}>
              <Box>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Box>
              <Box>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Box>
              <Box>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Box>
              <Box>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Box>
            </Grid>
          </Menu>

          <Box sx={HeaderStyle.menuBtnStyle}>
            <Button
              id="demo-positioned-button2"
              aria-controls={openSec ? "demo-positioned-menu2" : undefined}
              aria-haspopup="true"
              aria-expanded={openSec ? "true" : undefined}
              onClick={handleClickSec}
              endIcon={<KeyboardArrowDownIcon />}
              style={commonStyle.capitalizeTextStyle}
            >
              Anniversary
            </Button>
          </Box>
          <Menu
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={anchorElSec}
            open={openSec}
            onClose={handleCloseSec}
          >
            <MenuItem onClick={handleCloseSec}>dusra hu</MenuItem>
            <MenuItem onClick={handleCloseSec}>My dusra account</MenuItem>
            <MenuItem onClick={handleCloseSec}>Logout</MenuItem>
          </Menu>
        </Box>
      </Grid> */}
    </Grid>
  );
};

export default Header;
