import React from "react";

interface OverlayProps {}

const Overlay: React.FC<OverlayProps> = ({ children }) => {
  return <div className="overlay">{children}</div>;
};

export default Overlay;
