import PasswordValidator from 'password-validator';

// Create a schema
const schema = new PasswordValidator();

// Add properties to it
schema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(2) // Must have at least 2 digits
  .has()
  .not()
  .spaces(); // Should not have spaces
// .is()
// .not()
// .oneOf(['Passw0rd', 'Password123']); // Blacklist these values

const responseFunction = (errors) => {
  const response = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < errors.length; i++) {
    switch (errors[i]) {
      case 'digits':
        response.push('Debe tener al menos dos digitos');
        break;
      case 'min':
        response.push('Debe tener al menos 8 caracteres');
        break;
      case 'max':
        response.push('Do debe tener más de 100 caracteres');
        break;
      case 'lowercase':
        response.push('Debe tener al menos 1 minúscula');
        break;
      case 'uppercase':
        response.push('Debe tener al menos 1 mayúscula');
        break;
      case 'spaces':
        response.push('No debe tener espacios');
        break;
      default:
        break;
    }
  }

  return response;
};

export const isValidPasswordDetail = (pass) => {
  const errors = schema.validate(pass, { list: true });
  if (errors.length > 0) return responseFunction(errors);
  return 'OK';
};

export const isValidPassword = (pass) => schema.validate(pass);
