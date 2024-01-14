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

const ProductPayment = ({ totalAmount, addressId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePaytmPayment = async () => {
    try {
      // Make an API call to your server to initiate the Paytm transaction
      const response = await axios.post(
        "http://localhost:5000/api/paytm/initiateTransaction",
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

  const openJsCheckoutPopup = (orderId, txnToken, amount, mid) => {
    console.log("orderId ", orderId);
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
      // Initialize configuration using init method
      window.Paytm.CheckoutJS.init(config)
        .then(function onSuccess() {
          // After successfully updating configuration, invoke checkoutjs
          window.Paytm.CheckoutJS.invoke();
        })
        .catch(function onError(error) {
          console.log("error => ", error);
        });
    }
  };

  useEffect(() => {
    // Dynamically load the Paytm script
    const script = document.createElement("script");
    script.src = `https://securegw-stage.paytm.in/merchantpgpui/checkoutjs/merchants/xoYxkw49209132372068.js`;
    script.crossOrigin = "anonymous";
    script.type = "application/javascript";
    script.async = true;

    script.onload = () => {
      // The script has been loaded, now you can use the Paytm.CheckoutJS object
      console.log("Paytm script loaded");
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup: remove the script when the component is unmounted
      document.head.removeChild(script);
    };
  }, []); // Re-run effect when data.env or data.mid changes

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
        "http://localhost:5000/api/create-order",
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
            console.log("response Razor ", response);
            alert(JSON.stringify(response));
            // Check if the payment was successful

            if (response.razorpay_payment_id) {
              // Make an API call to add the order
              const itemsArray = [];

              addedData &&
                Object.values(addedData)?.map((item, index) => {
                  itemsArray.push({
                    productId: item?._id,
                    purchasedQty: item?.qty,
                    payablePrice: item?.discountPrice,
                  });
                });

              try {
                const orderData = {
                  addressId: localStorage.getItem("selectedAddress"), // Replace with the actual address ID
                  totalAmount: totalAmount, // The total amount from your React component
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
                // Handle error or redirect to an error page
              }
            } else {
              // Handle payment failure or other scenarios
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
    <Row style={{ padding: "10px 120px 0 120px" }} className="cartAllItems">
      <Col
        style={{
          padding: "1rem 1rem",
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
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
              Pay with Razor Pay
            </>
          }
          variant="outlined"
          //   onClick={handlePaytmPayment}
          onClick={handleRazorPayment}
          styleData={{
            display: "block",
            width: "300px",
            boxShadow:
              "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
            borderRadius: "100px",
            textTransform: "capitalize",
            color: "#222222",
            marginBottom: "1.5rem",
          }}
        />
      </Col>
    </Row>
  );
};

export default ProductPayment;
