import FMButton from "../../../components/FMButton/FMButton";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import paytmPaymentGateway from "../../../assets/paytmPaymentGateway.svg";
import axios from "axios";
import razorpayPaymentGateway from "../../../assets/razorpayPaymentGateway.svg";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "Redux/Slices/OrderSlice/Order";
import { useNavigate } from "react-router";
import { addToCartProductsFinal } from "Redux/Slices/AddToCart/AddToCartSlice";
import { ORDER_PAGE } from "Routes/Routes";
import { useMediaQuery } from "@mui/material";

const ProductPayment = ({ totalAmount, addressId, vendorName }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");
  const handlePaytmPayment = async () => {
    try {
      // Make an API call to your server to initiate the Paytm transaction
      const response = await axios.post(
        "http://165.22.222.7:5000/api/paytm/initiateTransaction",
        {
          amount: totalAmount, // Pass the total amount to be paid
        }
      );

      // Redirect the user to the Paytm payment page
      //   window.location.href = response.data.paymentUrl;
      console.log("response ", response.data.data);

      openJsCheckoutPopup(
        response.data.data.orderId,
        response.data.data.paymentUrl,
        totalAmount,
        response.data.data.mid
      );
    } catch (error) {
      console.error("Paytm payment initiation error:", error);
    }
  };

  const openJsCheckoutPopup = (orderId, txnToken, amount, mid,) => {
    var config = {
      root: "",
      style: {
        bodyBackgroundColor: "#fafafb",
        bodyColor: "",
        themeBackgroundColor: "#0FB8C9",
        themeColor: "#ffffff",
        headerBackgroundColor: "#284055",
        headerColor: "#ffffff",
        errorColor: "",
        successColor: "",
        card: {
          padding: "",
          backgroundColor: "",
        },
      },
      data: {
        orderId: orderId,
        token: txnToken,
        tokenType: "TXN_TOKEN",
        amount: amount /* update amount */,
      },
      payMode: {
        labels: {},
        filter: {
          exclude: [],
        },
        order: ["CC", "DC", "NB", "UPI", "PPBL", "PPI", "BALANCE"],
      },
      website: "WEBSTAGING",
      flow: "DEFAULT",
      merchant: {
        mid: mid,
        redirect: false,
      },
      handler: {
        transactionStatus: function transactionStatus(paymentStatus) {
          console.log(paymentStatus);
        },
        notifyMerchant: function notifyMerchant(eventName, data) {
          console.log("Closed");
        },
      },
    };

    if (window.Paytm && window.Paytm.CheckoutJS) {
      window.Paytm.CheckoutJS.init(config)
        .then(function onSuccess() {
          window.Paytm.CheckoutJS.invoke();
        })
        .catch(function onError(error) {
          console.log("error => ", error);
        });
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://securegw-stage.paytm.in/merchantpgpui/checkoutjs/merchants/xoYxkw49209132372068.js`;
    script.crossOrigin = "anonymous";
    script.type = "application/javascript";
    script.async = true;

    script.onload = () => {
      console.log("Paytm script loaded");
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const addedData = useSelector(
    (state) => state?.addToCartProducts?.getAddToCartProductsListData?.cartItems
  );

  useEffect(() => {
    dispatch(addToCartProductsFinal());
  }, [dispatch]);

  const handleRazorPayment = async () => {
    try {
      const auth = localStorage.getItem("AUTH_ACCESS_TOKEN");
      const authToken = auth?.substring(1, auth.length - 1);
      const response = await axios.post(
        "http://165.22.222.7:5000/api/create-order",
        {
          totalAmount,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const order = response.data;

      // Dynamically create a script tag for Razorpay
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => {
        const razorpay = new window.Razorpay({
          key_id: "xoYxkw49209132372068",
          amount: order.amount,
          currency: order.currency,
          name: "Vibezter",
          description: "Purchase description",
          order_id: order.id,
          handler: function (response) {
            alert(JSON.stringify(response));

            if (response.razorpay_payment_id) {
              const itemsArray = [];

              addedData &&
                Object.values(addedData)?.map((item, index) => {
                  itemsArray.push({
                    productId: item?._id,
                    purchasedQty: item?.qty,
                    payablePrice: item?.discountPrice,
                    vendorName: item?.vendorName
                  });
                });

              try {
                const orderData = {
                  addressId: localStorage.getItem("selectedAddress"),
                  totalAmount: totalAmount,
                  paymentStatus: "completed",
                  paymentType: "card",
                  items: itemsArray,
                };

                dispatch(addOrder(orderData))
                  .then((res) => {
                    navigate(ORDER_PAGE);
                  })
                  .catch((err) => {
                    console.error("Error adding order:", err);
                  });
              } catch (error) {
                console.error("Error adding order:", error);
              }
            } else {
              console.error("Payment failed:", response.error_description);
            }
          },
        });

        razorpay.open();
      };

      document.head.appendChild(script);
    } catch (error) {
      console.error("Error during Razorpay payment:", error);
    }
  };

  return (
    <div style={{ padding: isMobile ? "0px" : "10px 120px 0 120px" }}>
      <Col
        style={{
          padding: "1rem 1rem",
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          '@media (max-width: 600px)': {
            padding: "0", // Set padding to 0 for screens smaller than 600px (adjust breakpoint as needed)
            gap: "0", // Set gap to 0 for screens smaller than 600px
          },
        }}
      >
        <FMButton
          displayText={
            <>
              <img
                src={razorpayPaymentGateway}
                alt="Razorpay Icon"
                style={{ marginRight: "8px", height: "18px" }}
              />
              <div>Pay with Razor Pay</div>
            </>
          }
          variant="outlined"
          onClick={handleRazorPayment}
          styleData={{
            display: "block",
            width: "300px",
            boxShadow:
              "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
            borderRadius: "100px",
            textTransform: "capitalize",
            color: "#222222",
            fontSize: isMobile ? "0.8rem" : "0.8rem",
            fontWeight: "600",
            marginBottom: "1.5rem",
          }}
        />
      </Col>
    </div>
  );
};

export default ProductPayment;
