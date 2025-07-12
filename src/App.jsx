import { useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  // useEffect(() => {
  //   // Auto-expand on load or after delay
  //   setTimeout(() => {
  //     window.parent.postMessage(
  //       {
  //         type: "custom-command",
  //         payload: {
  //           style: {
  //             width: "420px",
  //             height: "540px",
  //             borderRadius: "16px",
  //             bottom: "25px",
  //             right: "25px",
  //           },
  //         },
  //       },
  //       "*"
  //     );
  //   }, 100); // or 1000ms for delay
  // }, []);

  return (
    <>
      <button
        onClick={() =>
          window.parent.postMessage({ type: "collapse-chatbot" }, "*")
        }
      >
        ❌ Close
      </button>
    </>
  );
}

export default App;
