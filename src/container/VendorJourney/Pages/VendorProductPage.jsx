import React, { useState, useEffect } from "react";
import { Row, Col, Form, Table, InputGroup, Spinner, Container, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getMenuBarList } from "Redux/Slices/HeaderMenuList/HeaderMenuListSlice";
import { getVendorProducts } from "Redux/Slices/ProductPage/ProductsPageSlice";
import SearchIcon from '@mui/icons-material/Search';
import { Card, CardContent } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ViewProductForm from "./ViewProductPage/ViewProductForm";
const ProductsPage = () => {

    const [modalData, setModalData] = useState({ type: null, data: null });
    const [isLoading, setIsLoading] = useState(true);
    const [openViewProductPage, setOpenViewProductPage] = useState(false);
    const [defaultCategory, setDefaultCategory] = useState();
    const [searchInput, setSearchInput] = useState("");

    const dispatch = useDispatch();

    const productsList = useSelector(
        (state) => state?.getProductsList?.getVendorProductsListData?.products
    );

    useEffect(() => {
        if (!productsList || productsList?.length === 0) {
            dispatch(getVendorProducts())
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
        { title: "Title", class: "" },
        { title: "Category", class: "" },
        { title: "Image", class: "" },
        { title: "Status", class: "" },
        { title: "Action", class: "text-center" },
    ];

    const tableActions = [
        {
            name: "View",
            class: "eye",
            icon: <VisibilityIcon />,
            onClick: (data) => {
                setOpenViewProductPage(true);
                setModalData({ data: data });
            },
        },
        // {
        //     name: "Edit",
        //     class: "edit",
        //     icon: "far fa-edit",
        //     onClick: (data) => {
        //         setOpenEditProductPage(true);
        //         setModalData({ type: "Edit", data: data });
        //     },
        // },
        // {
        //     name: "Delete",
        //     class: "delete",
        //     icon: "far fa-trash-alt",
        //     onClick: (data) => {
        //         setShowModal(true);
        //         setModalData({
        //             type: "Delete",
        //             data: data,
        //             modalContent: (
        //                 <DeleteDataModal
        //                     productId={data?._id}
        //                     productName={data?.name}
        //                     setShowModal={setShowModal}
        //                     setIsLoading={setIsLoading}
        //                     setAddShowErrorToast={(err) => {
        //                         setAddShowErrorToast(err);
        //                     }}
        //                     setAddShowErrorToastMessage={(msg) => {
        //                         setAddShowErrorToastMessage(msg);
        //                     }}
        //                     setAddShowToast={(show) => {
        //                         setAddShowToast(show);
        //                     }}
        //                     setAddShowToastMessage={(showMessage) => {
        //                         setAddShowToastMessage(showMessage);
        //                     }}
        //                 />
        //             ),
        //             modalTitle: "Delete Product",
        //         });
        //     },
        // },
    ];

    const getFilteredProducts = () => {
        if (defaultCategory) {
            if (defaultCategory == "All") {
                return productsList;
            }
            return productsList?.filter((product) => product?.category === defaultCategory);
        }
        return productsList;
    };

    const getSearchedAndFilteredProducts = () => {
        if (searchInput) {
            const searchQuery = searchInput.toLowerCase();
            const searchedProducts = productsList?.filter((product) =>
                product?.name.toLowerCase().includes(searchQuery)
            );

            if (defaultCategory && defaultCategory !== "All") {
                // Filter by category if a specific category is selected
                return searchedProducts?.filter(
                    (product) => product?.category === defaultCategory
                );
            }

            return searchedProducts;
        }

        // If no search query, return products filtered by category or all products
        if (defaultCategory && defaultCategory !== "All") {
            return productsList?.filter((product) => product?.category === defaultCategory);
        }

        return productsList; // If defaultCategory is "All" or not specified, return all products
    };

    const RenderTable = () => {

        const filteredProducts = getFilteredProducts();
        const searchedProducts = getSearchedAndFilteredProducts();
        const displayProducts = searchInput ? searchedProducts : defaultCategory ? filteredProducts : searchedProducts;

        return (
            <Col md={12}>
                <Card variant="outlined" className="mt-3">
                    <CardContent>
                        <div className="user_table mt-4">
                            <div className="nftstable">
                                <div className="tablearea">
                                    <Table responsive className="m-0">
                                        <thead>
                                            <tr>
                                                {tableHeaders &&
                                                    tableHeaders?.map((header, index) => (
                                                        <th className={header?.class} key={index}>
                                                            {header?.title}
                                                        </th>
                                                    ))}
                                            </tr>
                                        </thead>
                                        <tbody >
                                            {displayProducts && displayProducts?.length > 0 ? (
                                                displayProducts?.map((product, index) => {
                                                    return (
                                                        <tr key={product?._id}>
                                                            <td>{index + 1}</td>
                                                            <td>{product?.name}</td>
                                                            <td>{product?.categoryName}</td>
                                                            <td>
                                                                <img
                                                                    src={product?.productPictures[0]?.img}
                                                                    style={{ borderRadius: "10px" }}
                                                                    alt=""
                                                                    width={70}
                                                                    height={70}
                                                                    loading="lazy"
                                                                />
                                                            </td>
                                                            <td>
                                                                {product?.approvedBySuperAdmin ? (
                                                                    <Badge bg="success">Approved</Badge>
                                                                ) : (
                                                                    <Badge bg="warning">Pending</Badge>
                                                                )}
                                                            </td>
                                                            <td>
                                                                <div
                                                                    className="table_icons d-flex align-items-center justify-content-center"
                                                                    key={index}
                                                                >
                                                                    {tableActions && tableActions?.map((action, index) => (
                                                                        <div
                                                                            className={action?.class?.toLowerCase()}
                                                                            onClick={() => action?.onClick(product)}
                                                                        >
                                                                            <Link to="#">
                                                                                {action?.icon}
                                                                            </Link>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            ) : (
                                                <tr>
                                                    <td>
                                                        <div className="d-flex justify-content-center pt-4">
                                                            <p className="text-red">Product list is empty !!</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
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
                                                <h4 style={{ textTransform: "capitalize" }}>{"All Products"}</h4>
                                                <p>Welcome to All Products page</p>
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

    );
};

export default ProductsPage;
