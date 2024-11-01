import { useState } from "react";
import EditorComponent from "../components/EditorComponent";
import { useCodeContext } from "../contexts/CodeEditorContext";
import { LANGUAGE_MAPPING } from "../lib/constants";
import { fetchResult, submitCode } from "../lib/util";

const CodeEditorPage = () => {
  const [stdin, setStdin] = useState("");
  const [stdout, setStdout] = useState("");
  const [stderr, setStderr] = useState("");
  const { language, setLanguage, sourceCode, setSourceCode } = useCodeContext();

  const handleStdin = (e) => setStdin(e.target.value);
  const handleLanguage = (name) => {
    setLanguage(name);
    setStdin("");
    setStdout("");
    setStderr("");
    setSourceCode("");
  };
  const handleSubmit = async () => {
    if (sourceCode) {
      setStdout("Loading...");
      const data = await submitCode(language, sourceCode, stdin);
      if (!data.error && data.token) {
        const result = await fetchResult(data.token);
        if (result) {
          setStdout(result.stdout);
          setStderr(result.stderr);
        } else setStdout("Error");
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
    <div className="min-h-screen bg-gray-100 p-8 flex flex-row justify-between">
      <div className="w-full flex justify-center m-4">
        <EditorComponent />
      </div>
      <div className="w-full flex-col content-center">
        <div className="w-full max-w-3xl mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="stdin"
          >
            Stdin
          </label>
          <textarea
            id="stdin"
            value={stdin}
            onChange={handleStdin}
            className="w-full h-20 p-4 bg-white border border-gray-300 rounded-lg resize-none"
            placeholder="Provide input if needed..."
          ></textarea>
        </div>

        <div className="w-full max-w-3xl mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="stdout"
          >
            Stdout
          </label>
          <textarea
            id="stdout"
            value={stdout}
            className="w-full h-20 p-4 bg-white border border-gray-300 rounded-lg resize-none"
            placeholder="Output will be displayed here..."
            readOnly
          ></textarea>
        </div>

        <div></div>

        <div className="w-full max-w-3xl mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="stderr"
          >
            Stderr
          </label>
          <textarea
            id="stderr"
            value={stderr}
            className="w-full h-20 p-4 bg-white border border-gray-300 rounded-lg resize-none"
            placeholder="Error will be displayed here..."
            readOnly
          ></textarea>
        </div>

        <div className="w-full max-w-3xl mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="language"
          >
            Language
          </label>
          <select
            id="language"
            defaultValue={language}
            className="w-full p-3 bg-white border border-gray-300 rounded-lg"
            required
          >
            {languageOptions}
          </select>
        </div>

        <div className="w-full max-w-3xl flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeEditorPage;
