import React, { useRef, useEffect } from "react";

const useClickOutside = (ref, onClickOutside) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClickOutside(e.target);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};

const ClickOutsideWrapper = ({ children, className, onClickOutside }) => {
  const ref = useRef(null);
  useClickOutside(ref, onClickOutside);

  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  );
};

export default ClickOutsideWrapper;
