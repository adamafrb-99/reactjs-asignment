import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("joko");
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const blog = { title, body, author };

    setIsPending(true);

    // fetch("http://localhost:8000/blogs", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(blog),
    // }).then(() => {
    //   console.log("New blog added.");
    //   setIsPending(false);
    //   history.push("/");
    // });

    axios({
      method: 'post',
      url: 'http://localhost:8000/blogs',
      timeout: 4000, 
      data: blog
    })
    .then(response => {
      console.log(response);
      setIsPending(false);
      history.push("/");
    })
    .catch(error => console.error('Timeout exceeded'));
  };

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

  useEffect(() => {
    if (!isAuthenticated()) {
      history.push("/login");
    }
  }, []);

  return (
    <div className="create text-center max-w-md my-0 mx-auto">
      <h2 className="text-4xl mb-5">Add a New Blog</h2>
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
        {!isPending && <button className="btn btn-blue mt-5">Add blog</button>}
        {isPending && <button disabled>Adding blog...</button>}
      </form>
    </div>
  );
};

export default Create;
