import React, { useState, useEffect } from "react";
import { Row, Col, Form, Table, InputGroup, Spinner, Container, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getMenuBarList } from "Redux/Slices/HeaderMenuList/HeaderMenuListSlice";
import { getVendorOrders, } from "Redux/Slices/ProductPage/ProductsPageSlice";
import SearchIcon from '@mui/icons-material/Search';
import { Card, CardContent, Box, Tab, Typography, Tabs } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ViewProductForm from "./ViewProductPage/ViewProductForm";

const OnHoldContent = () => {

    const [modalData, setModalData] = useState({ type: null, data: null });
    const [isLoading, setIsLoading] = useState(true);
    const [openViewProductPage, setOpenViewProductPage] = useState(false);
    const [defaultCategory, setDefaultCategory] = useState();
    const [searchInput, setSearchInput] = useState("");

    const dispatch = useDispatch();

    const orderData = useSelector(
        (state) => state?.getProductsList?.getVendorOrdersListData?.orders
    );

    useEffect(() => {
        if (!orderData || orderData?.length === 0) {
            dispatch(getVendorOrders())
                .then((res) => {
                    setIsLoading(false);
                })
                .catch(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }
    }, [dispatch]);

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    const tableHeaders = [
        { title: "S.No.", class: "" },
        { title: "Order Id", class: "" },
        { title: "Payment Status", class: "" },
        { title: "Order Status", class: "" },
        { title: "Action", class: "text-center" },
    ];

    const tableActions = [
        {
            name: "View",
            class: "eye",
            icon: <VisibilityIcon />,
            onClick: (data) => {
                setModalData({ data: data });
            },
        },
    ];

    // const getFilteredProducts = () => {
    //     if (defaultCategory) {
    //         if (defaultCategory == "All") {
    //             return orderData;
    //         }
    //         return orderData?.filter((product) => product?.category === defaultCategory);
    //     }
    //     return orderData;
    // };

    // const getSearchedAndFilteredProducts = () => {
    //     if (searchInput) {
    //         const searchQuery = searchInput.toLowerCase();
    //         const searchedProducts = orderData?.filter((product) =>
    //             product?.name.toLowerCase().includes(searchQuery)
    //         );

    //         if (defaultCategory && defaultCategory !== "All") {
    //             // Filter by category if a specific category is selected
    //             return searchedProducts?.filter(
    //                 (product) => product?.category === defaultCategory
    //             );
    //         }
    //         return searchedProducts;
    //     }

    //     if (defaultCategory && defaultCategory !== "All") {
    //         return orderData?.filter((product) => product?.category === defaultCategory);
    //     }

    //     return orderData; 
    // };

    const DataTableBody = () => {
        return (
            <>
                <thead>
                    <tr>
                        <td
                            colSpan="7"
                            style={{ textAlign: "center", color: "#801317" }}
                        >
                            <strong>
                                <span style={{ fontSize: "1.5rem" }}>
                                    {/* {userIndex + 1}. {userOrder?.user?.fullName} */}
                                </span>
                            </strong>
                        </td>
                    </tr>
                    <tr>
                        {tableHeaders &&
                            tableHeaders?.map((header, index) => (
                                <th className={header?.class} key={index}>
                                    {header?.title}
                                </th>
                            ))}
                    </tr>
                </thead>
                {orderData && orderData?.length > 0 ? (
                    orderData?.map((userOrder, userIndex) => (
                        <React.Fragment key={userIndex}>

                            <tbody>
                                <tr key={userIndex}>
                                    <td>{userIndex + 1}</td>
                                    <td>{userOrder?._id}</td>
                                    <td>{userOrder?.paymentStatus}</td>
                                    <td>
                                        {userOrder?.orderStatus.find((ele) => ele.isCompleted)
                                            ?.type || "N/A"}
                                    </td>

                                    <td>
                                        <div className="table_icons d-flex align-items-center justify-content-center">
                                            {tableActions &&
                                                tableActions?.map((action, index) => (
                                                    <div
                                                        className={action?.class?.toLowerCase()}
                                                        onClick={() => action.onClick(userOrder)}
                                                        key={index}
                                                    >
                                                        <Link to="#">
                                                            <i className={action.icon}></i>
                                                        </Link>
                                                    </div>
                                                ))}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>

                        </React.Fragment>
                    ))
                ) : (
                    <tr>
                        <td colSpan="7">
                            <div className="d-flex justify-content-center pt-4">
                                <p className="text-red">Orders list is empty !!</p>
                            </div>
                        </td>
                    </tr>
                )}
            </>
        );
    };

    const RenderTable = () => {
        return (
            <Col md={12}>
                <div className="user_table">
                    <div className="nftstable">
                        <div className="tablearea">
                            <Table responsive className="m-0">
                                {/* <DataTableHeader /> */}
                                <DataTableBody />
                            </Table>
                        </div>
                    </div>
                </div>
            </Col>
        );
    };

    const categoryList = useSelector(
        (state) => state?.menuList?.getMenuOptionsData?.categoryList
    );

    useEffect(() => {
        if (!categoryList || categoryList.length === 0) {
            dispatch(getMenuBarList())
                .then(() => {
                    setIsLoading(false);
                })
                .catch(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }
    }, [dispatch]);

    return (

        <div>

            <div className="user_management_list">

                <Row>

                    {isLoading && isLoading ? (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                minHeight: "300px",
                            }}
                        >
                            <Spinner animation="border" role="status"></Spinner>
                        </div>
                    ) : (

                        <>

                            <Container>

                                <Row>
                                    <Col md={12}>
                                        <Card variant="outlined">
                                            <CardContent>
                                                <div className="user_heading">
                                                    <h4 style={{ textTransform: "capitalize" }}>{"All Orders"}</h4>
                                                    <p>Welcome to All Order page</p>
                                                </div>
                                                <div className="manage_searchbar">
                                                    <InputGroup className="">
                                                        <InputGroup.Text id="basic-addon1" className="">
                                                            <SearchIcon />
                                                        </InputGroup.Text>
                                                        <Form.Control
                                                            placeholder="Search Product"
                                                            value={searchInput}
                                                            onChange={handleInputChange}
                                                        />
                                                    </InputGroup>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Col>
                                </Row>

                            </Container>

                            {openViewProductPage && openViewProductPage ? (

                                <>

                                    <Container>

                                        <Row>
                                            <Col md={12}>
                                                <ViewProductForm
                                                    productData={modalData?.data}
                                                    setOpenViewProductPage={setOpenViewProductPage}
                                                />
                                            </Col>
                                        </Row>

                                    </Container>

                                </>

                            ) : (

                                <RenderTable />

                            )

                            }

                        </>

                    )

                    }

                </Row>

            </div>

        </div>

    )

}

const PendingContent = () => (
    <div>
        <Typography variant="body1">This is the Pending tab content.</Typography>
    </div>
);

const ReadyToShipContent = () => (
    <div>
        <Typography variant="body1">This is the Ready to Ship tab content.</Typography>
    </div>
);

const ShippedContent = () => (
    <div>
        <Typography variant="body1">This is the Shipped tab content.</Typography>
    </div>
);

const CancelledContent = () => (
    <div>
        <Typography variant="body1">This is the Cancelled tab content.</Typography>
    </div>
);

const Orders = () => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const renderTabContent = () => {
        switch (value) {
            case 0:
                return <OnHoldContent />;
            case 1:
                return <PendingContent />;
            case 2:
                return <ReadyToShipContent />;
            case 3:
                return <ShippedContent />;
            case 4:
                return <CancelledContent />;
            default:
                return null;
        }
    };

    return (
        <>

            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Orders
                    </Typography>
                </CardContent>
            </Card>

            <Box mb={2}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    <Tab label="On Hold (0)" />
                    <Tab label="Pending (0)" />
                    <Tab label="Ready to Ship (0)" />
                    <Tab label="Shipped" />
                    <Tab label="Cancelled" />
                </Tabs>
            </Box>

            {renderTabContent()}

        </>
    );
};

export default Orders;
