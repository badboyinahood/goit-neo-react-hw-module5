import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import MovieList from "../../components/MovieList/MovieList";
import { searchMovies } from "../../services/tmdb-api";

import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await searchMovies(query);
        setMovies(data);
      } catch {
        setError("Failed to load movies");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSubmit = event => {
    event.preventDefault();
    const value = event.target.elements.query.value.trim();

    if (!value) return;

    setSearchParams({ query: value });
  };

  return (
    <section className={css.section}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="text"
          name="query"
          defaultValue={query}
          placeholder="Search movies"
          className={css.input}
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {movies.length > 0 && <MovieList movies={movies} />}
    </section>
  );
};

export default MoviesPage;
