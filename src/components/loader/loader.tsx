import React from "react";
import { Loader } from "rsuite";
import PropTypes from "prop-types";

interface AppLoaderProps {
  className: string;
}

const Apploader: React.FC<AppLoaderProps> = ({ className }) => {
  return (
    <>
      <div className={className}>
        <Loader size="md" content="Loading..." />
      </div>
    </>
  );
};

export default Apploader;
