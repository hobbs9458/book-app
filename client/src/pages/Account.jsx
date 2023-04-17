import "./Account.css";
import closeX from "../assets/close-x.svg";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Account() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  function handleFormSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <div className="account">
        <div className="container">
          <h2 className="title">Account Info</h2>
          <Link to="/">
            <img src={closeX} alt="x close btn" className="close-x" />
          </Link>
          <form className="form-info" onSubmit={handleFormSubmit}>
            <label className="label" htmlFor="name">
              Name
            </label>
            <input
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              type="text"
              id="name"
            />
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              className="input"
              name="email"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="btn">Update</button>
          </form>
          <form className="password-form">
            <label className="label" htmlFor="password">
              Current Password
            </label>
            <input
              className="input"
              name="password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="label" htmlFor="new-password">
              New Password
            </label>
            <input
              className="input"
              name="password"
              type="password"
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <label className="label" htmlFor="password-confirm">
              New Password Confirm
            </label>
            <input
              className="input"
              name="password-confirm"
              type="password"
              id="password-confirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            <button className="btn">Reset Password</button>
          </form>
        </div>
      </div>
    </>
  );
}
