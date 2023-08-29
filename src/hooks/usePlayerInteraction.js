import { useRef, useState, useEffect, useCallback } from "react";

const usePlayIntersection = () => {
  const containerRef = useRef();
  const [observer, setObserver] = useState();

  useEffect(() => {
    const cb = (entries) => {
      entries.forEach(({ isIntersecting, target, intersectionRect }) => {
        if (isIntersecting) target.play();
        else target.pause();
      });
    };

    const obs = new IntersectionObserver(cb, {
      root: containerRef.current,
      rootMargin: "10% 0% 10% 0%",
      threshold: 1,
    });

    setObserver(obs);

    return () => {
      obs.disconnect();
    };
  }, []);

  const observe = useCallback(
    (el) => {
      if (observer) observer.observe(el);
    },
    [observer]
  );

  return [observe, containerRef];
};
export default usePlayIntersection;
