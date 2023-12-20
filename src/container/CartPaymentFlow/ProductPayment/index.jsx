import FMButton from "../../../components/FMButton/FMButton";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import paytmPaymentGateway from "../../../assets/paytmPaymentGateway.svg";
import axios from "axios";
import razorpayPaymentGateway from "../../../assets/razorpayPaymentGateway.svg";
import { useDispatch } from "react-redux";
import { addOrder } from "Redux/Slices/Order/Order";
import { useNavigate } from "react-router";

const ProductPayment = ({ totalAmount }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRazorpayPayment = async () => {
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
          key_id: "rzp_test_lUsErTdW0CPEb7",
          amount: order.amount,
          currency: order.currency,
          name: "Vibezter",
          description: "Purchase description",
          order_id: order.id,
          handler: function (response) {
            console.log("response Razor ", response);
            // Check if the payment was successful
            if (response.razorpay_payment_id) {
              // Make an API call to add the order
              try {
                const orderData = {
                  user: "user_id", // Replace with the actual user ID
                  addressId: "address_id", // Replace with the actual address ID
                  totalAmount: totalAmount, // The total amount from your React component
                  items: [
                    {
                      productId: "product_id_1", // Replace with the actual product ID
                      payablePrice: 50.0, // Replace with the actual payable price
                      purchasedQty: 2, // Replace with the actual purchased quantity
                    },
                    {
                      productId: "product_id_2", // Replace with the actual product ID
                      payablePrice: 30.0, // Replace with the actual payable price
                      purchasedQty: 1, // Replace with the actual purchased quantity
                    },
                    // Add more items as needed
                  ],
                  paymentStatus: "pending", // Replace with the actual payment status
                  paymentType: "cod", // Replace with the actual payment type
                  orderStatus: [
                    {
                      type: "ordered",
                      date: new Date(),
                      isCompleted: false,
                    },
                    // Add more order status as needed
                  ],
                };

                dispatch(addOrder(orderData))
                  .then((res) => {
                    navigate("/order");
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
    <Row style={{ padding: "10px 120px 0 120px" }}>
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
              Pay with Razorpay
            </>
          }
          variant="outlined"
          onClick={handleRazorpayPayment}
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
