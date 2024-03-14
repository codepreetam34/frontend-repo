import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    Avatar,
    Box,
    Grid,
    ListItem,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Stack,
    useMediaQuery,
} from "@mui/material";
import { Button, Col, Container, Offcanvas, Row } from "react-bootstrap";
import { makeStyles } from "@mui/styles";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';

import InventoryIcon from '@mui/icons-material/Inventory';
import PaymentIcon from '@mui/icons-material/Payment';
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import Dashboard from "./Pages/Dashboard";
import Orders from "./Pages/Orders";
import Returns from "./Pages/Returns";
import CategoryIcon from '@mui/icons-material/Category';
import Inventory from "./Pages/Inventory";
import Payment from "./Pages/Payment";
import FMTypography from "components/FMTypography/FMTypography";
import ProductsPage from "./Pages/VendorProductPage";
import vibezterLogo from "./vibezterLogo.png";

const useStyles = makeStyles((theme) => ({

    profileIconStyle: {
        width: "30px !important",
        height: "30px !important",
        [theme.breakpoints.down("sm")]: {
            width: "25px !important",
            height: "25px !important",
        },
    },
    mobileBackground: {
        background: "rgb(252, 237, 238) !important",
    },
    mobileInnerBackground: {
        background: "#801317 !important",
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
        [theme.breakpoints.down("sm")]: {
            width: "40px",
            height: "40px",
        },
    },
    logoStyle: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: "0.5rem",
        [theme.breakpoints.down("sm")]: {
            gap: "0.1rem",
        },
    },
    vibezterLogoStyle: {
        [theme.breakpoints.down("sm")]: {
            width: "85px",
            height: "40px"
        },
    }
}));
const VendorHome = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [showErrorToastMessage, setShowErrorToastMessage] = useState();
    const classes = useStyles();
    const [showMenu, setShowMenu] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState('Dashboard');
    const isMobile = useMediaQuery("(max-width:600px)");

    const personLoggedIn = JSON.parse(
        localStorage.getItem("Sidebar_Module_Assigned_Vendor")
    )?.fullName;
    const personLoggedData = JSON.parse(
        localStorage.getItem("Sidebar_Module_Assigned_Vendor")
    );

    const personLoggedInId = JSON.parse(
        localStorage.getItem("Sidebar_Module_Assigned_Vendor")
    )?._id;
    const handleToggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const menuOptions = {
        Dashboard: <Dashboard personLoggedInId={personLoggedInId} />,
        Orders: <Orders />,
        Inventory: <Inventory />,
        Payment: <Payment />,
        Returns: <Returns />,
        Products: <ProductsPage />
    };

    const handleMenuClick = (menuOption) => {
        setSelectedMenu(menuOption);
    };

    const onSubmit = (data) => {
        dispatch()
            .unwrap()
            .then((res) => {
                if (res) {
                    navigate(VENDOR_REGISTRATION);
                    //              notify({ type: "success", content: "Logged in successfully" });
                }
            })
            .catch((err) => {
                setShowErrorToast(true);
                setShowErrorToastMessage(err?.error?.response?.data?.message);
            });
    };

    return (
        <Grid container>
            <Grid item xs={3}>
                <Box bgcolor="rgb(39, 40, 41)" color="primary.contrastText" height="100%">
                    <Container fluid>
                        <Offcanvas.Title>
                            <div className="d-flex align-items-center" style={{
                                padding: "1rem 0rem 0 0",
                            }}>
                                <div style={{
                                    width: "48px",
                                    height: "48px",
                                    background: "#f8f8f8",
                                    display: "flex",
                                    overflow: "hidden",
                                    position: "relative",
                                    fontSize: "1.25rem",
                                    alignItems: "center",
                                    flexShrink: " 0",
                                    borderRadius: "50%",
                                    justifyContent: "center",
                                }}>

                                    <Stack
                                        direction="row"
                                        spacing={2}
                                    >
                                        <Avatar
                                            src={
                                                personLoggedData?.profilePicture
                                                    ? personLoggedData?.profilePicture
                                                    : "/broken-image.jpg"
                                            }
                                            style={{ background: !personLoggedData?.profilePicture ? "#801317" : "" }}
                                        />
                                    </Stack>

                                </div>
                                {personLoggedIn ? (
                                    <a
                                        style={{
                                            color: "#fff",
                                            border: "none",
                                            fontWeight: "500",
                                            fontSize: "1rem",
                                            borderRadius: "10px",
                                            paddingLeft: "10px",
                                            marginRight: "9rem",
                                        }}
                                    // href={`/my-profile/${personLoggedInId}`}
                                    >
                                        {personLoggedIn}
                                    </a>
                                ) : <FMTypography
                                    displayText={"Hi Guest"}
                                    styleData={{ fontWeight: '600', marginLeft: "0.5rem", fontSize: "14px", color: "#fff" }}
                                />}
                                <ExitToAppIcon />
                            </div>
                        </Offcanvas.Title>
                        <hr />
                        <Box>
                            <ListItem button selected={selectedMenu === 'Dashboard'} onClick={() => handleMenuClick('Dashboard')}>
                                <ListItemIcon>
                                    <DashboardIcon style={{ color: "#fff" }} />
                                </ListItemIcon>
                                <ListItemText primary="Dashboard" />
                            </ListItem>
                            <ListItem button selected={selectedMenu === 'Orders'} onClick={() => handleMenuClick('Orders')}>
                                <ListItemIcon>
                                    <ShoppingCartIcon style={{ color: "#fff" }} />
                                </ListItemIcon>
                                <ListItemText primary="Orders" />
                            </ListItem>
                            <ListItem button selected={selectedMenu === 'Inventory'} onClick={() => handleMenuClick('Inventory')}>
                                <ListItemIcon>
                                    <InventoryIcon style={{ color: "#fff" }} />
                                </ListItemIcon>
                                <ListItemText primary="Inventory" />
                            </ListItem>
                            <ListItem button selected={selectedMenu === 'Payment'} onClick={() => handleMenuClick('Payment')}>
                                <ListItemIcon>
                                    <PaymentIcon style={{ color: "#fff" }} />
                                </ListItemIcon>
                                <ListItemText primary="Payment" />
                            </ListItem>
                            <ListItem button selected={selectedMenu === 'Returns'} onClick={() => handleMenuClick('Returns')}>
                                <ListItemIcon>
                                    <AssignmentReturnedIcon style={{ color: "#fff" }} />
                                </ListItemIcon>
                                <ListItemText primary="Returns" />
                            </ListItem>
                            <ListItem button selected={selectedMenu === 'Products'} onClick={() => handleMenuClick('Products')}>
                                <ListItemIcon>
                                    <CategoryIcon style={{ color: "#fff" }} />
                                </ListItemIcon>
                                <ListItemText primary="Products" />
                            </ListItem>
                        </Box>
                        <hr />
                        <Box>
                            <img src={vibezterLogo} alt="" style={{ width: "100%" }} />
                        </Box>
                        <hr />
                    </Container>
                </Box>
            </Grid>
            <Grid item xs={9}>
                <Box p={2}>
                    {menuOptions[selectedMenu]}
                </Box>
            </Grid>
        </Grid>
    );
};

export default VendorHome;
