import React from 'react';
import imglogo from '../utils/Binge.png';
import imglogo1 from '../utils/BWlogo.gif';
const Header = () => {
  return (
    <div className='absolute px-8 py-2 bg-gradient-top-to-b from-black z-10'>
      <img className='w-40' src={imglogo1} alt='logo' />
    </div>
  );
};

export default Header;
