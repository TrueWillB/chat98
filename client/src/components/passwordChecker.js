// /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/;
import React, { useState } from "react";
// we need to take in the password that is being typed in and compare it to the regex above
// if it matches, we need to return a green checkmark
// if it doesn't match, we need to return a red x

const PassCheck = ({ value }) => {
  const pwPropMet = {
    "8 characters:": value.length >= 8,
    "1 special character:": /[$^+=!*()@%&]/.test(value),
    "1 uppercase:": /[A-Z]/.test(value),
    "1 lowercase:": /[a-z]/.test(value),
    "1 number:": /[0-9]/.test(value),
  };

  return (
    <React.Fragment>
      <div id="passwordCheckContainer">
        <span className="passwordRequirementMessage">
          Password requires at least:
        </span>
        {Object.entries(pwPropMet).map(([prop, met]) => (
          <div className="passwordRequirements" key={prop}>
            <span>{prop}</span>
            <span>{met ? "✔" : <b>✗</b>}</span>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default PassCheck;
