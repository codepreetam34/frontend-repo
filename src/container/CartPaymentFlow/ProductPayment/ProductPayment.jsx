import FMButton from "../../../components/FMButton/FMButton";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import paytmPaymentGateway from "../../../assets/paytmPaymentGateway.svg"
import razorpayPaymentGateway from "../../../assets/razorpayPaymentGateway.svg"
import axios from "axios";
import queryString from 'query-string';
// const https = require('https-browserify'); // Import 'https' using the polyfill
//const PaytmChecksum = require('crypto-browserify');

const ProductPayment = ({ totalAmount }) => {

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

  // const handlePaytmPayment = async () => {
  //   try {
  //     // Make an API call to create a Paytm order
  //     const response = await axios.post('http://localhost:5000/api/create-paytm-order', {
  //       totalAmount,
  //     });

  //     const paytmOrder = response.data;
  //     console.log("paytmOrder ",paytmOrder)
  //     // Redirect the user to the Paytm payment URL
  //     window.location.href = `${paytmOrder.paytmOrderUrl}`;
  //   } catch (error) {
  //     console.error('Error during Paytm payment:', error);
  //   }
  // };


  // const handlePaytmPayment = async () => {
  //   try {
  //     // Fetch order details from your backend using Axios
  //     const response = await axios.post("http://localhost:5000/api/create-paytm-order", {
  //       totalAmount,
  //     });
  //     //    window.location.href = `https://securegw-stage.paytm.in/theia/processTransaction?${queryString.stringify(response.data)}`;
  //     // Redirect the user to the Paytm payment page with the obtained parameters


  //     // Get the params object from the response
  //     const paytmParams = response.data.params;

  //     // Convert the params object to a query string
  //     const queryString = Object.keys(paytmParams)
  //       .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(paytmParams[key])}`)
  //       .join('&');
  //     console.log("query string ", queryString)

  //     // Construct the Paytm payment page URL with the query string
  //     const redirectUrl = `https://securegw-stage.paytm.in/theia/processTransaction?${queryString}`;

  //     // Redirect the user to the Paytm payment page
  //     window.location.href = redirectUrl;





  //     // const order = response.data;

  //     // // Dynamically create a script tag for Paytm
  //     // const script = document.createElement('script');
  //     // script.src = 'https://securegw.paytm.in/merchantpgpui/checkoutjs/merchants/xoYxkw49209132372068.js'; // Replace with your actual Merchant ID
  //     // script.async = true;

  //     // // Wait for the script to load
  //     // script.onload = () => {
  //     //   // Initialize Paytm SDK with Merchant ID and other details
  //     //   console.log('Paytm script loaded successfully');
  //     //   const paytmConfig = {
  //     //     merchant_id: 'xoYxkw49209132372068', // Replace with your Test Merchant ID
  //     //     order_id: order.id,
  //     //     amount: order.amount,
  //     //     callback_url: 'http://localhost:5000/api/paytm-callback',
  //     //     isProduction: false, // Set to true for production
  //     //   };
  //     //   console.log('Window Paytm Object:', window.Paytm);

  //     // //  window.location.href = 'https://securegw.paytm.in/merchantpgpui/checkoutjs/merchants/xoYxkw49209132372068.js';
  //     //   // console.log('Paytm config:', paytmConfig);
  //     // //  window.Paytm.CheckoutJS.init(paytmConfig);
  //     //   //window.Paytm.CheckoutJS.invoke();


  //     // }


  //     // // Add an error handler to check for script loading errors
  //     // script.onerror = (error) => {
  //     //   console.error('Error loading Paytm script:', error);
  //     // };

  //     // // Append the script tag to the document's head
  //     // document.head.appendChild(script);

  //     //      console.log('Paytm Order:', order);
  //   } catch (error) {
  //     console.error("Error during Paytm payment:", error);
  //   }
  // };

  // Assuming this is where you handle the Paytm API response
// Assuming this is where you handle the Paytm API response


const handlePaytmResponse = (response) => {
  try {
    // Log the entire response object
    console.log('Full Paytm response:', response);

    // Check if response is empty or does not have 'data' property
    if (!response || !response.data) {
      console.error('Empty or unexpected Paytm response:', response);
      // Handle the error condition as needed
      return;
    }

    // Access the nested properties using optional chaining (?.) to avoid errors if properties are undefined
    const responseBody = response.data.response;

    // Check if 'response' property exists before accessing nested properties
    if (responseBody) {
      // Continue with processing the successful response
      console.log('Paytm response:', responseBody);

      // Check if 'resultInfo' property exists before destructuring its properties
      if (responseBody.resultInfo) {
        // Destructure properties like resultCode and resultMsg
        const { resultCode, resultMsg } = responseBody.resultInfo;
        console.log('Result Code:', resultCode);
        console.log('Result Message:', resultMsg);
      } else {
        console.error('Missing resultInfo in Paytm response:', responseBody);
        // Handle the error condition as needed
      }

      // Your logic to handle a successful response
    } else {
      console.error('Missing or unexpected response body:', response.data);
      // Handle the error condition as needed
    }
  } catch (error) {
    console.error('Error handling Paytm response:', error);
    // Handle unexpected errors
  }
};




// Example usage where you handle the Paytm API response



  const handlePaytmPayment = async () => {
    try {
      // Fetch order details from your backend using Axios
      const response = await axios.post("http://localhost:5000/api/create-paytm-order", {
        totalAmount,
      });
     // handlePaytmResponse(response);
      const paytmParams = response.data.params;
      // Dynamically create a script tag for Paytm CheckoutJS
      const script = document.createElement('script');
      script.type = 'application/javascript';
      script.crossorigin = "anonymous"
      script.src = `https://securegw-stage.paytm.in/merchantpgpui/checkoutjs/merchants/xoYxkw49209132372068.js`;
      script.onload = () => {
        onScriptLoad(
          paytmParams.body.orderId,
          paytmParams.body.txnAmount.value,
          paytmParams.body.txnAmount.currency,
          paytmParams.body.callbackUrl
        ); // Pass values to onScriptLoad
      };

      // Append the script tag to the document's head
      document.head.appendChild(script);

    } catch (error) {
      console.error("Error during Paytm payment:", error);
    }
  };

  // Updated onScriptLoad function to handle nested structure
  function onScriptLoad(orderId, amount, currency, callbackUrl) {
    try {
      if (window.Paytm && window.Paytm.CheckoutJS) {
        var config = {
          root: "",
          flow: "DEFAULT",
          data: {
            orderId: orderId,
            token: "", // You may not have the token at this point
            tokenType: "TXN_TOKEN",
            amount: amount,
          },
          handler: {
            notifyMerchant: function (eventName, data) {
              console.log("notifyMerchant handler function called");
              console.log("eventName => ", eventName);
              console.log("data => ", data);
            },
          },
        };

        window.Paytm.CheckoutJS.onLoad(function executeAfterCompleteLoad() {
          // Initialize configuration using the init method
          window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
            // After successfully updating configuration, invoke JS Checkout
            window.Paytm.CheckoutJS.invoke();
          }).catch(function onError(error) {
            console.log("error => ", error);
          });
        });
      } else {
        console.error("Paytm CheckoutJS not available");
      }
    } catch (error) {
      console.error("Error in onScriptLoad:", error);
    }
  }


  const [paymentData, setPaymentData] = useState();

  // const initialize = () => {
  //   let orderId = "Order_" + new Date().getTime();

  //   // Sandbox Credentials
  //   let mid = "xoYxkw49209132372068"; // Merchant ID
  //   let mkey = "nIm6Z0E1btJGKF0t"; // Merchant Key

  //   var paytmParams = {};

  //   paytmParams.body = {
  //     requestType: "Payment",
  //     mid: mid,
  //     websiteName: "WEBSTAGING",
  //     orderId: orderId,
  //     callbackUrl: "https://merchant.com/callback",
  //     txnAmount: {
  //       value: totalAmount,
  //       currency: "INR",
  //     },
  //     userInfo: {
  //       custId: "1001",
  //     },
  //   };

  //   PaytmChecksum.generateSignature(
  //     JSON.stringify(paytmParams.body),
  //     mkey
  //   ).then(function (checksum) {
  //     console.log(checksum);
  //     paytmParams.head = {
  //       signature: checksum,
  //     };

  //     var post_data = JSON.stringify(paytmParams);

  //     var options = {
  //       /* for Staging */
  //       // hostname: "securegw-stage.paytm.in" /* for Production */,

  //       hostname: "securegw.paytm.in",
  //       port: 443,
  //       path: `/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${orderId}`,
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Content-Length": post_data.length,
  //       },
  //     };

  //     var response = "";
  //     var post_req = https.request(options, function (post_res) {
  //       post_res.on("data", function (chunk) {
  //         response += chunk;
  //       });
  //       post_res.on("end", function () {
  //         console.log("Response: ", response);
  //         // res.json({data: JSON.parse(response), orderId: orderId, mid: mid, amount: amount});
  //         setPaymentData({
  //           ...paymentData,
  //           token: JSON.parse(response).body.txnToken,
  //           order: orderId,
  //           mid: mid,
  //           amount: 100,
  //         });
  //       });
  //     });

  //     post_req.write(post_data);
  //     post_req.end();
  //   });
  // };

  // useEffect(() => {
  //   initialize();
  // }, []);

  // const makePayment = () => {
  //   var config = {
  //     "root": "",
  //     "style": {
  //       "bodyBackgroundColor": "#fafafb",
  //       "bodyColor": "",
  //       "themeBackgroundColor": "#0FB8C9",
  //       "themeColor": "#ffffff",
  //       "headerBackgroundColor": "#284055",
  //       "headerColor": "#ffffff",
  //       "errorColor": "",
  //       "successColor": "",
  //       "card": {
  //         "padding": "",
  //         "backgroundColor": ""
  //       }
  //     },
  //     "data": {
  //       "orderId": paymentData.order,
  //       "token": paymentData.token,
  //       "tokenType": "TXN_TOKEN",
  //       "amount": paymentData.amount /* update amount */
  //     },
  //     "payMode": {
  //       "labels": {},
  //       "filter": {
  //         "exclude": []
  //       },
  //       "order": [
  //         "CC",
  //         "DC",
  //         "NB",
  //         "UPI",
  //         "PPBL",
  //         "PPI",
  //         "BALANCE"
  //       ]
  //     },
  //     "website": "WEBSTAGING",
  //     "flow": "DEFAULT",
  //     "merchant": {
  //       "mid": paymentData.mid,
  //       "redirect": false
  //     },
  //     "handler": {
  //       "transactionStatus":
  //         function transactionStatus(paymentStatus) {
  //           console.log(paymentStatus);
  //         },
  //       "notifyMerchant":
  //         function notifyMerchant(eventName, data) {
  //           console.log("Closed");
  //         }
  //     }
  //   };

  //   if (window.Paytm && window.Paytm.CheckoutJS) {
  //     window.Paytm.CheckoutJS.init(config).
  //       then(function onSuccess() {
  //         console.log("Success ");
  //         window.Paytm.CheckoutJS.invoke();
  //         //    checkOrderStatus();
  //       }).catch(function onError(error) {
  //         console.log("Error => ", error);
  //       });
  //   }
  // }

  // async function checkOrderStatus() {
  //   try {
  //     /* initialize an object */
  //     const paytmParams = {
  //       body: {
  //         /* Find your MID in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys */
  //         mid: "xoYxkw49209132372068",

  //         /* Enter your order id which needs to be check status for */
  //         orderId: paymentData.order,
  //       },
  //     };

  //     /* Generate checksum by parameters in the body */
  //     const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), "nIm6Z0E1btJGKF0t");

  //     /* Add generated checksum value to head parameters */
  //     paytmParams.head = {
  //       signature: checksum,
  //     };

  //     /* Prepare JSON string for request */
  //     const post_data = JSON.stringify(paytmParams);

  //     const options = {
  //       /* for Staging */
  //       hostname: 'securegw-stage.paytm.in',

  //       /* for Production */
  //       // hostname: 'securegw.paytm.in',

  //       port: 443,
  //       path: '/v3/order/status',
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Content-Length': post_data.length,
  //       },
  //     };

  //     // Set up the request
  //     let response = "";
  //     const post_req = https.request(options, (post_res) => {
  //       post_res.on('data', (chunk) => {
  //         response += chunk;
  //       });

  //       post_res.on('end', () => {
  //         console.log('Response: ', response);
  //       });
  //     });

  //     // Post the data
  //     post_req.write(post_data);
  //     post_req.end();
  //   } catch (error) {
  //     console.error('Error checking order status:', error);
  //   }
  // }
  return (
    <Row style={{ padding: "10px 120px 0 120px" }}>
      <Col style={{ padding: "1rem 1rem", display: 'flex', justifyContent: 'center', gap: '2rem' }}>

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
        />


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

    </Row>
  );
};

export default ProductPayment;
