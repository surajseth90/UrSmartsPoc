export const mobileNumberValidator = (value) => {
  let input = value.replace(/\D/g, "");
  if (input.length > 10) {
    input = input.slice(0, 10);
  }
  return input;
};
