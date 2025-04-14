import { createContext, useState } from "react";
import runChat from "../config/gemini";


export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const onSent = async () => {
    try {
      // Your existing code
      const result = await runChat(input);
      setResultData(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      
      // Check if it's a rate limit error
      if (error.message.includes("429") || error.message.includes("quota")) {
        setResultData("You've reached the API request limit. Please wait a minute and try again.");
      } else {
        setResultData("Sorry, there was an error processing your request. Please try again.");
      }
      
      console.error("Error while fetching response:", error);
    }
    try {
      setLoading(true);
      setShowResult(false);
      const response = await runChat(input);
      setResultData(response);
      setRecentPrompt(input);
      setShowResult(true);
      setInput("");
      setLoading(false);
    } catch (error) {
      console.error("Error while fetching response:", error);
      setLoading(false);
    }
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
