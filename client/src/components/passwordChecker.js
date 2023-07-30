// /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/;
import React, { useState } from "react";
// we need to take in the password that is being typed in and compare it to the regex above
// if it matches, we need to return a green checkmark
// if it doesn't match, we need to return a red x

const PassCheck = ({ value }) => {
  const pwPropMet = {
    length: value.length >= 8,
    upper: /[A-Z]/.test(value),
    lower: /[a-z]/.test(value),
    number: /[0-9]/.test(value),
    special: /[$^+=!*()@%&]/.test(value),
  };

  return (
    <React.Fragment>
      <div>
        <ul>
          <li>Length: {pwPropMet.length ? "✅" : "❌"}</li>
          <li>Uppercase: {pwPropMet.upper ? "✅" : "❌"}</li>
          <li>Lowercase: {pwPropMet.lower ? "✅" : "❌"}</li>
          <li>Number: {pwPropMet.number ? "✅" : "❌"}</li>
          <li>Special Character: {pwPropMet.special ? "✅" : "❌"}</li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default PassCheck;
