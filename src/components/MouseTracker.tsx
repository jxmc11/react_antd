import { useEffect, useState } from "react";

const MouseTracker = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const positionUpdate = (e: MouseEvent) => {
      setPosition({
        x: e.pageX,
        y: e.pageY,
      });
    };
    document.addEventListener("mousemove", positionUpdate);
    return () => {
      document.removeEventListener("mousemove", positionUpdate);
    };
  }, []);
  return (
    <>
      x: {position.x}, y: {position.y}
    </>
  );
};

export default MouseTracker;
