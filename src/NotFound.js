import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found text-center">
      <h2 className="text-3xl">Oops...</h2>
      <p>Page could not be found</p>
      <div className="error-path">
        <Link className="btn btn-blue" to="/">
          Back to the homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
