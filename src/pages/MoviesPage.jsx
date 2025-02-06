import { useEffect, useState } from "react";
import { fetchMovie } from "../services/api";
import MovieList from "../components/MovieList/MovieList";
import SearchBar from "../components/SearchBar/SearchBar";
import { useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  useEffect(() => {
    const getMovies = async () => {
      try {
        const dataMovies = await fetchMovie();
        setMovies(dataMovies);
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
  }, []);

  if (!movies) {
    return <div>Loading...</div>;
  }

  const handleChangeQuery = (value) => {
    searchParams.set("query", value);

    setSearchParams(searchParams);
  };

  const filteredData = movies.filter(
    (movie) =>
      movie &&
      movie.title &&
      movie.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <SearchBar handleChangeQuery={handleChangeQuery} query={query} />
      {filteredData.length === 0 ? (
        <div>No movies found!</div>
      ) : (
        <MovieList movies={filteredData} />
      )}
    </div>
  );
};

export default MoviesPage;
