import { memo } from "react";

const BlurBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full bg-black/30 backdrop-blur-xs" />
  );
};

export default memo(BlurBackground);
