import { useState } from "react";
import EditorComponent from "../components/EditorComponent";
import { useCodeContext } from "../contexts/CodeEditorContext";
import { LANGUAGE_MAPPING } from "../lib/constants";

const CodeEditorPage = () => {
  const [stdin, setStdin] = useState("");
  const [stdout, setStdout] = useState("");
  const { language, setLanguage } = useCodeContext();

  const handleStdin = (e) => setStdin(e.target.value);
  const handleStdout = (e) => setStdout(e.target.value);

  const languageOptions = [];
  for (const name in LANGUAGE_MAPPING) {
    languageOptions.push(
      <option key={name} value={name} onClick={() => setLanguage(name)}>
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
            onChange={handleStdout}
            className="w-full h-20 p-4 bg-white border border-gray-300 rounded-lg resize-none"
            placeholder="Output will be displayed here..."
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
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeEditorPage;
