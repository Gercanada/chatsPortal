export const isValidEmail = (email) => {
  const match = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
  return !!match;
};
export const isValidPhoneNo = (email) => {
  const match = String(email)
    .toLowerCase()
    .match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
  return !!match;
};

export const isEmail = (email) => {
  return isValidEmail(email) ? undefined : false;
  // return isValidEmail(email) ? undefined : 'El correo no parece ser válido';
};
export const isPhoneNo = (number) => {
  return isValidPhoneNo(number) ? undefined : 'invalid_phone_number';
};
