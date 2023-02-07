export const WHITE_SPACES_REGEX_PASSWORD = /^(\S+$)/g;

export const EMAIL_REGEX =
  /^([0-9a-zA-Z]+['\-._+]?)+[0-9a-zA-Z]+[@]([0-9a-zA-Z]+[-]?){2,}[.](([a-zA-Z]+[-]?){2,}[.]){0,2}[a-zA-Z]{2,}$/;

export const tests = {
  lowerCase: /[a-z]+/,
  upperCase: /[A-Z]+/,
  digits: /\d+/,
  symbol: /[*.!@#$^&_+-]+/,
  length: /^.{6,20}$/,
};
