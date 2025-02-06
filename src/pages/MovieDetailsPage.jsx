import { useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { fetchMovieById } from "../services/api";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [details, setDetails] = useState(null);
  const location = useLocation();
  const gobackUrl = useRef(location?.state ?? "/movies");

  useEffect(() => {
    const getMovie = async () => {
      try {
        const dataMovie = await fetchMovieById(movieId);
        setDetails(dataMovie);
      } catch (error) {
        console.log(error);
      }
    };
    getMovie();
  }, [movieId]);

  if (!details) {
    return <div>Loading...</div>;
  }

  const userScore = details.vote_average ? details.vote_average * 10 : 0;

  return (
    <div className="movies">
      <Link to={gobackUrl.current}>Go back</Link>
      <div className="list">
        <img
          className="img"
          src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
          alt={details.title}
        />
        <div className="details">
          <h2>
            {details.title} ({details.release_date})
          </h2>
          <p>User Score: {userScore.toFixed(0)}%</p>
          <p>
            <strong>Overview</strong>
            <br />
            {details.overview}
          </p>
          <p>
            <strong>Genres</strong>
            <br />
            {details.genres.map((genre) => genre.name).join(", ")}
          </p>
        </div>
      </div>
      <div className="inform">
        <p>Additional information</p>
        <nav className="navinformation">
          <NavLink to="casts">Cast</NavLink>
          <NavLink to="reviews">Reviews</NavLink>
        </nav>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
