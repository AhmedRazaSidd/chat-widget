(function () {
  // ✅ 1. Get script config
  const currentScript = document.currentScript;
  const apiKey = currentScript.getAttribute("data-api-key") || "demo-key";
  const config = window.ChatWidgetConfig || {};

  // ✅ 2. Build iframe URL
  const chatbotURL = `http://localhost:3000/?apiKey=${encodeURIComponent(
    apiKey
  )}`;

  // ✅ 3. Create chatbot iframe
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

  // ✅ 4. Apply dynamic styles
  const applyStyles = (styles = {}) => {
    for (const [key, value] of Object.entries(styles)) {
      iframe.style[key] = value;
    }
  };

  // ✅ 5. Expand widget
  const expand = () => {
    applyStyles({
      width: "420px",
      height: "540px",
      borderRadius: "16px",
      bottom: "25px",
      right: "25px",
    });
    isExpanded = true;

    // 🔥 Callback
    if (typeof config.onOpen === "function") config.onOpen();

    // 📩 Notify iframe
    iframe.contentWindow?.postMessage({ type: "expand-chatbot" }, "*");
  };

  // ✅ 6. Collapse widget
  const collapse = () => {
    applyStyles({
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      bottom: "20px",
      right: "20px",
    });
    isExpanded = false;

    // 🔥 Callback
    if (typeof config.onClose === "function") config.onClose();

    // 📩 Notify iframe
    iframe.contentWindow?.postMessage({ type: "collapse-chatbot" }, "*");
  };

  // ✅ 7. Invisible overlay to detect click
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

  // ✅ 8. Message listener (from iframe)
  window.addEventListener("message", (event) => {
    const data = event.data;
    if (typeof data !== "object" || data === null || !("type" in data)) return;

    const { type, payload } = data;

    switch (type) {
      case "collapse-chatbot":
        collapse();
        overlay.style.display = "block";
        break;

      case "expand-chatbot":
        expand();
        overlay.style.display = "none";
        break;

      case "chatbot-loaded":
        if (typeof config.onLoad === "function") {
          config.onLoad({ botId: "abc123", version: "1.0.0" });
        }
        break;

      case "user-message":
        if (typeof config.onMessage === "function" && payload?.message) {
          config.onMessage(payload.message);
        }
        break;

      case "custom-command":
        if (payload?.style) applyStyles(payload.style);
        if (payload?.expand) {
          expand();
          overlay.style.display = "none";
        }
        if (payload?.collapse) {
          collapse();
          overlay.style.display = "block";
        }
        break;

      default:
        // Silent fail for unknown types
        break;
    }
  });

  // ✅ Debug
  console.log("✅ Chat widget loaded successfully");
})();
