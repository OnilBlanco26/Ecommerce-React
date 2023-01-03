import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import "../components/home/styles/login.css";

const Login = () => {
  const { handleSubmit, register, reset } = useForm();

  const submit = (data) => {
    const URL = "https://e-commerce-api.academlo.tech/api/v1/users/login";
    axios
      .post(URL, data)
      .then((res) => {
        console.log(res.data.data);
        localStorage.setItem("token", res.data.data.token);
      })
      .catch((err) => console.log(err));
    reset({
      email: "",
      password: "",
    });
  };

  return (
    <div className="login__container">
      <div className="login__header">
        <h2 className="login__text">
        Welcome! Enter your email and password to continue
        </h2>
      </div>
      <form className="login__form" onSubmit={handleSubmit(submit)}>
        <h1 className="login__icon">
          <i className="fa-regular fa-user"></i>
        </h1>
        <div className="form__container--email">
          <label className="form__label--email" htmlFor="email">
            Email
          </label>
          <input
            className="form__input--email"
            type="text"
            id="email"
            {...register("email")}
          />
        </div>
        <div className="form__container--pass">
          <label className="form__label--pass" htmlFor="password">
            Password
          </label>
          <input
            className="form__input--pass"
            type="password"
            id="password"
            {...register("password")}
          />
        </div>
        <button className="form__login--btn">Login</button>
        <div className="form__logout--container">
            <p className="form__logout--text">Don't have an account?</p>
            <a className="form__logout--link" href="">Sign Up</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
