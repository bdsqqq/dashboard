//This hook was made by Lori Baumgartner but i couldn't find it in yarn so I just wrote it

import React from "react";
export default function useResizer(): boolean {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 640);

  function handleSizeChange(): void {
    return setIsMobile(window.innerWidth < 640);
  }

  React.useEffect(() => {
    window.addEventListener("resize", handleSizeChange);

    return () => {
      window.removeEventListener("resize", handleSizeChange);
    };
  }, [isMobile]);

  return isMobile;
}
