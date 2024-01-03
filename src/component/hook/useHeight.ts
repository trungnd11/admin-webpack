import { useLayoutEffect, useState } from "react";

export default function useHeight(id?: string) {
  const [height, setHeight] = useState<number>(30);

  useLayoutEffect(() => {
    if (!id) {
      setHeight(screen.height);
    } else {
      const heightElement = document.getElementById(id);
      if (heightElement) {
        setHeight(heightElement.offsetHeight || 30);
      }
    }
  }, []);

  return height;
}
