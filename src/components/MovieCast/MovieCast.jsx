import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCastMovieById } from "../../services/api";

const MovieCast = () => {
  const { movieId } = useParams();
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const dataCast = await fetchCastMovieById(movieId);
      setCasts(dataCast);
    };
    getData();
  }, [movieId]);

  return (
    <div>
      <ul>
        {casts.map((item) => (
          <li key={item.id} className="item">
            <img
              className="cast-img"
              src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
              alt={item.name}
            />
            <div>{item.name}</div>
            <div>Character: {item.character}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
