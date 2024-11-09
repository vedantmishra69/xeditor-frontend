import { useState } from "react";
import { useCodeContext } from "../contexts/CodeEditorContext";
import { LANGUAGE_MAPPING, STATUS_MAPPING } from "../lib/constants";
import { copyToClipboard, fetchResult, submitCode } from "../lib/util";
import CodeEditor from "../components/CodeEditor";
import toast from "react-hot-toast";
import ChatWindow from "../components/ChatWindow";
import { useAuthContext } from "../contexts/AuthContext";
import { useChatContext } from "../contexts/ChatContext";
import { GoogleLogin } from "@react-oauth/google";

const CodeEditorPage = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [time, setTime] = useState("");
  const [memory, setMemory] = useState("");
  const [status, setStatus] = useState("");
  const [joinToken, setJoinToken] = useState("");
  const { language, setLanguage, sourceCode, setSourceCode } = useCodeContext();
  const { setMessageList } = useChatContext();
  const {
    docName,
    setDocName,
    handleSignInWithGoogle,
    handleSignOut,
    isSignedIn,
    name,
  } = useAuthContext();

  const handleInput = (e) => setInput(e.target.value);

  const handleJoin = (e) => setJoinToken(e.target.value);

  const handleLanguage = (name) => {
    setLanguage(name);
    setInput("");
    setOutput("");
    setSourceCode("");
    setTime("");
    setMemory("");
    setStatus("");
  };

  const handleSubmit = async () => {
    if (sourceCode) {
      setOutput("Loading...");
      setTime("");
      setMemory("");
      setStatus("");
      const data = await submitCode(language, sourceCode, input);
      if (!data.error && data.token) {
        const result = await fetchResult(data.token);
        console.log(data.token);
        if (result) {
          setOutput(
            `${result.stdout + "\n" && result.stdout}${
              (result.compile_output || result.stderr + "\n") &&
              (result.compile_output || result.stderr)
            }\n${
              result.exit_code !== null
                ? `Program finished with exit code ${result.exit_code}.`
                : ""
            }`
          );
          setTime(result.time);
          setMemory(result.memory);
          setStatus(result.status_id);
        }
      }
    }
  };

  const handleTokenSubmit = () => {
    if (joinToken) {
      setDocName(joinToken);
      setInput("");
      setOutput("");
      setTime("");
      setMemory("");
      setStatus("");
      setMessageList([]);
      setJoinToken("");
      toast.success("Room joined successfully.");
    }
  };

  const handleInvite = async () => {
    const response = await copyToClipboard(docName);
    toast.success(response.message);
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
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex justify-center p-4">
          <CodeEditor />
        </div>
        <div className="flex-1">
          <ChatWindow />
        </div>
      </div>
      <div className="flex-1 h-screen flex flex-col p-4">
        <div className="flex-1 space-y-4 flex flex-col">
          <div className="flex-1 w-full max-w-3xl flex flex-col">
            <label className="block text-gray-700 font-semibold mb-2">
              Input
            </label>
            <textarea
              value={input}
              onChange={handleInput}
              className="w-full flex-1 p-2 bg-white border border-gray-300 resize-none rounded-lg"
              placeholder="Provide input if needed..."
            ></textarea>
          </div>

          <div className="flex-1 w-full max-w-3xl flex flex-col">
            <div className="flex flex-row justify-between">
              <label className="text-gray-700 font-semibold mb-2">Output</label>
              <div
                className={
                  (status === 3 ? "text-green-500" : "text-red-500") +
                  " font-semibold mb-2"
                }
              >
                {STATUS_MAPPING[status]}
              </div>
            </div>
            <textarea
              value={output}
              className="w-full flex-1 p-2 bg-white border border-gray-300 resize-none rounded-lg"
              placeholder="Output will be displayed here..."
              readOnly
            ></textarea>
          </div>
        </div>

        <div className="w-full flex flex-row p-2 gap-2">
          <div>{time ? `Time: ${time}s` : ""}</div>
          <div>{memory ? `Memory: ${memory}kB` : ""}</div>
        </div>

        <div className="w-full flex flex-row gap-2 mb-2">
          <button
            onClick={handleInvite}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg"
          >
            Invite
          </button>
          <input
            type="text"
            value={joinToken}
            onChange={handleJoin}
            placeholder="Enter invite token here..."
            className="flex-1 bg-white border border-gray-300 rounded-lg p-2 w-1/2"
          />
          <button
            onClick={handleTokenSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg"
          >
            Join
          </button>
          {isSignedIn ? (
            <div className="flex flex-row gap-2">
              <div className="text-xl font-semibold">{name}</div>
              <button
                onClick={handleSignOut}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <GoogleLogin
              onSuccess={handleSignInWithGoogle}
              onError={() => {
                console.log("Login Failed");
              }}
              context="signin"
              ux_mode="popup"
              type="standard"
              shape="rectangular"
              theme="outline"
              text="signin"
              size="large"
              logo_alignment="left"
              use_fedcm_for_prompt
            />
          )}
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
