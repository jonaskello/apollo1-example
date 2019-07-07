import React from "react";

const CountryList = ({ countries }) => {
  return (
    <div className="messagesList">
      {countries.map(c => (
        <div key={c.code} className="message">
          {c.name}
        </div>
      ))}
    </div>
  );
};
export default CountryList;
