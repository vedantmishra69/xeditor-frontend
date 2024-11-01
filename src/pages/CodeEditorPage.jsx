import { useState } from "react";
import EditorComponent from "../components/EditorComponent";
import { useCodeContext } from "../contexts/CodeEditorContext";
import { LANGUAGE_MAPPING } from "../lib/constants";
import { fetchResult, submitCode } from "../lib/util";

const CodeEditorPage = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [time, setTime] = useState("");
  const [memory, setMemory] = useState("");
  const { language, setLanguage, sourceCode, setSourceCode } = useCodeContext();

  const handleInput = (e) => setInput(e.target.value);
  const handleLanguage = (name) => {
    setLanguage(name);
    setInput("");
    setOutput("");
    setSourceCode("");
    setTime("");
    setMemory("");
  };

  const handleSubmit = async () => {
    if (sourceCode) {
      setOutput("Loading...");
      setTime("");
      setMemory("");
      const data = await submitCode(language, sourceCode, input);
      if (!data.error && data.token) {
        const result = await fetchResult(data.token);
        if (result) {
          setOutput(
            `${result.stdout + "\n"}${
              result.compile_output || result.stderr + "\n"
            }Program finished with exit code ${result.exit_code}.`
          );
          setTime(result.time);
          setMemory(result.memory);
        }
      }
    }
  };

  const languageOptions = [];
  for (const name in LANGUAGE_MAPPING) {
    languageOptions.push(
      <option key={name} value={name} onClick={() => handleLanguage(name)}>
        {name}
      </option>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-row justify-between">
      <div className="flex-1 flex justify-center p-4">
        <EditorComponent />
      </div>
      <div className="flex-1 h-screen flex flex-col p-4">
        <div className="flex-1 space-y-4 flex flex-col mb-2">
          <div className="flex-1 w-full max-w-3xl flex flex-col">
            <label className="block text-gray-700 font-semibold mb-2">
              Input
            </label>
            <textarea
              value={input}
              onChange={handleInput}
              className="w-full flex-1 p-2 bg-white border border-gray-300 resize-none"
              placeholder="Provide input if needed..."
            ></textarea>
          </div>
          <div className="flex-1 w-full max-w-3xl flex flex-col">
            <label className="block text-gray-700 font-semibold mb-2">
              Output
            </label>
            <textarea
              value={output}
              className="w-full flex-1 p-2 bg-white border border-gray-300 resize-none"
              placeholder="Output will be displayed here..."
              readOnly
            ></textarea>
          </div>
        </div>
        <div className="w-full flex flex-row p-2 gap-2">
          <div>{time ? `Time: ${time}s` : ""}</div>
          <div>{memory ? `Memory: ${memory}kB` : ""}</div>
        </div>
        <div className="mt-auto w-full max-w-3xl">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Language
            </label>
            <select
              defaultValue={language}
              className="w-full p-3 bg-white border border-gray-300 rounded-lg"
              required
            >
              {languageOptions}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditorPage;
