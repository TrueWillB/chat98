import React, { useState } from "react";
import { Modal, Box, Button, TextField } from "@mui/material";
import { useMutation } from "@apollo/client";
import { LOGIN_USER, ADD_USER } from "../../utils/mutations";
import PassCheck from "../passwordChecker";
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
      window.location.replace("/home");
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
      window.location.replace("/avatar-generator");
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
    backgroundColor: "#dcdbdb",
    borderBottom: "4px solid #AAA9A9",
    width: 400,
  };

  return (
    <React.Fragment>
      <div id="modalContainer">
        {Auth.loggedIn() || addUserData ? (
          // {loginData || addUserData ? (
          <Button class="homeButtons" onClick={Auth.logout}>
            Logout
          </Button>
        ) : (
          <div id="loginModalContents">
            <Button class="homeButtons" onClick={handleOpenLoginModal}>
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
                    <div class="parentModalHeader">
                      <Button
                        class="internalModalButtons"
                        id="internalModalButtons"
                        onClick={handleLogin}
                      >
                        Login
                      </Button>
                      <Button
                        Button
                        class="internalModalButtons"
                        id="internalModalButtons"
                        onClick={handleOpenSignupModal}
                      >
                        Sign up
                      </Button>
                    </div>
                    <div class="labelAndFieldContainer">
                      <span class="modalLabels">Email:</span>{" "}
                      <TextField
                        required
                        name="email"
                        type="email"
                        value={loginFormState.email}
                        onChange={handleLoginChange}
                      />{" "}
                    </div>
                    <div class="labelAndFieldContainer">
                      <span class="modalLabels">Password:</span>{" "}
                      <TextField
                        name="password"
                        type="password"
                        value={loginFormState.password}
                        onChange={handleLoginChange}
                      />
                    </div>
                    <div></div>
                  </div>
                )}
                {signupModalOpen && (
                  <div id="signupModal">
                    <div class="parentModalHeader">
                      <Button
                        Button
                        class="internalModalButtons"
                        id="internalModalButtons"
                        onClick={handleOpenLoginModal}
                      >
                        Back to Login
                      </Button>
                      <Button
                        Button
                        class="internalModalButtons"
                        id="internalModalButtons"
                        onClick={handleSignup}
                      >
                        Sign up
                      </Button>
                    </div>
                    <div class="labelAndFieldContainer">
                      <span class="modalLabels">Username</span>
                      <TextField
                        required
                        name="username"
                        type="username"
                        value={signUpFormState.username}
                        variant="outlined"
                        onChange={handleSignupChange}
                      />
                    </div>
                    <div class="labelAndFieldContainer">
                      <span class="modalLabels">Email</span>
                      <TextField
                        required
                        name="email"
                        type="email"
                        value={signUpFormState.email}
                        onChange={handleSignupChange}
                      />
                    </div>
                    <div class="labelAndFieldContainer">
                      <span class="modalLabels">Password</span>
                      <TextField
                        required
                        name="password"
                        type="password"
                        value={signUpFormState.password}
                        onChange={handleSignupChange}
                      />
                    </div>
                    <PassCheck value={signUpFormState.password} />
                    {loginError && <div>{loginError.message}</div>}
                    {addUserError && <div>{addUserError.message}</div>}
                  </div>
                )}
              </Box>
            </Modal>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Login;

/*  
Madeline's little wishlist close modal x

<Button
className="internalModalButtons"
id="closeModalX"
onClick={handleClose}
>x</Button>

                      */
