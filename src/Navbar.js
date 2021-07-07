import { Link } from "react-router-dom";
// import { useHistory } from "react-router";

const Navbar = () => {
  // const history = useHistory();
  const handleClick = () => {
    localStorage.clear();
    // history.push('/login');

  }

  return (
    <nav className="navbar">
      <Link to="/">
        <h1 className="text-2xl">The Turtle Blog</h1>
      </Link>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/create">New Blog</Link>
        <Link to="/login" onClick={handleClick}>Logout</Link>
      </div>
    </nav>
  );
};

export default Navbar;
