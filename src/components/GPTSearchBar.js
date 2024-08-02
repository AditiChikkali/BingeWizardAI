import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import lang from '../utils/languageConstants';
import { GEMINI_KEY, API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';
import { GoogleGenerativeAI } from '@google/generative-ai';

const GPTSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  // Access your API key (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI(GEMINI_KEY);

  //search movie in tmdb
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      'https://api.themoviedb.org/3/search/movie?query=' +
        movie +
        '&include_adult=false&language=en-US&page=1',
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt =
      'Act as a movie recommendation system and suggest some movies for the query ' +
      searchText.current.value +
      '. Only give me names of 5 movies, comma separated like example result given ahead. Example result: Gadar, Sholay, Godzilla, Pathaan, 3 Idiots.';
    const result = await model.generateContent(prompt);

    console.log(result); // Log the full result to understand its structure
    const gptResults = await result.response;
    // Extract the text content
    const gptMovies =
      gptResults.candidates?.[0]?.content?.parts?.[0]?.text.split(',');
    console.log(gptMovies);

    const data = gptMovies.map((movie) => searchMovieTMDB(movie));
    //above gives array of 5 promises not result

    const tmdbResults = await Promise.all(data);
    //pgm will wait for promise.all will finish ie once all 5 promises are resolved
    console.log(tmdbResults);

    if (!gptResults.response) {
      // write error handling
    }

    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };

  return (
    <div className='pt-[10%] flex justify-center'>
      <form
        className='w-1/2 bg-black grid grid-cols-12'
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type='text'
          className='p-4 m-4 col-span-9'
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className='col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg '
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
