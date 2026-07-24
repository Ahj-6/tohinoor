import { useEffect, useRef } from "react";

import "./StarField.css";

import { startAnimation } from "../../../pages/Home/components/GalaxyBackground/animation";

export default function StarField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cleanup = startAnimation(canvasRef.current);

    return cleanup;
  }, []);

  return <canvas ref={canvasRef} className="star-field" />;
}
