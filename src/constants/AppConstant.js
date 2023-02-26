export const WHITE_SPACES_REGEX_PASSWORD = /^(\S+$)/g;

export const NEW_PASSWORD_REGEX =
  /^(?=.*\d)(?=.*[*.!@#$^&_+-])(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

export const MOBILE_NUMBER_REGEX = /^\d{6,10}$/;

export const EMAIL_REGEX =
  /^([0-9a-zA-Z]+['\-._+]?)+[0-9a-zA-Z]+[@]([0-9a-zA-Z]+[-]?){2,}[.](([a-zA-Z]+[-]?){2,}[.]){0,2}[a-zA-Z]{2,}$/;

export const tests = {
  lowerCase: /[a-z]+/,
  upperCase: /[A-Z]+/,
  digits: /\d+/,
  symbol: /[*.!@#$^&_+-]+/,
  length: /^.{6,20}$/,
};

export const createUserOptions = [
  {
    label: "0.5 Kg",
    value: "0.5 Kg",
  },
  {
    label: "1 Kg",
    value: "1 Kg",
  },
  {
    label: "2 Kg",
    value: "2 Kg",
  },
];

export const egglessOrNot = [
  {
    label: "Eggless",
    value: "Eggless",
  },
  {
    label: "With Egg",
    value: "With Egg",
  },
];

export const trainingAndConformanceStatus = [
  {
    label: "Pending",
    id: "PENDING",
  },
  {
    label: "Ongoing",
    id: "ONGOING",
  },
  {
    label: "Completed",
    id: "COMPLETED",
  },
];

export const StandardDelivery = [
  {
    label: "10 AM - 2 PM",
  },
  { label: "2 PM - 6 PM" },
  { label: "6 PM - 10 PM" },
];

export const FixedDelivery = [
  { label: "10 AM - 1 PM" },
  { label: "1 PM - 4 PM" },
  { label: "4 PM - 7 PM" },
  { label: "7 PM - 10 PM" },
];

export const ExpressDelivery = [
  {
    label: "10 AM - 11 AM",
  },
  { label: "11 AM - 12 PM" },
  { label: "12 AM - 1 PM" },
  { label: "1 PM - 2 PM" },
  { label: "2 PM - 3 PM" },
  { label: "3 PM - 4 PM" },
  { label: "4 PM - 5 PM" },
  { label: "5 PM - 6 PM" },
  { label: "6 PM - 7 PM" },
  { label: "7 PM - 8 PM" },
  { label: "8 PM - 9 PM" },
  { label: "9 PM - 10 PM" },
];

export const locationHomeOrOffice = [
  {
    label: "Home",
    value: "Home",
  },

  {
    label: "Office",
    value: "Office",
  },
];

export const quantityOpt = [
  { label: "Qty 1" },
  { label: "Qty 2" },
  { label: "Qty 3" },
];
