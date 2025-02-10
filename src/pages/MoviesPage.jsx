import { useEffect, useState } from "react";
import { fetchMovie, fetchMovieByQuery } from "../services/api";
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
        if (query) {
          const dataMovies = await fetchMovieByQuery(query);
          setMovies(dataMovies);
        } else {
          const dataMovies = await fetchMovie();
          setMovies(dataMovies);
        }
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

    if (value.trim() === "") {
      newSearchParams.delete("query");
    } else {
      newSearchParams.set("query", value.trim());
    }
    setSearchParams(newSearchParams);
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
