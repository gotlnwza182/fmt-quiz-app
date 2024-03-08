"use client";

import { createContext, useEffect, useState } from "react";
import Header from "./components/Header";
import Menu from "./components/Menu";
import data from "./data/data.json";
import Quiz from "./components/Quiz";
import Result from "./components/Result";

interface MyContextValue {
  appState: { type: string; title: string };
  setAppState: (newData: { type: string; title: string }) => void;
  isDark: boolean;
  setIsDark: (newData: boolean) => void;
}

const defaultValue: MyContextValue = {
  appState: { type: "", title: "" },
  setAppState: () => {},
  isDark: false,
  setIsDark: () => {},
};
export const appStateContext = createContext<MyContextValue>(defaultValue);

export default function Home() {
  const [appState, setAppState] = useState<{ type: string; title: string }>({
    type: "menu",
    title: "",
  });
  const [result, setResult] = useState(0);
  const [quiz, setQuiz] = useState(0);
  const [isDark, setIsDark] = useState(false);

  const questionsData = data.quizzes;

  function quizFrom() {
    switch (appState.title) {
      case "HTML":
        setQuiz(0);
        break;
      case "CSS":
        setQuiz(1);
        break;
      case "JavaScript":
        setQuiz(2);
        break;
      case "Accessibility":
        setQuiz(3);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    quizFrom();
  }, [appState.title]);

  return (
    <main className={`w-[375px] md:w-[640px] lg:w-[1160px] mx-auto my-0`}>
      <appStateContext.Provider
        value={{ appState, setAppState, isDark, setIsDark }}
      >
        <Header questionData={questionsData} />
        {appState.type === "menu" && <Menu questionData={questionsData} />}
        {appState.type === "quiz" && (
          <Quiz
            questionData={questionsData}
            setResult={setResult}
            quiz={quiz}
          />
        )}
        {appState.type === "result" && (
          <Result questionData={questionsData} result={result} quiz={quiz} />
        )}
      </appStateContext.Provider>
    </main>
  );
}
