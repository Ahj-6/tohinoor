import { useEffect, useRef } from "react";
import "./StarField.css";

import { startAnimation } from "./animation";

export default function StarField({
  children,
  className = "",
  variant = "full",
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const cleanup = startAnimation(canvasRef.current);

    return cleanup;
  }, []);

  return (
    <div className={`star-field ${variant} ${className}`}>
      <canvas ref={canvasRef} className="star-field__canvas" />

      <div className="star-field__content">{children}</div>
    </div>
  );
}
