import React from 'react';
import GPTSearchBar from './GPTSearchBar';
import GPTMovieSuggestions from './GPTMovieSuggestions';
import { BG_URL } from '../utils/constants';

function GPTSearch() {
  return (
    <div>
      <div>
        <img className='fixed -z-10' src={BG_URL} alt='logo' />
      </div>
      <GPTSearchBar />
      <GPTMovieSuggestions />
    </div>
  );
}

export default GPTSearch;
