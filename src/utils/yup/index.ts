import * as yup from 'yup';

export const schema = yup
  .object()
  .shape({
    name: yup
      .string()
      .matches(/^[A-Z-А-Я]/, 'The name must begin with a capital letter')
      .trim()
      .required('Name is required'),

    age: yup
      .number()
      .positive(`Age mustn't be a negative value`)
      .integer()
      .required('Age is required'),

    email: yup.string().email('Email should correct format').required('Email is required'),

    gender: yup.string().required('Gender is required'),

    password: yup
      .string()
      .matches(/[0-9]/, 'The password must contain at least one number')
      .matches(/[!@#$%^&*]/, 'The password must contain at least one special character !@#$%^&*')
      .matches(/[a-z]/, 'The password must contain at least one lowercase Latin letter')
      .matches(/[A-Z]/, 'The password must contain at least one uppercase Latin letter')
      .required('Password is required'),

    passwordRepeat: yup
      .string()
      .oneOf([yup.ref('password'), ''], 'Passwords must match')
      .required(),

    files: yup
      .mixed<FileList>()
      .required('The image must be uploaded')
      .test('required', 'You need to provide a file', (value) => {
        if (value && value.length) return true;
        return false;
      })
      .test('fileType', 'Invlid file type - use JPEG and PNG', (value) => {
        const validTypes = ['image/jpeg', 'image/png'];
        const isValidType = value && value[0]?.type && validTypes.includes(value[0].type);
        if (isValidType) return true;
        return false;
      })
      .test('fileSize', 'File size is too large', (value) => {
        const validSize = 1024 * 1024 * 2;
        const isValidSize = value && value[0]?.size && value[0].size <= validSize;
        if (isValidSize) return true;
        return false;
      }),

    country: yup.string().required(),

    accept: yup.boolean().isTrue('Accept is required').required('Accept is required'),
  })
  .required();
