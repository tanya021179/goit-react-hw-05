import { useEffect, useState } from "react";
import { fetchMovie } from "../services/api";
import MovieList from "../components/MovieList/MovieList";
import SearchBar from "../components/SearchBar/SearchBar";
import { useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const query = searchParams.get("query") ?? "";

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const dataMovies = await fetchMovie();
        setMovies(dataMovies);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, []);

  useEffect(() => {
    const filteredData = movies.filter(
      (movie) =>
        movie &&
        movie.title &&
        movie.title.toLowerCase().includes(query.toLowerCase())
    );

    if (query) {
      if (filteredData.length === 0) {
        console.log("No movies found for your query");
      }
    }
  }, [query, movies]);

  const handleChangeQuery = (value) => {
    searchParams.set("query", value);
    setSearchParams(searchParams);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
