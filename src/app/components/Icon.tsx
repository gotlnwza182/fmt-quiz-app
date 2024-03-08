import React, { useContext } from "react";
import Image from "next/image";
import { appStateContext } from "../page";
import questionType from "../models/questionType";

type Props = {
  title: string;
  questionData: questionType[];
  width?: number;
  heigth?: number;
};

export default function Icon({
  title,
  questionData,
  width = 32.5,
  heigth = 25,
}: Props) {
  const { appState } = useContext(appStateContext);

  function iconBg(title: string) {
    switch (title) {
      case "HTML":
        return "bg-[#FFF1E9]";
      case "CSS":
        return "bg-[#E0FDEF]";
      case "JavaScript":
        return "bg-[#EBF0FF]";
      case "Accessibility":
        return "bg-[#F6E7FF]";
      default:
        return "none";
    }
  }
  function iconPicture() {
    switch (title) {
      case "HTML":
        return questionData[0].icon;
      case "CSS":
        return questionData[1].icon;
      case "JavaScript":
        return questionData[2].icon;
      case "Accessibility":
        return questionData[3].icon;
      default:
        return "";
    }
  }
  return (
    <div>
      <div
        className={`w-10 h-10 md:w-14 md:h-14 flex justify-center items-center rounded-lg lg:ml-5 ${iconBg(
          title
        )} `}
      >
        <Image src={iconPicture()} alt={title} width={width} height={heigth} />
      </div>
    </div>
  );
}
