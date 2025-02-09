import { useEffect, useState } from "react";
import { fetchMovie } from "../services/api";
import MovieList from "../components/MovieList/MovieList";
import SearchBar from "../components/SearchBar/SearchBar";
import { useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const query = searchParams.get("query") ?? "";

  useEffect(() => {
    const getMovies = async () => {
      if (!query) return;
      setLoading(true);
      setError(null);
      setHasSearched(true);

      try {
        const dataMovies = await fetchMovie(query);
        setMovies(dataMovies);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, [query]);

  const handleChangeQuery = (value) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("query", value);
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
      {hasSearched && filteredData.length === 0 ? (
        <div>No movies found!</div>
      ) : (
        <MovieList movies={filteredData} />
      )}
    </div>
  );
};

export default MoviesPage;
