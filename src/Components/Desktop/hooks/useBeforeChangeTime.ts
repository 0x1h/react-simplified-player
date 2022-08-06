import { useState, useEffect } from "react";


export const useBeforeChangeTime = (currentDuration: number, pressed: boolean) => {
  const [beforeChangeTime, setBeforeChangeTime] = useState(currentDuration);

  useEffect(() => {
    if (pressed) return;

    setBeforeChangeTime(currentDuration);
  }, [currentDuration]);

  return {beforeChangeTime, setBeforeChangeTime}
}