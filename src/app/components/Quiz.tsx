"use client";

import React, { useContext, useEffect, useState } from "react";
import questionType from "../models/questionType";
import Image from "next/image";
import { AppStateContext } from "../management/context";

type Props = {
  questionData: questionType[];
  setResult: (newData: number) => void;
  quiz: number;
};

export default function Question({ questionData, setResult, quiz }: Props) {
  const { appState, setAppState } = useContext(AppStateContext);
  const [current, setCurrent] = useState<number>(0);
  const [answer, setAnswer] = useState("");
  const [total, setTotal] = useState(0);
  const [sendAnswer, setSendAnswer] = useState(false);
  const [error, setError] = useState(false);
  const [correct, setCorrect] = useState(false);

  function calPercentage() {
    const percentage: number =
      ((current + 1) / questionData[quiz].questions.length) * 100;
    return percentage;
  }

  function submitAnswer(e: React.FormEvent) {
    e.preventDefault();

    if (!sendAnswer) {
      if (!answer) {
        setError(true);
      } else if (answer === questionData[quiz].questions[current].answer) {
        setSendAnswer(true);
        setCorrect(true);
        setTotal(total + 1);
      } else {
        setSendAnswer(true);
      }
    } else {
      if (current + 1 < questionData[quiz].questions.length) {
        setSendAnswer(false);
        setCorrect(false);
        setAnswer("");
        setCurrent(current + 1);
      } else {
        setAppState({ ...appState, type: "result" });
        setResult(total);
        setTotal(0);
      }
    }
  }

  useEffect(() => {
    setError(false);
  }, [answer]);

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between">
        <div className=" relative w-[375px] h-[256px] mb-10 md:w-[640px] lg:w-[465px] lg:h-[452px]">
          <p className=" text-Gray-Navy mt-5 mb-4 lg:mb-10 text-md lg:mt-16 lg:text-xl dark:text-Light-Bluish">
            Question {[current + 1]} of {questionData[quiz].questions.length}
          </p>
          <h1 className="text-2xl md:text-4xl text-Dark-Navy font-medium dark:text-white">
            {questionData[quiz].questions[current].question}
          </h1>
          <div className=" absolute bottom-0 w-full h-4 bg-white dark:bg-p-Navy rounded-full flex items-center">
            <div
              className={`h-2 w-[${calPercentage()}%] bg-p-Purple rounded-full mx-1`}
            ></div>
          </div>
        </div>
        <form onSubmit={submitAnswer}>
          <div>
            {questionData[quiz].questions[current].options.map(
              (option, index) => (
                <div key={index}>
                  <label
                    htmlFor={`option${index}`}
                    className={`w-[375px] h-16 md:w-[640px] md:h-20 lg:w-[564px] lg:h-24 flex  items-center mb-6 rounded-xl lg:rounded-3xl relative bg-white shadow-[0_16px_40px_0_rgba(143,160,193,0.14)] cursor-pointer dark:bg-p-Navy group dark:shadow-[0_16px_40px_0_rgba(49,62,81,0.14)] has-[:checked]:border-p-Purple has-[:checked]:border-[3px] ${
                      sendAnswer &&
                      (correct
                        ? " has-[:checked]:border-[#26D782]"
                        : " has-[:checked]:border-p-Red")
                    } `}
                  >
                    <input
                      type="radio"
                      name={`question${current}`}
                      id={`option${index}`}
                      className="peer hidden"
                      value={option}
                      checked={answer === option}
                      onChange={(e) => {
                        setAnswer(e.target.value);
                      }}
                      disabled={sendAnswer}
                    />
                    <div
                      className={`w-10 h-10 md:w-14 md:h-14 flex justify-center items-center rounded-lg ml-5 bg-Light-Gray mr-6 group-hover:bg-[#F6E7FF] group-hover:text-p-Purple peer-checked:bg-p-Purple peer-checked:text-white dark:text-Gray-Navy dark:peer-checked:text-white ${
                        sendAnswer &&
                        (correct
                          ? "peer-checked:bg-[#26D782]"
                          : "peer-checked:bg-p-Red")
                      }`}
                    >
                      <h4 className=" text-lg md:text-2xl font-medium  ">
                        {index === 0 && "A"}
                        {index === 1 && "B"}
                        {index === 2 && "C"}
                        {index === 3 && "D"}
                      </h4>
                    </div>
                    <span className="font-semibold md:text-xl w-4/6 md:w-3/4 dark:text-white">
                      {option}
                    </span>
                    {sendAnswer &&
                      (correct ? (
                        <Image
                          src="./images/icon-correct.svg"
                          alt="correct-icon"
                          width={30}
                          height={30}
                          className={`absolute right-4 hidden peer-checked:block`}
                        />
                      ) : (
                        <Image
                          src="./images/icon-error.svg"
                          alt="incorrect-icon"
                          width={30}
                          height={30}
                          className=" absolute right-4 hidden peer-checked:block"
                        />
                      ))}
                    {sendAnswer &&
                      !correct &&
                      option ===
                        questionData[quiz].questions[current].answer && (
                        <Image
                          src="./images/icon-correct.svg"
                          alt="correct-icon"
                          width={30}
                          height={30}
                          className={`absolute right-4 `}
                        />
                      )}
                  </label>
                </div>
              )
            )}
            <button
              type="submit"
              className="w-[375px] h-16 md:w-[640px] md:h-20 lg:w-[564px] lg:h-24 relative bg-p-Purple rounded-xl md:rounded-3xl text-white cursor-pointer text-2xl font-medium hover:opacity-50 shadow-[0_16px_40px_0_rgba(143,160,193,0.14)]  before:content-[''] before:block before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-3xl dark:hover:before:bg-white/50 dark:hover:opacity-100"
            >
              {sendAnswer ? "Next Question" : "Submit Answer"}
            </button>
            <div
              className={`flex justify-center items-center mt-10 ${
                !error ? "hidden" : ""
              }`}
            >
              <Image
                src="./images/icon-error.svg"
                alt="icon-error"
                width={30}
                height={30}
              />
              <p className={`text-p-Red text-xl ml-2 `}>
                Please select an answer
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
