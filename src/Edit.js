import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from 'axios';

const Edit = () => {
  const { id } = useParams();
  const url = `http://localhost:8000/blogs/${id}`;
  const [blog, setBlog] = useState();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const blog = { title, body, author };

    setIsPending(true);

    // fetch(url, {
    //   method: "PATCH",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(blog),
    // }).then(() => {
    //   console.log("Blog has been edited.");
    //   setIsPending(false);
    //   history.push("/blogs/" + id);
    // });

    axios({
      method: 'patch',
      url: url,
      timeout: 4000, 
      data: blog
    })
    .then(response => {
      console.log(response);
      setIsPending(false);
      history.push("/blogs/" + id);
    })
    .catch(error => console.error('Timeout exceeded'));

  };

  useEffect(() => {
    // const abortCont = new AbortController();

    // fetch(url, { signal: abortCont.signal })
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((blog) => {
    //     setBlog(blog);
    //     setTitle(blog.title);
    //     setBody(blog.body);
    //     setAuthor(blog.author);
    //   });
    // return () => {
    //   abortCont.abort();
    // };

    axios.get(url)
      .then(res => {
        setBlog(res.data);
        setTitle(res.data.title);
        setBody(res.data.body);
        setAuthor(res.data.author);
      })
      .catch(err => {
        console.log(err.message);
      });

  }, [url]);

  return (
    <div className="create">
      {blog && (
        <div>
          <h2 className="text-4xl mb-5">Edit Blog</h2>
          <form onSubmit={handleSubmit}>
            <label>Title:</label>
            <input
              type="text"
              required
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />

            <label>Content:</label>
            <textarea
              required
              value={body}
              onChange={(event) => setBody(event.target.value)}
            ></textarea>

            <label>Author:</label>
            <select
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
            >
              <option value="joko">joko</option>
              <option value="suseno">suseno</option>
            </select>
            {!isPending && (
              <button className="btn btn-green mt-5">Edit blog</button>
            )}
            {isPending && <button disabled>Editing blog...</button>}
          </form>
        </div>
      )}
    </div>
  );
};

export default Edit;
