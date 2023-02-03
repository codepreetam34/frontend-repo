// import { combineReducers } from 'redux';
// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './auth.slice';
// import { axiosMiddleware } from '../../axiosSettings';

// // const rootReducer = combineReducers({
// //   auth: authReducer,
// // });

// // const reducer = ({
// //   auth: authReducer,
// // // });

// export const store = configureStore({
//   reducer:{
//       auth:authReducer,
//     },
// })



import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'redux/store/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;

