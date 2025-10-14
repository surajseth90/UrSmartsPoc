import React, { useState, useMemo } from "react";

function FeedbackCard({ feedback }) {
  const [expanded, setExpanded] = useState(false);

  const CHAR_LIMIT = 400;

  const plainText = useMemo(() => {
    const div = document.createElement("div");
    div.innerHTML = feedback.feedback;
    return div.textContent || div.innerText || "";
  }, [feedback.feedback]);

  const isLong = plainText.length > CHAR_LIMIT;

  const previewText =
    plainText.substring(0, CHAR_LIMIT) + (isLong ? "..." : "");

  const toggleReadMore = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div className={`d-flex flex-column card position-relative ${expanded ? "expanded" : "fixed-height"}`}>
      <div className={`card-body ${expanded ? "expanded" : "fixed-height"}`}>
        <h3 className="card-title font-20 font-bold text-uppercase">
          {feedback.name}
        </h3>

        {!expanded ? (
          <>
            <p className="font-14 mt-3 card-text">{previewText}</p>
            {isLong && (
              <button className="btn btn-link p-0" onClick={toggleReadMore}>
                Read more
              </button>
            )}
          </>
        ) : (
          <>
            <div
              className="font-14 mt-3 card-text"
              dangerouslySetInnerHTML={{ __html: feedback.feedback }}
            />
            <button className="btn btn-link p-0 mt-2" onClick={toggleReadMore}>
              Read less
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default FeedbackCard;
