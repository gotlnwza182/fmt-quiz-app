import React, { useContext } from "react";
import questionType from "../models/questionType";
import { appStateContext } from "../page";
import Icon from "./Icon";

type Props = { questionData: questionType[] };

export default function Question({ questionData }: Props) {
  const { appState, setAppState } = useContext(appStateContext);

  return (
    <div className="flex flex-col lg:flex-row justify-between">
      <div>
        <h1 className="text-4xl md:text-6xl font-light text-Dark-Navy dark:text-white">
          Welcome to the <span className="block font-bold">Frontend Quiz!</span>
        </h1>
        <p className=" text-Gray-Navy lg:text-Light-Bluish mt-5 mb-16 lg:mt-16 text-xl">
          Pick a subject to get started.
        </p>
      </div>
      <div>
        {questionData.map((question, index) => (
          <button
            key={index}
            onClick={() => {
              setAppState({ type: "quiz", title: question.title });
            }}
            className=" w-[375px] h-16 md:w-[640px] md:h-20 lg:w-[564px] lg:h-24 flex items-center mb-6 rounded-xl lg:rounded-3xl bg-white shadow-[0_16px_40px_0_rgba(143,160,193,0.14)] px-3 dark:bg-p-Navy dark:text-white dark:shadow-[0_16px_40px_0_rgba(49,62,81,0.14)]"
          >
            <Icon
              title={question.title}
              questionData={questionData}
              width={25}
            />

            <h1 className="pl-5 text-xl md:text-2xl font-semibold">
              {question.title}
            </h1>
          </button>
        ))}
      </div>
    </div>
  );
}
