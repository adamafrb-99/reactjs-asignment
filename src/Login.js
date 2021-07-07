import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from 'axios';
// import instance from "./api/axiosInstance";
// export const axios = instance.apiInstance();

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

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
    if (isAuthenticated()) history.push("/");
  }, [isAuthenticated]);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`http://localhost:3000/api/auth/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        const response = res.data.token;

        console.log("response", response);
        const tokenData = jwt_decode(response);
        console.log(tokenData);
        localStorage.setItem("expiresIn", tokenData.exp * 1000);
        localStorage.setItem("token", response);
        history.push(`/`);
        // window.location.href = "/";
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };

  return (
    <div className="create text-center max-w-md my-0 mx-auto">
      <h2 className="text-4xl mb-5">Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="text"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <label>Password:</label>
        <input
          type="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button className="btn btn-blue mt-5">Login</button>
      </form>
    </div>
  );
};

export default Login;