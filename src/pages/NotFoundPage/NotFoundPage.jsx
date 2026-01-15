import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>404</h1>
      <p className={css.text}>Page not found</p>

      <Link to="/" className={css.link}>
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
