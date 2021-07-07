import { useEffect } from "react";
import BlogList from "./BlogList";
import useFetch from "./useFetch";
import { useHistory } from "react-router";

const Home = () => {
  const getTimeIn = () => {
    const timeNow = new Date().getTime();
    return parseFloat((timeNow + 1) / 1000).toFixed(0);
  };

  const isAuthenticated = () => {
    const expiresIn = localStorage.getItem("expiresIn");
    if (expiresIn) {
      if (expiresIn < getTimeIn()) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };

  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated()) {
      history.push("/login");
    }
  }, []);

  const {
    data: blogs,
    isPending,
    error,
  } = useFetch("http://localhost:8000/blogs");

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {blogs && <BlogList blogs={blogs} title={"All blogs"} />}
    </div>
  );
};

export default Home;
