import FMButton from "../../../components/FMButton/FMButton";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import paytmPaymentGateway from "../../../assets/paytmPaymentGateway.svg"
import axios from "axios";
import razorpayPaymentGateway from "../../../assets/razorpayPaymentGateway.svg"

const ProductPayment = ({ totalAmount }) => {


  // const retryDelay = 1000; // 1 second delay
  // let retryCount = 0;
  // const maxRetries = 3;


  // const handlePaytmPayment = async () => {
  //   try {
  //     const response = await axios.post('http://localhost:5000/api/create-paytm-order', {
  //       orderId: 'your_order_id',
  //       amount: totalAmount,
  //       email: 'customer@example.com',
  //       mobileNumber: '1234567890',
  //     });

  //     // Process the response
  //     console.log('Paytm order created successfully:', response.data);
  //   } catch (error) {
  //     if (error.response && error.response.status === 503 && retryCount < maxRetries) {
  //       // Retry after a delay
  //       retryCount++;
  //       console.log(`Retrying Paytm order creation (Attempt ${retryCount}) after ${retryDelay} ms`);
  //       setTimeout(handlePaytmPayment, retryDelay);
  //     } else {
  //       // Handle other errors or exceed max retries
  //       console.error('Error creating Paytm order:', error.message);
  //     }
  //   }
  // }


  const handleRazorpayPayment = async () => {
    try {
      const auth = localStorage.getItem("AUTH_ACCESS_TOKEN");
      const authToken = auth?.substring(1, auth.length - 1);
      const response = await axios.post("http://localhost:5000/api/create-order", {
        totalAmount,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
      });
      const order = response.data;

      // Dynamically create a script tag for Razorpay
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        const razorpay = new window.Razorpay({
          key_id: 'rzp_live_Sr8STvqtnDkQcQ',
          amount: order.amount,
          currency: order.currency,
          name: 'Vibezter',
          description: 'Purchase description',
          order_id: order.id,
          handler: function (response) {
            console.log("response Razor ", response);
          },
        });

        // Open the Razorpay payment window
        razorpay.open();
      };

      // Append the script tag to the document's head
      document.head.appendChild(script);
    } catch (error) {
      console.error("Error during Razorpay payment:", error);
    }
  };



  return (
    <Row style={{ padding: "10px 120px 0 120px" }}>
      <Col style={{ padding: "1rem 1rem", display: 'flex', justifyContent: 'center', gap: '2rem' }}>
        {/* 
        <FMButton
          displayText={
            <>
              <img
                src={paytmPaymentGateway} // Add the path to your payment icon
                alt="Payment Icon"
                style={{ marginRight: '8px', height: '18px' }}
              />
              Pay with Paytm
            </>
          }
          onClick={handlePaytmPayment}
          // onClick={makePayment}
          variant="outlined"
          styleData={{
            display: "block",
            width: "300px",
            boxShadow:
              "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
            borderRadius: "100px",
            border: " 1px solid #E6E6E6",
            textTransform: "capitalize",
            color: "#222222",
            marginBottom: "1.5rem",
            "&:hover": {
              backgroundColor: "white",
              border: "1px solid black",
            },
          }}
        /> */}




        <FMButton
          displayText={
            <>
              <img
                src={razorpayPaymentGateway}// Add the path to your Razorpay icon
                alt="Razorpay Icon"
                style={{ marginRight: '8px', height: '18px' }}
              />
              Pay with Razorpay
            </>
          }
          variant="outlined"
          onClick={handleRazorpayPayment}
          styleData={{
            display: 'block',
            width: '300px',
            boxShadow:
              '0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)',
            borderRadius: '100px',
            //   border: ' 1px solid #801317',
            textTransform: 'capitalize',
            color: '#222222',
            marginBottom: '1.5rem',
          }}
        />

      </Col>

    </Row>
  );
};

export default ProductPayment;
