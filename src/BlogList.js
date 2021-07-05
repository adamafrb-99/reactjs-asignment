import { Link } from "react-router-dom";

const BlogList = ({ blogs, title, handleDelete }) => {
  // const blogs = props.blogs;
  // const title = props.title;

  return (
    <div className="blog-list">
      <h2 className="text-4xl mb-2">{title}</h2>
      <hr />
      {blogs.map((blog) => (
        <div key={blog.id} className="blog-preview bg-gray-100 rounded">
          <Link to={`/blogs/${blog.id}`}>
            <h2>{blog.title}</h2>
            <p className="text-base">Written: {blog.author}</p>
            <p>{blog.body}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
