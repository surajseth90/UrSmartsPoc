import { useState } from "react";

const ReadMore = ({ text, limit = 250, textClasses, btnClasses }) => {
  const [expanded, setExpanded] = useState(false);

  const toggle = () => setExpanded(prev => !prev);

  if (!text) return null;

  const isLongText = text.length > limit;
  const displayText = expanded || !isLongText ? text : text.slice(0, limit) + "...";

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <p className={textClasses}>{displayText}</p>
      {isLongText && (
        <button onClick={toggle} className={`btn-secondary w-max ${btnClasses}`}>
          {expanded ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
};

export default ReadMore;
