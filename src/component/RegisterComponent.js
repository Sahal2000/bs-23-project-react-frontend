import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Style.module.css"


function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/register", {
        userName: username,
        email: email,
        password: password,
      })
      .then(
        (res) => {
          console.log(res.data);

        if (res.data.status == true) {
            alert("User Registation Successfully");
            navigate("/");
          } else if(res.data.message == "Invalid Email") {
            alert("Invalid Email");
          }
          else {
            alert(res.data.message);
          }
        },
        (fail) => {
          console.error(fail); 
          alert(fail.response.data);
        }
      );
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div>
      <div className="container mt-4">
        <div className="card">
          <h1>User Registation</h1>

          <form>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter Username"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter Email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter Password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>

            <button type="submit" className="btn btn-primary mt-4" onClick={save}>
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
