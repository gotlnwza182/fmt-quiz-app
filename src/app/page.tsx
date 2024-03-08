"use client";

import { useContext, useEffect, useState } from "react";
import Header from "./components/Header";
import Menu from "./components/Menu";
import data from "./data/data.json";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import { AppStateContext } from "./management/context";

export default function Home() {
  const { appState, setAppState, isDark, setIsDark } =
    useContext(AppStateContext);
  const [result, setResult] = useState(0);
  const [quiz, setQuiz] = useState(0);

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
      <Header questionData={questionsData} />
      {appState.type === "menu" && <Menu questionData={questionsData} />}
      {appState.type === "quiz" && (
        <Quiz questionData={questionsData} setResult={setResult} quiz={quiz} />
      )}
      {appState.type === "result" && (
        <Result questionData={questionsData} result={result} quiz={quiz} />
      )}
    </main>
  );
}
