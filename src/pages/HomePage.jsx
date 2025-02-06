import { useEffect, useState } from "react";
import MovieList from "../components/MovieList/MovieList";
import { fetchMovie } from "../services/api";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const dataMovie = await fetchMovie();
        setMovies(dataMovie);
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
  }, []);

  return (
    <div>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
