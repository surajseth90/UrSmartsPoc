// hooks/useInView.js
import { useEffect, useRef, useState } from "react";

export default function useInView(options = {}) {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current); // remove if you want it only once
        }
      },
      { threshold: 0.2, ...options } // adjust threshold as needed
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return [ref, isVisible];
}
