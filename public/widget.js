(function () {
  // ✅ Get the current script tag and extract API key
  const currentScript = document.currentScript;
  const apiKey = currentScript.getAttribute("data-api-key") || "demo-key";

  // ✅ Build chatbot iframe URL
  const chatbotURL = `http://localhost:5173/?apiKey=${encodeURIComponent(
    apiKey
  )}`;

  // ✅ Create and style iframe
  const iframe = document.createElement("iframe");
  iframe.src = chatbotURL;
  iframe.allow = "clipboard-write";

  Object.assign(iframe.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    border: "none",
    zIndex: "9999",
    transition: "all 0.3s ease-in-out",
  });

  document.body.appendChild(iframe);

  let isExpanded = false;

  // ✅ Apply multiple styles dynamically
  const applyStyles = (styles = {}) => {
    for (const [key, value] of Object.entries(styles)) {
      iframe.style[key] = value;
    }
  };

  // ✅ Expand widget
  const expand = () => {
    applyStyles({
      width: "420px",
      height: "540px",
      borderRadius: "16px",
      bottom: "25px",
      right: "25px",
    });
    isExpanded = true;
  };

  // ✅ Collapse widget to bubble
  const collapse = () => {
    applyStyles({
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      bottom: "20px",
      right: "20px",
    });
    isExpanded = false;
  };

  // ✅ Invisible overlay to detect click (since iframe clicks are isolated)
  const overlay = document.createElement("div");
  Object.assign(overlay.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "60px",
    height: "60px",
    zIndex: "10000",
    cursor: "pointer",
  });
  document.body.appendChild(overlay);

  overlay.addEventListener("click", () => {
    expand();
    overlay.style.display = "none";
  });

  // ✅ Handle incoming messages from iframe (React app)
  window.addEventListener("message", (event) => {
    if (typeof event.data !== "object") return;

    const { type, payload } = event.data;

    switch (type) {
      case "custom-command":
        if (payload?.style) {
          applyStyles(payload.style);
        }
        if (!isExpanded) {
          overlay.style.display = "none";
          isExpanded = true;
        }
        break;

      case "collapse-chatbot":
        collapse();
        overlay.style.display = "block";
        break;

      case "expand-chatbot":
        expand();
        overlay.style.display = "none";
        break;

      case "chatbot-loaded":
        console.log("🤖 Chatbot is ready");
        break;

      default:
        console.warn("🚧 Unknown message type:", type);
    }
  });

  // ✅ Log on load
  console.log("✅ Chat widget loaded successfully");
})();
