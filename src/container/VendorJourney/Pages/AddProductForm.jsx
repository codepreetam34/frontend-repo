import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { addVendorProducts } from "../../../Redux/Slices/ProductPage/ProductsPageSlice";
import { useDispatch, useSelector } from "react-redux";
import { getMenuBarList } from "../../../Redux/Slices/HeaderMenuList/HeaderMenuListSlice";
import { addProductSchema } from "../../../validationSchema/addProductSchema";
import Editor from "../ReactQuill/Editor";
import GenericEditor from "../ReactQuillSpecification/GenericEditor";
import { useNavigate } from "react-router";
const AddProductForm = ({
    setAddShowErrorToast,
    setAddShowErrorToastMessage,
    setIsLoading,
}) => {
    const dispatch = useDispatch();
    const [pinCode, setPinCode] = useState([""]);
    const [defaultCategory, setDefaultCategory] = useState();
    const [defaultCategoryName, setDefaultCategoryName] = useState();
    const navigate = useNavigate();
    const [bannerPicture, setBannerPicture] = useState([
        {
            img: "",
            imageAltText: "",
            picturePreview: "",
        },
    ]);
    const [tagType, setTagType] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [additionalTags, setAdditionalTags] = useState([]);
    const [descriptionData, setDescriptionData] = useState("");
    const [specificationData, setSpecificationData] = useState("");

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


    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: yupResolver(addProductSchema),
        mode: "onChange",
    });

    const handleImageAltText = (event, i) => {
        setBannerPicture((bannerPicture) => {
            const newBannerPicture = [...bannerPicture];
            newBannerPicture[i].imageAltText = event.target.value;
            return newBannerPicture;
        });
    };
    const handleBannerPictures = (e, i) => {
        setBannerPicture((bannerPicture) => {
            const newBannerPicture = [...bannerPicture];
            newBannerPicture[i].img = e.target.files[0];
            newBannerPicture[i].picturePreview = URL.createObjectURL(
                e.target.files[0]
            );
            return newBannerPicture;
        });
    };
    const addProductPicture = () => {
        setBannerPicture([
            ...bannerPicture,
            {
                img: "",
                imageAltText: "",
                picturePreview: "",
            },
        ]);
    };

    const handleInputChange = async (e, index) => {
        const value = e;
        const list = [...pinCode];
        list[index] = value;
        setPinCode(list);
    };
    const handleAddClick = () => {
        setPinCode([...pinCode, [""]]);
    };
    const onRemovePincode = (indexToRemove) => {
        const updatedPinCode = [...pinCode];
        updatedPinCode.splice(indexToRemove, 1);
        setPinCode(updatedPinCode);
    };

    const onSubmit = (data) => {
        const formData = new FormData();
        if (data?.name) formData.append("name", data?.name?.toString());
        if (descriptionData) formData.append("description", descriptionData);
        if (defaultCategory) formData.append("category", defaultCategory);
        if (data?.deliveryDay) formData.append("deliveryDay", data?.deliveryDay);
        if (data?.discountPrice)
            formData.append("discountPrice", data?.discountPrice);
        if (data?.quantity) formData.append("quantity", data?.quantity);
        if (data?.offer) formData.append("offer", data?.offer);
        if (data?.halfkgprice) formData.append("halfkgprice", data?.halfkgprice);
        if (data?.onekgprice) formData.append("onekgprice", data?.onekgprice);
        if (data?.twokgprice) formData.append("twokgprice", data?.twokgprice);
        if (data?.actualPrice) formData.append("actualPrice", data?.actualPrice);
        if (specificationData) {
            formData.append("specifications", specificationData);
        }
        Array.from(pinCode).forEach((item) => {
            formData.append("pincode", item);
        });
        
        // Array.from(tags).forEach((item) => {
        //   formData.append("tags", item);
        // });

        const tagsArray = additionalTags.map((additionalTag) => {
            return {
                tagType: additionalTag.tagType,
                names: additionalTag.names,
            };
        });
        formData.append("tags", JSON.stringify(tagsArray));

        if (bannerPicture && bannerPicture?.length > 1) {
            bannerPicture?.map((file, index) => {
                return {
                    img: formData.append("productPicture", file?.img),
                    imageAltText: formData.append("imageAltText", file?.imageAltText),
                };
            });
        } else if (bannerPicture && bannerPicture?.length === 1) {
            bannerPicture[0]?.img &&
                formData.append("productPicture", bannerPicture[0]?.img);
            bannerPicture[0]?.imageAltText &&
                formData.append("imageAltText", bannerPicture[0]?.imageAltText);
        }
        dispatch(addVendorProducts(formData)).then((res) => {
            setIsLoading(true);
            if (
                res?.paylaod?.error?.response?.status === 400 ||
                res?.paylaod?.error?.response?.status === 500
            ) {
                setIsLoading(false);
                setAddShowErrorToast(true);
                setAddShowErrorToastMessage(res.paylaod.error.message);
                navigate(-1)
            } else {
                setIsLoading(false);
                // setAddShowToast(true);
                // setAddShowToastMessage(res.payload.message);
                navigate(-1)
                // dispatch(getProducts());
            }
        });
    };

    const handleSelectCategory = (e) => {
        setDefaultCategory(e.target.value);
        const categoryIdToFind = e.target.value;
        const foundCategory = categoryList.find(
            (item) => item._id === categoryIdToFind
        );
        if (foundCategory) {
            setDefaultCategoryName(foundCategory?.name);
        } else {
            console.log("Category not found ", defaultCategoryName);
        }
        setTagType("");
    };

    const combinedOptions = [
        {
            name: "Cakes",
            categories: ["By Featured", "By Occasion", "By Flavours", "By Types"],
            options: [
                // Options for "BY FEATURED"
                [
                    "All Cakes",
                    "Best Sellers",
                    "Top Category",
                    "Same Day Delivery",
                    "New Arrivals",
                    "Midnight Delivery",
                    "Flowers N Cakes",
                    "Cake Combos",
                    "Cake With Chocolates",
                    "Cake With Plants",
                    "Cakes and Guitarist",
                ],
                // Options for "BY OCCASION"
                [
                    "Birthday Cakes",
                    "Kid's Birthday Cakes",
                    "Anniversary Cakes",
                    "1st Anniversary",
                    "25th Anniversary",
                    "Wedding Cakes",
                    "Congratulations",
                    "Make Small Celebrations Big",
                ],
                // Options for "BY FLAVOURS"
                [
                    "Truffle Cakes",
                    "Chocolate Cakes",
                    "Black Forest Cakes",
                    "Butterscotch Cakes",
                    "Caramel Cakes",
                    "Coffee Cakes",
                    "Walnut Cakes",
                    "Pineapple Cakes",
                    "Fresh Fruit Cakes",
                    "Pinata Cakes",
                ],
                // Options for "BY TYPES"
                [
                    "Bento Cakes",
                    "Eggless Cakes",
                    "Photo Cakes",
                    "Designer Cakes",
                    "Fondant Cakes",
                    "Fusion Cakes",
                    "Cup Cakes",
                    "Dry Cakes",
                    "Jar Cakes",
                ],
            ],
        },
        {
            name: "Plants",
            categories: ["By Featured", "By Occasion", "By Planters", "By Types"],
            options: [
                // Options for "BY FEATURED"
                [
                    "Best Sellers",
                    "Same Day Delivery",
                    "Top Category",
                    "New Arrivals",
                    "Air Purifying Plants",
                    "Low Maintenance Plants",
                    "Indoor Plants",
                ],
                // Options for "BY OCCASION"
                ["Birthday", "Anniversary", "House Warming", "Good Luck"],
                // Options for "BY PLANTERS"
                [
                    "Ceramic Planters",
                    "Metal Planters",
                    "Glass Planters",
                    "Self Watering Planters",
                ],
                // Options for "BY TYPES"
                [
                    "Money Plants",
                    "Lucky Bamboo",
                    "Snake Plants",
                    "Jade Plants",
                    "Bonsai Plants",
                    "Flowering Plants",
                ],
            ],
        },
        {
            name: "Testing Category",
            categories: ["By Featured", "By Occasion", "By Planters", "By Types"],
            options: [
                // Options for "BY FEATURED"
                [
                    "Best Sellers",
                    "Same Day Delivery",
                    "Top Category",
                    "New Arrivals",
                    "Air Purifying Plants",
                    "Low Maintenance Plants",
                    "Indoor Plants",
                ],
                // Options for "BY OCCASION"
                ["Birthday", "Anniversary", "House Warming", "Good Luck"],
                // Options for "BY PLANTERS"
                [
                    "Ceramic Planters",
                    "Metal Planters",
                    "Glass Planters",
                    "Self Watering Planters",
                ],
                // Options for "BY TYPES"
                [
                    "Money Plants",
                    "Lucky Bamboo",
                    "Snake Plants",
                    "Jade Plants",
                    "Bonsai Plants",
                    "Flowering Plants",
                ],
            ],
        },
    ];

    const renderTagCheckboxes = () => {
        if (defaultCategoryName && tagType) {
            const category = combinedOptions.find(
                (option) =>
                    option.name &&
                    option.name.toLowerCase() === defaultCategoryName.toLowerCase()
            );
            if (category) {
                const tagCategory =
                    category.options[category.categories.indexOf(tagType)];

                return tagCategory.map((tagName, index) => (
                    <Form.Check
                        key={index}
                        type="checkbox"
                        label={tagName}
                        checked={selectedTags.includes(tagName)}
                        onChange={(e) => {
                            if (e.target.checked) {
                                setSelectedTags((prevTags) => [...prevTags, tagName]);
                            } else {
                                setSelectedTags((prevTags) =>
                                    prevTags.filter((tag) => tag !== tagName)
                                );
                            }
                        }}
                        value={tagName}
                        style={{ width: "10rem" }}
                    />
                ));
            } else {
                return null;
            }
        }

        return null;
    };

    const handleAddTag = () => {
        if (tagType && selectedTags.length > 0) {
            const newTag = { tagType, names: [...selectedTags] };
            setAdditionalTags([...additionalTags, newTag]);
            setSelectedTags([]);
        }
    };

    const renderAdditionalTags = () => {
        return additionalTags.map((tag, index) => (
            <Col md={6} key={index} className="mb-4">
                <Form.Group controlId={`additionalTagType_${index}`}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Form.Label>Tag Type</Form.Label>
                        <Form.Group>
                            <Button
                                variant="contained"
                                onClick={() => onRemoveTags(index)}
                                style={{
                                    textTransform: "capitalize",
                                }}
                            >
                                <i className="fa-solid fa-circle-xmark"></i>
                            </Button>
                        </Form.Group>
                    </div>
                    <Form.Control
                        type="text"
                        className="mb-2"
                        name={`additionalTags[${index}].tagType`}
                        defaultValue={tag.tagType}
                        disabled
                    />
                </Form.Group>

                <Form.Group controlId={`additionalTagNames_${index}`}>
                    <Form.Label>Tag Names</Form.Label>
                    {tag ? (
                        tag?.names?.map((name, nameIndex) => (
                            <div key={nameIndex}>
                                <Form.Check
                                    type="checkbox"
                                    label={name}
                                    className="mb-2"
                                    disabled
                                    checked
                                    onChange={(e) => {
                                        const updatedNames = tag.names || [];
                                        if (e.target.checked) {
                                            updatedNames.push(name);
                                        } else {
                                            const nameIndex = updatedNames.indexOf(name);
                                            if (nameIndex !== -1) {
                                                updatedNames.splice(nameIndex, 1);
                                            }
                                        }
                                        const updatedSelectedTagNames = [...selectedTags];
                                        updatedSelectedTagNames[index] = updatedNames;
                                        setSelectedTags(updatedSelectedTagNames);
                                    }}
                                    value={name}
                                />
                            </div>
                        ))
                    ) : (
                        <></>
                    )}
                </Form.Group>
            </Col>
        ));
    };

    const onRemoveTags = (index) => {
        const updatedTags = [...additionalTags];
        updatedTags.splice(index, 1);
        setAdditionalTags(updatedTags);
    };

    const onRemoveBannerPicture = (index) => {
        const inputList = [...bannerPicture];
        inputList.splice(index, 1);
        setBannerPicture(inputList);
        // const list2 = [...imageAltText];
        // list2.splice(, 1);Plan
        // setImageAltText(list2);
    };

    const handleDescriptionData = (descriptionData) => {
        setDescriptionData(descriptionData);
    };
    const handleSpecificationData = (specificationData) => {
        setSpecificationData(specificationData);
    };

    return (
        <div className="container">
            <Form
                className="user_form"
                onSubmit={handleSubmit(onSubmit)}
                style={{ padding: "2rem" }}
            >
                <Row>

                    <Col md={12} className="product-detail-design mb-3" style={{
                        border: "0.0625rem solid rgba(26, 26, 26, 0.12)",
                        borderRadius: "0.5rem",
                        padding: "0.625rem 0.875rem"
                    }}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="form-group-padding-bottom">
                                    <Form.Label>Name</Form.Label>

                                    <Form.Control
                                        id="name"
                                        type="text"
                                        name="name"
                                        {...register("name")}
                                        isInvalid={!!errors.name}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.name?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="form-group-padding-bottom">
                                    <Form.Label>Actual Price</Form.Label>

                                    <Form.Control
                                        id="actualPrice"
                                        type="text"
                                        name="actualPrice"
                                        {...register("actualPrice")}
                                        isInvalid={!!errors.actualPrice}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.actualPrice?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group className="form-group-padding-bottom">
                                    <Form.Label>Select Category</Form.Label>
                                    <div className="select-wrapper">
                                        <Form.Control
                                            as="select"
                                            name="categoryId"
                                            id="categoryId"
                                            isInvalid={!!errors?.categoryId}
                                            value={defaultCategory}
                                            onChange={(e) => handleSelectCategory(e)}
                                        >
                                            <option disabled selected style={{ fontWeight: "600" }}>
                                                Select Category
                                            </option>
                                            {categoryList &&
                                                categoryList?.map((option) => (
                                                    <option key={option._id} value={option?._id}>
                                                        {option?.name}
                                                    </option>
                                                ))}
                                        </Form.Control>
                                        <div className="select-arrow"></div>
                                    </div>
                                    <Form.Control.Feedback type="invalid">
                                        {errors?.categoryId?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group className="form-group-padding-bottom">
                                    <Form.Label>Delivery Day</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="deliveryDay"
                                        id="deliveryDay"
                                        {...register("deliveryDay")}
                                        isInvalid={!!errors.deliveryDay}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.deliveryDay?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Col>

                    <Col md={12} className="product-detail-design" style={{
                        border: "0.0625rem solid rgba(26, 26, 26, 0.12)",
                        borderRadius: "0.5rem",
                        marginTop: "2rem", padding: "0.625rem 0.875rem"
                    }}>
                        <Form.Group className="form-group-padding-bottom">
                            <Form.Label>Description</Form.Label>
                            <Editor
                                onData={handleDescriptionData}
                                dataText={descriptionData}
                                editorId="descriptionEditor"
                            />
                        </Form.Group>
                    </Col>

                    <Col md={12} className="product-detail-design" style={{
                        border: "0.0625rem solid rgba(26, 26, 26, 0.12)",
                        borderRadius: "0.5rem",
                        marginTop: "2rem", padding: "0.625rem 0.875rem"
                    }}>
                        <Form.Group className="form-group-padding-bottom">
                            <Form.Label>Specifications</Form.Label>
                            <GenericEditor
                                onData={handleSpecificationData}
                                dataText={specificationData}
                                editorId="uniqueEditorId" // Provide a unique ID
                                placeholder="Write something amazing..."
                            />
                        </Form.Group>
                    </Col>

                    <Col md={12} className="product-detail-design" style={{
                        border: "0.0625rem solid rgba(26, 26, 26, 0.12)",
                        borderRadius: "0.5rem",
                        marginTop: "2rem", padding: "0.625rem 0.875rem"
                    }}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-4" controlId="tags">
                                    <Form.Label>Select Tag Type</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={tagType}
                                        onChange={(e) => setTagType(e.target.value)}
                                    >
                                        <option value="" disabled>
                                            Select Tag Type
                                        </option>
                                        {defaultCategoryName && defaultCategoryName ? (
                                            combinedOptions
                                                .find(
                                                    (option) =>
                                                        option.name &&
                                                        option?.name?.toLowerCase() ===
                                                        defaultCategoryName?.toLowerCase()
                                                )
                                                ?.categories?.map((option) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                )) || <option value="">No options available</option>
                                        ) : (
                                            <option value="">No options available</option>
                                        )}
                                    </Form.Control>
                                </Form.Group>
                                <div className="pt-4 d-flex justify-content-center">
                                    <Button variant="secondary" onClick={handleAddTag}>
                                        Add Tag
                                    </Button>
                                </div>
                            </Col>

                            {tagType ? (
                                <Col md={6}>
                                    <Form.Group className="pb-3" controlId="selectedTags">
                                        <Form.Label style={{ fontWeight: "600" }}>
                                            Select Tags
                                        </Form.Label>
                                        <div
                                            className="d-flex flex-wrap gap-2 product-detail-design"
                                            style={{ margin: "0" }}
                                        >
                                            {renderTagCheckboxes()}
                                        </div>
                                    </Form.Group>
                                </Col>
                            ) : (
                                <></>
                            )}
                        </Row>

                        <Row className="p-4">
                            <Col md={12} className="pb-3 product-detail-design">
                                <Form.Group className="pb-3" controlId="selectedTags">
                                    <Form.Label style={{ fontWeight: "600" }}>
                                        {defaultCategoryName} Selected Tags
                                    </Form.Label>
                                    <Row>{renderAdditionalTags()}</Row>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Col>

                    {defaultCategoryName &&
                        (defaultCategoryName.toLowerCase() === "cake" ||
                            defaultCategoryName.toLowerCase() === "cakes") ? (
                        <Col md={12} className="product-detail-design">
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="form-group-padding-bottom">
                                        <Form.Label>Half Kg Price</Form.Label>

                                        <Form.Control
                                            type="text"
                                            id="halfkgprice"
                                            name="halfkgprice"
                                            {...register("halfkgprice")}
                                            isInvalid={!!errors.halfkgprice}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.halfkgprice?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="form-group-padding-bottom">
                                        <Form.Label>One Kg Price</Form.Label>

                                        <Form.Control
                                            type="text"
                                            name="onekgprice"
                                            id="onekgprice"
                                            {...register("onekgprice")}
                                            isInvalid={!!errors.onekgprice}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.onekgprice?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="form-group-padding-bottom">
                                        <Form.Label>Two Kg Price</Form.Label>

                                        <Form.Control
                                            type="text"
                                            name="twokgprice"
                                            id="twokgprice"
                                            {...register("twokgprice")}
                                            isInvalid={!!errors.twokgprice}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.twokgprice?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Col>
                    ) : (
                        <></>
                    )}

                    <Col className="product-detail-design" style={{
                        border: "0.0625rem solid rgba(26, 26, 26, 0.12)",
                        borderRadius: "0.5rem",
                        marginTop: "2rem", padding: "0.625rem 0.875rem"
                    }}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="form-group-padding-bottom">
                                    <Form.Label>Pincode</Form.Label>
                                    {pinCode.map((pincode, index) => (
                                        <div className="d-flex pb-3" key={index}>
                                            <Form.Control
                                                type="text"
                                                name="pincode"
                                                id="pincode"
                                                value={pincode}
                                                onChange={(e) => {
                                                    handleInputChange(e.target.value, index);
                                                }}
                                            />
                                            <div
                                                className="ps-1"
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "flex-end",
                                                }}
                                            >
                                                <Button
                                                    variant="contained"
                                                    onClick={() => onRemovePincode(index)}
                                                    style={{
                                                        textTransform: "capitalize",
                                                    }}
                                                >
                                                    <i className="fa-solid fa-circle-xmark"></i>
                                                </Button>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="d-grid justify-content-center">
                                        <Button
                                            variant="secondary"
                                            onClick={() => handleAddClick()}
                                        >
                                            Add +
                                        </Button>
                                    </div>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="form-group-padding-bottom">
                                    <Form.Label>Discount Price</Form.Label>

                                    <Form.Control
                                        type="text"
                                        id="discountPrice"
                                        name="discountPrice"
                                        {...register("discountPrice")}
                                        isInvalid={!!errors.discountPrice}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.discountPrice?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="form-group-padding-bottom">
                                    <Form.Label>Offer</Form.Label>

                                    <Form.Control
                                        type="text"
                                        id="offer"
                                        name="offer"
                                        {...register("offer")}
                                        isInvalid={!!errors.offer}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.offer?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="form-group-padding-bottom">
                                    <Form.Label>Quantity</Form.Label>

                                    <Form.Control
                                        type="text"
                                        id="quantity"
                                        name="quantity"
                                        {...register("quantity")}
                                        isInvalid={!!errors.quantity}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.quantity?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Col>

                    <Col
                        md={12}
                        style={{
                            border: "0.0625rem solid #1a1a1a1f",
                            borderRadius: "0.5rem",
                            marginTop: "2rem",
                            padding: "0.625rem 0.875rem",
                        }}
                    >
                        <div className="mb-4">
                            {bannerPicture &&
                                bannerPicture?.map((picture, index) => (
                                    <div key={index}>
                                        {picture?.picturePreview && picture?.picturePreview ? (
                                            <div className="m-3">
                                                <div>{`Image Preview ${index + 1}`} </div>
                                                <img
                                                    src={picture?.picturePreview}
                                                    alt=""
                                                    style={{
                                                        width: "200px",
                                                        height: "200px",
                                                    }}
                                                />
                                            </div>
                                        ) : (
                                            <></>
                                        )}

                                        <Row>
                                            <Col md={6}>
                                                <Form.Group>
                                                    <Form.Label>Product Images {index + 1}</Form.Label>
                                                    <Form.Control
                                                        type="file"
                                                        accept="image/*"
                                                        name="banner"
                                                        id="banner"
                                                        onChange={(event) =>
                                                            handleBannerPictures(event, index)
                                                        }
                                                    />
                                                </Form.Group>
                                            </Col>

                                            <Col md={6}>
                                                <Form.Group>
                                                    <Form.Label>Image Alt Text</Form.Label>
                                                    <div className="d-flex pb-3" key={index}>
                                                        <Form.Control
                                                            type="text"
                                                            name="imageAltText"
                                                            id="imageAltText"
                                                            value={picture.imageAltText}
                                                            isInvalid={!!errors.imageAltText}
                                                            onChange={(e) => handleImageAltText(e, index)}
                                                        />
                                                        <div
                                                            className="ps-1"
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "flex-end",
                                                            }}
                                                        >
                                                            <Button
                                                                variant="contained"
                                                                onClick={() => onRemoveBannerPicture(index)}
                                                                style={{
                                                                    textTransform: "capitalize",
                                                                }}
                                                            >
                                                                <i className="fa-solid fa-circle-xmark"></i>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </div>
                                ))}
                            <div>
                                <Button
                                    variant="secondary"
                                    disabled={false}
                                    style={{
                                        textTransform: "capitalize",
                                        "&:hover": {
                                            border: "none",
                                            textDecoration: "none",
                                        },
                                    }}
                                    onClick={addProductPicture}
                                >
                                    Add Picture
                                </Button>
                            </div>
                        </div>
                    </Col>

                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Button
                            type="submit"
                            variant="primary"
                            style={{
                                textTransform: "capitalize",
                                marginTop: "2rem",
                                "&:hover": {
                                    border: "none",
                                    textDecoration: "none",
                                },
                            }}
                        >
                            Submit
                        </Button>
                    </div>

                </Row>
            </Form>
        </div>
    );
};

export default AddProductForm;
