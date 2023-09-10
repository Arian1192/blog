"use client";
import { ReactElement } from "react";
import { PrismAsyncLight as SY } from "react-syntax-highlighter";

import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { Config, DriveStep, PopoverDOM } from "driver.js";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

type CodeExampleProps = {
  children: ReactElement;
  language: string;
  heading?: string;
  config?: Config;
  highlight?: DriveStep;
  id?: string;
  className?: string;
  buttonText?: string;
  tour?: DriveStep[];
};

export function removeDummyElement() {
  const el = document.querySelector(".dynamic-el");
  if (el) {
    el.remove();
  }
}

export function mountDummyElement() {
  const newDiv = (document.querySelector(".dynamic-el") ||
    document.createElement("div")) as HTMLElement;

  newDiv.innerHTML = "This is a new Element";
  newDiv.style.display = "block";
  newDiv.style.padding = "20px";
  newDiv.style.backgroundColor = "black";
  newDiv.style.color = "black";
  newDiv.style.fontSize = "25px";
  newDiv.style.position = "fixed";
  newDiv.style.top = `${Math.random() * (500 - 30) + 30}px`;
  newDiv.style.left = `${Math.random() * (500 - 30) + 30}px`;
  newDiv.className = "dynamic-el";

  document.body.appendChild(newDiv);
}

function attachFirstButton(popover: PopoverDOM) {
  const firstButton = document.createElement("button");
  firstButton.innerText = "Go to First";
  popover.footerButtons.appendChild(firstButton);
  firstButton.addEventListener("click", () => {
    popover.nextButton.click();
  });
}

export const CodeExample = (props: CodeExampleProps) => {
  const {
    language,
    children,
    heading,
    id,
    buttonText = "Como va la vaina esta??",
    config,
    tour,
  } = props;
  const code = children.props.children.props.children;

  function onClick() {
    if (tour) {
      const code = document.querySelector("code");
      if (code) {
        for (let i = 0; i < code.children.length; i++) {
          code.children[i].classList.add("nth-child" + i);
        }
      }

      const driverObj = driver({
        ...config,
        steps: tour,
      });
      driverObj.drive();
    }
  }

  return (
    <div id={id}>
      {heading && (
        <p className="text-lg -mt-0 font-medium text-white -mb-3 rounded-md">
          {heading}
        </p>
      )}
      <SY language={language} style={atomDark} wrapLines>
        {code}
      </SY>
      <button
        onClick={onClick}
        className="w-full rounded-md  p-2 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 text-black font-medium"
      >
        {buttonText}
      </button>
    </div>
  );
};
