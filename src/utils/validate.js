export const checkValidateData = (email, password, fullname = '') => {
  const isEmailValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
  const isFullName = fullname === '' || /^[a-zA-Z]+ [a-zA-Z]+$/.test(fullname);

  if (!isEmailValid) return 'Email not valid';
  if (!isPasswordValid) return 'Password not valid';
  if (fullname !== '' && !isFullName) return 'Full name not valid';

  return null;
};
