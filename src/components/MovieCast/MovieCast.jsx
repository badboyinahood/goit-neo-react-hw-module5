import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchMovieCredits } from "../../services/tmdb-api";
import css from "./MovieCast.module.css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200";

const MovieCast = () => {
  const { movieId } = useParams();

  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCast = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await fetchMovieCredits(movieId);
        setCast(data);
      } catch {
        setError("Failed to load cast");
      } finally {
        setIsLoading(false);
      }
    };

    loadCast();
  }, [movieId]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (cast.length === 0) {
    return <p>No cast information available.</p>;
  }

  return (
    <ul className={css.list}>
      {cast.map(actor => (
        <li key={actor.cast_id} className={css.item}>
          {actor.profile_path && (
            <img
              src={`${IMAGE_BASE_URL}${actor.profile_path}`}
              alt={actor.name}
              className={css.image}
            />
          )}
          <p>{actor.name}</p>
          <p className={css.character}>Character: {actor.character}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
