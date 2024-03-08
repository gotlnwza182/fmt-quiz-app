import React, { useContext } from "react";
import Image from "next/image";
import { AppStateContext } from "../management/context";
import questionType from "../models/questionType";
import Icon from "./Icon";

type Props = { questionData: questionType[] };

export default function Header({ questionData }: Props) {
  const { appState, isDark, setIsDark } = useContext(AppStateContext);

  function darkMode() {
    if (isDark) {
      setIsDark(false);
      document.querySelector("html")?.classList.remove("dark");
    } else {
      setIsDark(true);
      document.querySelector("html")?.classList.add("dark");
    }
  }

  return (
    <header className="flex justify-between items-center my-20">
      <div className="flex items-center justify-start">
        {appState.type === "menu" ? (
          ""
        ) : (
          <Icon title={appState.title} questionData={questionData} />
        )}
        <h1 className="ml-4 text-xl font-semibold dark:text-white">
          {appState.type === "menu" ? "" : appState.title}
        </h1>
      </div>
      <div className="flex justify-center items-center">
        <span>
          <Image
            src={
              !isDark
                ? "./images/icon-sun-dark.svg"
                : "./images/icon-sun-light.svg"
            }
            alt={"moon-icon"}
            width={18}
            height={18}
          />
        </span>
        <input
          type="checkbox"
          id="check"
          className="peer hidden"
          onChange={() => darkMode()}
        />
        <label
          htmlFor="check"
          className=" w-12 h-7 bg-p-Purple rounded-full cursor-pointer relative before:w-5 before:h-5 before:bg-white before:content-[''] before:absolute before:m-1 before:rounded-full before:transition before:peer-checked:translate-x-5 mx-4"
        ></label>
        <span>
          <Image
            src={
              !isDark
                ? "./images/icon-moon-dark.svg"
                : "./images/icon-moon-light.svg"
            }
            alt={"moon-icon"}
            width={18}
            height={18}
          />
        </span>
      </div>
    </header>
  );
}
