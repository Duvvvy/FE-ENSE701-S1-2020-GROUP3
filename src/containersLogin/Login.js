import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import AlertDialog from "../components/AlertDialog";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [popupWindow, setPopup] = useState(false);
  const [popupWindowMessage, setPopupMessage] = useState("");
  const [popupWindowTitle, setPopupTitle] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    var request = require("request");
    request.post(
      {
        headers: { "content-type": "application/x-www-form-urlencoded" },
        url: "http://localhost:9000/auth",
        form: { email: email, username: username, password: password },
      },
      function (error, response, body) {
        console.log("Hit");
        if (response.statusCode === 200) {
          setPopupTitle("Success");
          setPopupMessage("Login Sucessful ");
          setPopup(true);
        } else {
          setPopupTitle("Internal Server Error");
          setPopupMessage("Login invalid.");
          setPopup(true);
        }
      }
    );
    event.preventDefault();
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="username" bsSize="large">
          <ControlLabel>Username</ControlLabel>
          <FormControl
            autoFocus
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
      <AlertDialog
        popupWindow={popupWindow}
        toggle={setPopup}
        title={popupWindowTitle}
        message={popupWindowMessage}
      ></AlertDialog>
    </div>
  );
}
