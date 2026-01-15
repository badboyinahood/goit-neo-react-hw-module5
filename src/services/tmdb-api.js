import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYzIxYWQxMzgyZDMzN2FkNmJmMzZhOTFjM2ZkZTQ5MyIsIm5iZiI6MTc2ODUwMzMyMi4zOTkwMDAyLCJzdWIiOiI2OTY5MzgxYTI0MTI3MzBlYmRmNDBkMWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.bQOPtbS_VKWQ2EXkNFkt_82y7bmqhIxkg5bqZ3mLEys",
  },
};

export const fetchTrendingMovies = async () => {
  const { data } = await axios.get(
    `${BASE_URL}/trending/movie/day`,
    options
  );
  return data.results;
};

export const searchMovies = async query => {
  const { data } = await axios.get(
    `${BASE_URL}/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    options
  );
  return data.results;
};

export const fetchMovieDetails = async movieId => {
  const { data } = await axios.get(
    `${BASE_URL}/movie/${movieId}`,
    options
  );
  return data;
};

export const fetchMovieCredits = async movieId => {
  const { data } = await axios.get(
    `${BASE_URL}/movie/${movieId}/credits`,
    options
  );
  return data.cast;
};

export const fetchMovieReviews = async movieId => {
  const { data } = await axios.get(
    `${BASE_URL}/movie/${movieId}/reviews`,
    options
  );
  return data.results;
};
