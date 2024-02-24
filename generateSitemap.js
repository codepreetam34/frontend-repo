// const fs = require("fs");
// const { SitemapStream, streamToPromise } = require("sitemap");
// const { createGzip } = require("zlib");

// // Import your routes
// import {
//   ROOT,
//   LOGIN,
//   SIGNUP,
//   EMAIL_VERIFY,
//   EMAIL_VERIFY_OTP,
//   FORGOTPASSWORD,
//   SETUP_NEW_PASSWORD,
//   LANDING_PAGE,
//   TEST,
//   ADD_TO_CART,
//   PRIVACY_POLICY,
//   FAQ,
//   BLOGS,
//   BLOGS_DETAIL,
//   ADD_REVIEW,
//   MY_PROFILE,
//   CATEGORY_PAGE,
//   PRODUCT_PAGE,
//   PRODUCT_DETAIL,
//   ORDER_PAGE,
//   SET_UP_NEW_PASSWORD,
//   BECOME_A_MEMBER,
//   CONTACT_US,
// } from "./src/Routes";

// const routes = [
//   ROOT,
//   LOGIN,
//   SIGNUP,
//   EMAIL_VERIFY,
//   EMAIL_VERIFY_OTP,
//   FORGOTPASSWORD,
//   SETUP_NEW_PASSWORD,
//   LANDING_PAGE,
//   TEST,
//   ADD_TO_CART,
//   PRIVACY_POLICY,
//   FAQ,
//   BLOGS,
//   BLOGS_DETAIL,
//   ADD_REVIEW,
//   MY_PROFILE,
//   CATEGORY_PAGE,
//   PRODUCT_PAGE,
//   PRODUCT_DETAIL,
//   ORDER_PAGE,
//   SET_UP_NEW_PASSWORD,
//   BECOME_A_MEMBER,
//   CONTACT_US,
// ];

// (async () => {
//   try {
//     const smStream = new SitemapStream({ hostname: "http://vibezter.com" });
//     const pipeline = smStream.pipe(createGzip());

//     routes.forEach((route) => {
//       smStream.write({ url: route, changefreq: "daily", priority: 0.7 });
//     });

//     smStream.end();

//     const data = await streamToPromise(pipeline);
//     fs.writeFileSync("./public/sitemap.xml.gz", data);
//   } catch (error) {
//     console.error(error);
//   }
// })();
