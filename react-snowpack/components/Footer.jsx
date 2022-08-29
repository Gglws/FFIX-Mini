import React from "react";

const Footer = ({ chatBox }) => {
  return (
    <footer className="footer">
      {chatBox
        .slice(0)
        .reverse()
        .map((chat) => (
          <div>{chat}</div>
        ))}
    </footer>
  );
};

export default Footer;
