import { RefObject, useState } from "react";
import { useSafeLayoutEffect } from "./useSafeLayoutEffect";

export function useTabIndicator(
  selectedIndex: number,
  ...tabRefs: Array<RefObject<HTMLButtonElement>>
): React.CSSProperties {
  console.log("useTabIndicator", selectedIndex, tabRefs);
  // const context = useTabsContext();
  // const descendants = useTabsDescendantsContext();
  let orientation = "horizontal";
  //const { selectedIndex } = context; //

  const isHorizontal = orientation === "horizontal";
  const isVertical = orientation === "vertical";

  // Get the clientRect of the selected tab
  const [rect, setRect] = useState(() => {
    if (isHorizontal) return { left: 0, height: 0, width: 0 };
    if (isVertical) return { top: 0, height: 0, width: 0 };
    return undefined;
  });

  const [hasMeasured, setHasMeasured] = useState(false);

  // Update the selected tab rect when the selectedIndex changes
  useSafeLayoutEffect(() => {
    if (selectedIndex == null) return;

    const tab = tabRefs[selectedIndex].current; // descendants.item(selectedIndex);
    if (tab === null) return;

    const isDomElement = tab instanceof HTMLButtonElement;
    console.log("111", tab, tab.offsetLeft);
    // Horizontal Tab: Calculate width and left distance
    if (isDomElement && isHorizontal) {
      setRect({
        left: tab.offsetLeft,
        width: tab.offsetWidth,
        height: tab.offsetHeight,
      });
    }

    // Vertical Tab: Calculate height and top distance
    if (isDomElement && isVertical) {
      setRect({
        top: tab.offsetTop,
        width: tab.offsetWidth,
        height: tab.offsetHeight,
      });
    }

    // Prevent unwanted transition from 0 to measured rect
    // by setting the measured state in the next tick
    const id = requestAnimationFrame(() => {
      setHasMeasured(true);
    });

    return () => {
      if (id) {
        cancelAnimationFrame(id);
      }
    };
  }, [selectedIndex, isHorizontal, isVertical, ...tabRefs]);

  return {
    position: "absolute",
    transitionProperty: "left, right, top, bottom, height, width",
    transitionDuration: hasMeasured ? "200ms" : "0ms",
    transitionTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
    ...rect,
  };
}

function makeTabId(id: string, index: number) {
  return `${id}--tab-${index}`;
}
