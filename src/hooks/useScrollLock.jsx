import {useLayoutEffect} from "react";

export default function useScrollLock() {
  useLayoutEffect(function() {
    const position = document.body.style.position;
    const top = document.body.style.top;
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    return function() {
      document.body.style.position = position;
      document.body.style.top = top;
      window.scrollTo(0,scrollY )
    }
  }, [])
}