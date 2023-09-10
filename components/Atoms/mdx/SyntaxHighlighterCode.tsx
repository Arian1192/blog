"use client";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

export const SyntaxHighlighterCode = ({ code }: { code: string }) => {
  const codeString = code;

  return (
      <SyntaxHighlighter
        language="javascript"
        style={atomDark}
        customStyle={{}}
      >
        {codeString}
      </SyntaxHighlighter>
  );
};

export default SyntaxHighlighterCode;
