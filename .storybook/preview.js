export const parameters = {};

export const decorators = [
  (Story) => {
    if (typeof document !== "undefined") {
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          mutation.addedNodes.forEach((node) => {
            if (
              node.nodeType === 1 &&
              node.textContent?.includes("MUI X Missing license key")
            ) {
              node.lastChild?.remove();
            }
          });
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    return Story();
  },
];
