import React, { createContext, useState, useEffect } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  // Debug effect to track showResult changes
  useEffect(() => {
    console.log("showResult changed:", showResult);
  }, [showResult]);

  const onSent = async () => {
    if (!input.trim()) return; // Don't send empty prompts
    
    try {
      setLoading(true);
      // Important: Only set showResult to true, don't set it to false
      const response = await runChat(input);
      setResultData(response);
      setRecentPrompt(input);
      setShowResult(true); // This ensures we stay in result view
      setInput("");
      setLoading(false);

      // Optional: Add the prompt to previous prompts history
      setPrevPrompts(prev => [...prev, input]);
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
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    setShowResult, // Make sure this is included
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