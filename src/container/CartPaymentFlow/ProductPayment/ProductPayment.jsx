import FMButton from "components/FMButton/FMButton";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
//import { LoadScript } from 'react-load-script';

//import Razorpay from 'razorpay';
import axios from "axios";
const ProductPayment = ({ totalAmount }) => {
  // useEffect(() => {
  //   // Load the Razorpay script dynamically
  //   <LoadScript url="https://checkout.razorpay.com/v1/checkout.js" />

  // }, []);

  // const handleRazorpayPayment = async () => {
  //   // try {
  //   //   // Fetch order details from your backend using Axios
  //   //   const response = await axios.post("http://localhost:5000/api/create-order", {
  //   //     totalAmount,
  //   //   });

  //   //   const order = response.data;

  //   //   // Create a Razorpay instance with the order details
  //   //   const razorpay = new Razorpay({
  //   //     key_id: 'rzp_test_lUsErTdW0CPEb7',
  //   //     amount: order.amount,
  //   //     currency: order.currency,
  //   //     name: 'Vibezter',
  //   //     description: 'Purchase description',
  //   //     order_id: order.id,
  //   //     handler: function (response) {
  //   //       // Handle successful payment response
  //   //       console.log("response Razor ", response);
  //   //     },
  //   //   });

  //   //   // Open the Razorpay payment window
  //   //   razorpay.open();
  //   // } catch (error) {
  //   //   console.error("Error during Razorpay payment:", error);
  //   // }
  // };

  const handleRazorpayPayment = async () => {
    try {
      // Fetch order details from your backend using Axios
      const response = await axios.post("http://localhost:5000/api/create-order", {
        totalAmount,
      });

      const order = response.data;

      // Dynamically create a script tag for Razorpay
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        // Create a Razorpay instance with the order details
        const razorpay = new window.Razorpay({
          key_id: 'rzp_test_lUsErTdW0CPEb7',
          amount: order.amount,
          currency: order.currency,
          name: 'Vibezter',
          description: 'Purchase description',
          order_id: order.id,
          handler: function (response) {
            // Handle successful payment response
            console.log("response Razor ", response);
            // razorpay_order_id: "order_MymSF2e9XWGPyU"
            // razorpay_payment_id: "pay_MymSakRYkJLUsB"
            // razorpay_signature: "0dd30084c3fda56d49d915a8bf48b3988ef59ea63681742174d35ad103f18384"

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
      <Col className="col-sm-4" style={{ padding: "1rem 1rem" }}>
        <FMButton
          displayText={"Cash On Delivery"}
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
        />
        <FMButton
          displayText={"Credit/Debit Card"}
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
        />
        <FMButton
          displayText={"PhonePe/Google Pay/BHIM UPI"}
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
        />
        <FMButton
          displayText={"Paytm/Wallets"}
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
        />
        <FMButton
          displayText={"Net Banking"}
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
        />
        <FMButton
          displayText={"EMI/Pay Later"}
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
        />

        <FMButton
          displayText={'Pay with Razorpay'}
          variant="outlined"
          onClick={handleRazorpayPayment}
          styleData={{
            display: 'block',
            width: '300px',
            boxShadow:
              '0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)',
            borderRadius: '100px',
            border: ' 1px solid #E6E6E6',
            textTransform: 'capitalize',
            color: '#222222',
            marginBottom: '1.5rem',
            '&:hover': {
              backgroundColor: 'white',
              border: '1px solid black',
            },
          }}
        />
      </Col>
      <Col
        style={{
          boxShadow:
            "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
          borderRadius: "20px",
        }}
      >

      </Col>
    </Row>
  );
};

export default ProductPayment;
