import React, { useState, useRef } from 'react';
import Header from './Header';
import { checkValidateData } from '../utils/validate';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [isErrorMessage, setErrorMaessage] = useState(null);
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const fullname = useRef(null);

  const navigate = useNavigate();

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    const fullnameValue = fullname.current ? fullname.current.value : '';

    //check email , password calidation from validate.js
    const message = checkValidateData(emailValue, passwordValue);
    setErrorMaessage(message);
    if (message) return;

    if (!isSignInForm) {
      // Sign up logic
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;

          updateProfile(user, {
            displayName: fullnameValue,
            photoURL: 'https://github.com/AditiChikkali.png',
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              console.log('Profile updated:', user);
              navigate('/browse');
            })

            .catch((error) => {
              console.error('Profile update error:', error);
              setErrorMaessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error('Sign up error:', errorCode, errorMessage);
          setErrorMaessage(`${errorCode} - ${errorMessage}`);
        });
    } else {
      // Sign in logic
      signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('Signed in:', user);
          navigate('/browse');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error('Sign in error:', errorCode, errorMessage);
          setErrorMaessage(`${errorCode} - ${errorMessage}`);
        });
    }
  };
  return (
    <div>
      <Header />
      <div>
        <img
          className='absolute'
          src='https://assets.nflxext.com/ffe/siteui/vlv3/a56dc29b-a0ec-4f6f-85fb-50df0680f80f/9a0b3e37-2f17-459f-b90b-15e96c2085ee/US-en-20240617-popsignuptwoweeks-perspective_alpha_website_small.jpg'
          alt='logo'
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className='w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'
      >
        <h1 className='font-bold text-3xl py-4'>
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </h1>
        {!isSignInForm && (
          <input
            ref={fullname}
            type='text'
            placeholder='Full Name'
            className='p-4 my-4 w-full bg-gray-700'
          />
        )}
        <input
          ref={email}
          type='text'
          placeholder='Email Address'
          className='p-4 my-4 w-full bg-gray-700'
        />

        <input
          ref={password}
          type='text'
          placeholder='Password'
          className='p-4 my-4 w-full bg-gray-700'
        />
        <p className='text-red-500 font-bold text-lg py-2'>{isErrorMessage}</p>
        <button
          className='p-4 my-6 bg-red-700 w-full rounded-lg'
          onClick={handleButtonClick}
        >
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </button>

        <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>
          {isSignInForm ? 'New here? Sign Up Now!' : 'Already a user? Sign In'}
        </p>
      </form>
    </div>
  );
};

export default Login;
