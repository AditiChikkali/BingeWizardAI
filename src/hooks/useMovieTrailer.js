import { useDispatch } from 'react-redux';
import { API_OPTIONS } from '../utils/constants';
import { addTrailerVideo } from '../utils/movieSlice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);

  //fetch video trailer and updating the store with trailer video
  const getMovieVideos = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/' +
        movieId +
        '/videos?language=en-US',
      API_OPTIONS
    );
    const json = await data.json();

    const filterData = json.results.filter((video) => video.type === 'Trailer');
    const trailer = filterData.length ? filterData[0] : json.results[0]; // if no video with trailer type

    dispatch(addTrailerVideo(trailer));
  };
  useEffect(() => {
    !trailerVideo && getMovieVideos();
  }, []);
};

export default useMovieTrailer;
