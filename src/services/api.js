import axios from "axios";

const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
const searchMovieUrl =
  "https://api.themoviedb.org/3/search/movie?language=en-US&query=";
const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMGQ4NTY0MjhlZDVlNzRlY2EwNDMzYmFhNDgzZDVkNSIsIm5iZiI6MTczODY4OTMyNC43NTQsInN1YiI6IjY3YTI0YjJjNmI5ZjY2NmE5OTAzMGUyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CB2cjEogyAwbzydA-lgI1231vEyIJrwEEe65CzTIvTw",
  },
};

export const fetchMovie = async () => {
  return axios
    .get(url, options)
    .then((response) => {
      return response.data.results;
    })
    .catch((err) => {
      console.error(err);
      return [];
    });
};

export const fetchMovieByQuery = async (query) => {
  return axios
    .get(`${searchMovieUrl}${encodeURIComponent(query)}`, options)
    .then((response) => {
      return response.data.results;
    })
    .catch((err) => {
      console.error(err);
      return [];
    });
};

export const fetchMovieById = async (movieId) => {
  return axios
    .get(`https://api.themoviedb.org/3/movie/${movieId}`, options)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.error(err);
      return [];
    });
};

export const fetchCastMovieById = async (movieId) => {
  return axios
    .get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, options)
    .then((response) => {
      return response.data.cast;
    })
    .catch((err) => {
      console.error(err);
      return [];
    });
};

export const fetchReviewMovieById = async (movieId) => {
  return axios
    .get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, options)
    .then((response) => {
      return response.data.results;
    })
    .catch((err) => {
      console.error(err);
      return [];
    });
};
