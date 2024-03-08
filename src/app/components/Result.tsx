import React, { useContext } from "react";
import questionType from "../models/questionType";
import Icon from "./Icon";
import { AppStateContext } from "../management/context";

type Props = { questionData: questionType[]; result: number; quiz: number };

export default function Result({ questionData, result, quiz }: Props) {
  const { appState, setAppState } = useContext(AppStateContext);

  function playAgain() {
    setAppState({ type: "menu", title: "" });
  }

  return (
    <div className="flex justify-between flex-col lg:flex-row">
      <div className="mb-10 lg:mb-0">
        <h1 className="text-4xl md:text-6xl font-light text-Dark-Navy dark:text-white">
          Quiz completed
          <span className="block font-semibold">You scored...</span>
        </h1>
      </div>
      <div>
        <div className="py-8 lg:py-0 lg:w-[564px] lg:h-[388px] bg-white rounded-xl lg:rounded-3xl flex flex-col items-center justify-center shadow-[0_16px_40px_0_rgba(143,160,193,0.14)] dark:bg-p-Navy dark:shadow-[0_16px_40px_0_rgba(49,62,81,0.14)] dark:text-white">
          <div className="flex items-center">
            <Icon title={appState.title} questionData={questionData} />
            <h3 className="ml-6 text-2xl font-semibold">{appState.title}</h3>
          </div>
          <h1 className=" text-9xl font-bold my-8">{result}</h1>
          <p className=" text-Gray-Navy text-xl dark:text-Light-Bluish">
            out of {questionData[quiz].questions.length}
          </p>
        </div>
        <button
          onClick={() => playAgain()}
          className="w-[375px] h-16 md:w-[640px] md:h-20 lg:w-[564px] lg:h-24 flex  items-center justify-center mt-6 rounded-3xl relative bg-p-Purple text-white font-semibold text-2xl shadow-[0_16px_40px_0_rgba(143,160,193,0.14)] cursor-pointer hover:opacity-50 before:content-[''] before:block before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-3xl dark:hover:before:bg-white/50 dark:hover:opacity-100"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}
