import React, { Component } from "react";
import axios from "axios";
import "./login.css";

class Login extends Component {
  onSubmit(e) {
    e.preventDefault();
    const userId = e.target.username.value;

    axios
      .post("http://localhost:5000/login", { userId: userId })
      .then((res) => {
        if (res.status == 200) {
          localStorage.setItem("accessToken", res.data.accessToken);
          alert("Login success!");
          window.location.href = "http://localhost:3000/movie";
          return res.data;
        } else if (res.status === "401") {
          throw new Error("Something went wrong!");
        }
      })
      .catch((error) => {
        if (error.response.status == 401) {
          alert("Incorrect account or password!");
        } else {
          console.log("Error", error.message);
        }
      });
  }

  render() {
    return (
      <div className="login">
        <div className="container1">
          <div className="form-tt">
            <h2>Login</h2>
            <form name="login" type="submit" onSubmit={this.onSubmit}>
              <input type="text" name="username" placeholder="User Name" />
              <input type="password" name="password" placeholder="Pass Word" />
              <input type="submit" name="submit" value="Login" />
            </form>
          </div>
        </div>
        <div className="container1">
          <h2>Sign in to enjoy your favorite movies!</h2>
        </div>
      </div>
    );
  }
}

export default Login;
