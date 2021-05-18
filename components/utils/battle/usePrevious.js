import { useEffect, useRef } from "react";

function usePrevious(stateVal) {
  const ref = useRef(stateVal);
  useEffect(() => {
    // causes infinite loop when
    // player is selecting ability
    //console.log(ref.current);
    ref.current = stateVal;
  });
  return ref.current;
}

export default usePrevious;
