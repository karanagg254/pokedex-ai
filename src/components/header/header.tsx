import React, { ReactNode } from "react";
import "./header.scss";
import PropTypes from "prop-types";

interface HeaderProps {
  children: ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return <header className="header">{children}</header>;
};

export default Header;
