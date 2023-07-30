import React, { useState } from "react";
import { Modal, Box, Button, TextField } from "@mui/material";
import { useMutation } from "@apollo/client";
import { LOGIN_USER, ADD_USER } from "../../utils/mutations";

import Auth from "../../utils/auth";

const Login = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [loginFormState, setLoginFormState] = useState({
    email: "",
    password: "",
  });
  const [signUpFormState, setSignUpFormState] = useState({
    email: "",
    password: "",
    username: "",
  });
  // { error, data} is destructured from the useMutation hook
  const [login, { error: loginError, data: loginData }] =
    useMutation(LOGIN_USER);
  const [addUser, { error: addUserError, data: addUserData }] =
    useMutation(ADD_USER);

  //   handldSignupChange will allow us to update the state of the signup form
  const handleSignupChange = (event) => {
    const { name, value } = event.target;
    setSignUpFormState({
      ...signUpFormState,
      [name]: value,
    });
  };

  //  handldLoginChange will allow us to update the state of the login form
  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginFormState({
      ...loginFormState,
      [name]: value,
    });
  };
  //  handleLogin will allow us to submit the login form
  const handleLogin = async (event) => {
    event.preventDefault();
    // console.log(loginFormState);
    try {
      const { data } = await login({
        variables: { ...loginFormState },
      });

      Auth.login(data.login.token);
      console.log("login success!");
      handleClose();
    } catch (e) {
      console.error(e);
    }
  };

  //  handleSignup will allow us to submit the signup form
  const handleSignup = async (event) => {
    event.preventDefault();
    // console.log(signUpFormState);
    try {
      const { data } = await addUser({
        variables: { ...signUpFormState },
      });

      Auth.login(data.addUser.token);
      handleClose();
      console.log("login success!");
    } catch (e) {
      console.error(e);
    }
  };

  // handleOpenSignupModal will allow us to open the signup modal
  const handleOpenSignupModal = () => {
    setLoginModalOpen(false);
    setSignupModalOpen(true);
  };

  // handleOpenLoginModal will allow us to open the login modal
  const handleOpenLoginModal = () => {
    setLoginModalOpen(true);
    setSignupModalOpen(false);
  };

  // handleClose will allow us to close the modal
  const handleClose = () => {
    setLoginModalOpen(false);
    setSignupModalOpen(false);
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    border: "2px solid black",
    boxShadow: 24,
    width: 400,
    height: 400,
  };

  return (
    <React.Fragment>
      <div id="modalContainer">
        {loginData || addUserData ? (
          <Button variant="contained" onClick={Auth.logout}>
            Logout
          </Button>
        ) : (
          <div>
            <Button variant="contained" onClick={handleOpenLoginModal}>
              Login
            </Button>
            <Modal
              open={loginModalOpen || signupModalOpen}
              onClose={handleClose}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <Box
                component="form"
                sx={{
                  ...modalStyle,
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
              >
                {loginModalOpen && (
                  <div id="loginModal">
                    <h2 id="parent-modal-title">Chat 98 Login</h2>
                    <TextField
                      required
                      id="outlined-basic"
                      label="email"
                      name="email"
                      type="email"
                      value={loginFormState.email}
                      variant="outlined"
                      onChange={handleLoginChange}
                    />
                    <TextField
                      required
                      id="outlined-basic"
                      label="password"
                      name="password"
                      type="password"
                      value={loginFormState.password}
                      variant="outlined"
                      onChange={handleLoginChange}
                    />
                    <div>
                      <Button variant="contained" onClick={handleLogin}>
                        Login
                      </Button>
                      <Button
                        variant="contained"
                        onClick={handleOpenSignupModal}
                      >
                        Click Here to Signup
                      </Button>
                    </div>
                  </div>
                )}
                {signupModalOpen && (
                  <div id="signupModal">
                    <h2 id="parent-modal-title">Signup</h2>
                    <TextField
                      required
                      id="outlined-basic"
                      label="email"
                      name="email"
                      type="email"
                      value={signUpFormState.email}
                      variant="outlined"
                      onChange={handleSignupChange}
                    />
                    <TextField
                      required
                      id="outlined-basic"
                      label="password"
                      name="password"
                      type="password"
                      value={signUpFormState.password}
                      variant="outlined"
                      onChange={handleSignupChange}
                    />
                    <TextField
                      required
                      id="outlined-basic"
                      label="username"
                      name="username"
                      type="username"
                      value={signUpFormState.username}
                      variant="outlined"
                      onChange={handleSignupChange}
                    />
                    <Button variant="contained" onClick={handleSignup}>
                      Signup
                    </Button>
                    <Button variant="contained" onClick={handleOpenLoginModal}>
                      Back to Login
                    </Button>
                  </div>
                )}
                {loginError && <div>{loginError.message}</div>}
                {addUserError && <div>{addUserError.message}</div>}
              </Box>
            </Modal>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Login;
