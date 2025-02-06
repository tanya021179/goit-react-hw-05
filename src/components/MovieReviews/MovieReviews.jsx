import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchReviewMovieById } from "../../services/api";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const dataReview = await fetchReviewMovieById(movieId);
      setReviews(dataReview);
    };
    getData();
  }, [movieId]);

  if (reviews.length === 0) {
    return <p>No review.</p>;
  }

  return (
    <div>
      <ul>
        {reviews.map((item) => (
          <li key={item.id}>{item.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
