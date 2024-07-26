import React, { useEffect } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, PROFILE_ICON, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
      })
      .catch((error) => {
        navigate('/error');
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate('/browse');
      } else {
        dispatch(removeUser());
        navigate('/');
      }
    });

    return () => unsubscribe(); // Clean up the subscription on unmount
  }, []);

  const handleGptSearchClick = () => {
    // toggle GPTsearch and browse page
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    dispatch(changeLanguage(selectedLanguage));
  };

  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-top-to-b from-black z-10 flex justify-between'>
      <img className='w-40' src={LOGO} alt='logo' />
      {user && (
        <div className='flex p-2'>
          {showGptSearch && (
            <select
              className='m-2 p-2 bg-gray-900 text-white '
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className='py-2 px-4 mx-4 my-2 bg-white text-black rounded-lg '
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? 'Home' : 'GPTSearch'}
          </button>
          <img className='w-12 h-12' alt='user-icon' src={PROFILE_ICON} />
          <button onClick={handleSignOut} className='font-bold text-white'>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
