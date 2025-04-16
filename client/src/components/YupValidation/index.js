import * as yup from 'yup';

export const signUpValidationSchema = yup.object().shape({
  first_name: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, 'First name must contain only letters')
    .required('First name is required'),
  
  last_name: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, 'Last name must contain only letters')
    .required('Last name is required'),

  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),

  password: yup
    .string()
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must be at least 8 characters, contain one uppercase letter, one number, and one special character'
    )
    .required('Password is required'),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
});

export const loginValidationSchema = yup.object().shape({
    email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),

  password: yup
    .string()
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must be at least 8 characters, contain one uppercase letter, one number, and one special character'
    )
    .required('Password is required'),

});