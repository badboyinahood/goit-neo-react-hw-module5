import { useEffect, useRef, useState } from "react";
import {
  NavLink,
  Link,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";

import { fetchMovieDetails } from "../../services/tmdb-api";
import css from "./MovieDetailsPage.module.css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/movies");

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch {
        setError("Failed to load movie details");
      } finally {
        setIsLoading(false);
      }
    };

    loadMovieDetails();
  }, [movieId]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return null;

  const {
    title,
    overview,
    poster_path,
    vote_average,
    genres,
  } = movie;

  return (
    <section className={css.section}>
      <Link to={backLinkRef.current} className={css.backLink}>
        ← Go back
      </Link>

      <div className={css.wrapper}>
        {poster_path && (
          <img
            src={`${IMAGE_BASE_URL}${poster_path}`}
            alt={title}
            className={css.poster}
          />
        )}

        <div className={css.info}>
          <h2>{title}</h2>
          <p>User score: {Math.round(vote_average * 10)}%</p>

          <h3>Overview</h3>
          <p>{overview}</p>

          <h3>Genres</h3>
          <p>{genres.map(g => g.name).join(", ")}</p>
        </div>
      </div>

      <div className={css.additional}>
        <h3>Additional information</h3>

        <nav className={css.nav}>
          <NavLink to="cast" className={css.link}>
            Cast
          </NavLink>
          <NavLink to="reviews" className={css.link}>
            Reviews
          </NavLink>
        </nav>
      </div>

      <Outlet />
    </section>
  );
};

export default MovieDetailsPage;
