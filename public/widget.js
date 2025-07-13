(function () {
  // === Configuration and Initialization ===
  const currentScript = document.currentScript;

  const authConfig = {
    apiKey: currentScript?.getAttribute("data-api-key"),
    botId: currentScript?.getAttribute("data-bot-id"),
    ai: currentScript?.getAttribute("data-ai"),
    model: currentScript?.getAttribute("data-model"),
  };

  const externalConfig = window.ChatWidgetConfig || {};

  // Merge external config with script config (script > window override)
  const config = { ...externalConfig, ...authConfig };

  // === Validate required keys dynamically ===
  const requiredKeys = ["apiKey", "botId", "ai", "model"];

  const missingKeys = requiredKeys.filter((key) => {
    return !authConfig[key]; // checks for "", null, undefined, 0 => all treated as missing
  });

  if (missingKeys.length > 0) {
    console.log(authConfig);

    console.warn(
      `❌ Chat Widget: Missing required key(s): ${missingKeys.join(
        ", "
      )}. Widget not loaded.`
    );
    return;
  }

  // === Build Chatbot URL ===
  const chatbotURL = `http://localhost:3000/?apiKey=${encodeURIComponent(
    config.apiKey
  )}&ai=${encodeURIComponent(authConfig.ai)}&botId=${encodeURIComponent(
    config.botId
  )}&model=${encodeURIComponent(config.model || "")}`;

  // === Create iframe ===
  const iframe = document.createElement("iframe");
  iframe.src = chatbotURL;
  iframe.allow = "clipboard-write";

  Object.assign(iframe.style, {
    position: "fixed",
    bottom: "25px",
    right: "25px",
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    overflow: "hidden",
    border: "none",
    zIndex: "9999",
    cursor: "pointer",
    transition: "all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1)",
  });

  document.body.appendChild(iframe);

  // === Create Overlay ===
  const overlay = document.createElement("div");
  Object.assign(overlay.style, {
    position: "fixed",
    bottom: "25px",
    right: "25px",
    width: "120px",
    height: "120px",
    zIndex: "10000",
    cursor: "pointer",
  });

  document.body.appendChild(overlay);

  // === State & Helpers ===
  let isExpanded = false;

  const applyStyles = (styles = {}) => {
    Object.entries(styles).forEach(([key, value]) => {
      iframe.style[key] = value;
    });
  };

  const expandChat = () => {
    const isMobile = window.innerWidth < 500;
    if (isMobile) {
      fullscreenChat();
      return;
    }

    applyStyles({
      width: "420px",
      height: "540px",
      bottom: "25px",
      right: "25px",
      borderRadius: "10px",
    });
    isExpanded = true;
    overlay.style.display = "none";
    iframe.contentWindow?.postMessage({ type: "expand-chatbot" }, "*");
  };

  const collapseChat = () => {
    applyStyles({
      width: "120px",
      height: "120px",
      bottom: "25px",
      right: "25px",
      borderRadius: "50%",
    });
    isExpanded = false;
    overlay.style.display = "block";
    iframe.contentWindow?.postMessage({ type: "collapse-chatbot" }, "*");
  };

  const fullscreenChat = () => {
    applyStyles({
      width: "100%",
      height: "100%",
      bottom: "0",
      right: "0",
      borderRadius: "0",
    });
    isExpanded = true;
    overlay.style.display = "none";
    iframe.contentWindow?.postMessage({ type: "fullscreen-chatbot" }, "*");
  };

  // === Chatbot Loaded ===
  const chatbotloaded = () => {
    iframe.contentWindow?.postMessage({ type: "chatbot-loaded" }, "*");
  };

  // === Click Handler ===
  overlay.addEventListener("click", expandChat);

  // === PostMessage Event Listener ===
  const handleMessage = (event) => {
    const { data } = event;
    if (typeof data !== "object" || !data?.type) return;

    const { type, payload } = data;

    switch (type) {
      case "expand-chatbot":
        expandChat();
        break;

      case "collapse-chatbot":
        collapseChat();
        break;

      case "fullscreen-chatbot":
        fullscreenChat();
        break;

      case "chatbot-loaded":
        chatbotloaded();
        config.onLoad?.({ botId: config.botId, version: "1.0.0" });
        break;

      case "user-message":
        if (payload?.message) config.onMessage?.(payload.message);
        break;

      case "custom-command":
        if (payload?.style) applyStyles(payload.style);
        if (payload?.expand) expandChat();
        if (payload?.collapse) collapseChat();
        break;

      default:
        break;
    }
  };

  window.addEventListener("message", handleMessage);

  // === Cleanup on Unload (optional best practice) ===
  window.addEventListener("beforeunload", () => {
    window.removeEventListener("message", handleMessage);
  });

  console.log("✅ Chat widget loaded successfully");
})();
