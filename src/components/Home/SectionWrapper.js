// components/SectionWrapper.js
import useInView from "./useInView"; // adjust path

const SectionWrapper = ({ children, className = "" }) => {
  const [ref, isVisible] = useInView();

  return (
    <div
      ref={ref}
      className={`section-wrapper ${className} ${isVisible ? "animate" : ""}`}
    >
      {children}
    </div>
  );
};

export default SectionWrapper;
