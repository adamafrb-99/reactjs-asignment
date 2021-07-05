import { useParams, useHistory, Link } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
  const { id } = useParams();
  const {
    data: blog,
    isPending,
    error,
  } = useFetch(`http://localhost:8000/blogs/${id}`);
  const history = useHistory();

  const handleClick = () => {
    fetch(`http://localhost:8000/blogs/${id}`, {
      method: "DELETE",
    }).then(() => {
      history.push("/");
    });
  };

  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <h2 className="text-4xl mb-2">{blog.title}</h2>
          <p className="text-base text-gray-700">Written by: {blog.author}</p>
          <div>{blog.body}</div>
          <button className="btn btn-red mr-2" onClick={handleClick}>
            Delete
          </button>
          <Link to={`/blogs/${id}/edit`} className="btn btn-green">
            Edit
          </Link>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
