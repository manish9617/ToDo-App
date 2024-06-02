import { FcGoogle } from "react-icons/fc";
import { BsLinkedin } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useRef } from "react";
import axios from "axios";
import { AllFuntion } from "./store";

export default function Login() {
  const { handleAuth } = useContext(AllFuntion);
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  function handleForm(event) {
    event.preventDefault();
    const formData = {
      email: email.current.value,
      password: password.current.value,
    };
    axios
      .post("http://localhost:3000/login", formData)
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log(res.data);
          localStorage.setItem("token", res.data.token); // Store token in localStorage
          handleAuth();
          navigate("/"); // Navigate after setting the token
        } else {
          alert(res.data.Error);
        }
      })
      .catch((err) => {
        alert("Authentication failed: " + err);
      });

    // email.current.value = "";
    // password.current.value = "";
  }

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div className="card text-white bg-dark p-4 w-50 md:w-75 lg:w-50">
        <div className="text-center text-2xl mb-4">Sign In</div>
        <div className="d-flex justify-content-center gap-3 mb-4">
          <FcGoogle size={40} />
          <BsLinkedin size={40} />
        </div>
        <div className="d-flex align-items-center justify-content-center mb-4">
          <div className="border-bottom border-gray-400 w-25"></div>
          <span className="px-2 text-gray-500">OR</span>
          <div className="border-bottom border-gray-400 w-25"></div>
        </div>
        <div className="card-body">
          <form onSubmit={handleForm}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                ref={email}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                ref={password}
              />
              <small>
                <Link to="/" className="text-decoration-none">
                  Forgot password?
                </Link>
              </small>
            </div>
            <button
              type="submit"
              className="btn btn-dark w-100 mb-2 bg-primary"
            >
              LOGIN
            </button>
          </form>
          <p className="mt-2 text-center">
            Don't have an account?
            <Link to="/register" className="text-decoration-none ms-1">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
