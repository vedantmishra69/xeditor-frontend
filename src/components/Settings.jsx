/* eslint-disable react/prop-types */
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useAuthContext } from "../contexts/AuthContext";
import { THEME_LIST } from "../lib/constants";
import supabase from "../lib/supabase";

const Settings = ({ close }) => {
  const [userSettings, setUserSettings] = useState(true);
  const { userData, setUserData } = useAuthContext();
  const [name, setName] = useState(userData.name);
  const [color, setColor] = useState(userData.color);
  const [theme, setTheme] = useState(userData.theme);
  const [tabSize, setTabSize] = useState(userData.tab_size);
  const [fontSize, setFontSize] = useState(userData.font_size);
  const [wordWrap, setWordWrap] = useState(userData.word_wrap);

  const handleSave = async () => {
    const newData = {
      name: name,
      color: color,
      theme: theme,
      tab_size: tabSize,
      font_size: fontSize,
      word_wrap: wordWrap,
    };
    console.log(newData);
    const { data, error } = await supabase
      .from("user_info")
      .update(newData)
      .eq("id", userData.id)
      .select();
    if (error) console.log(error);
    else {
      console.log(data);
      setUserData(data[0]);
    }
  };

  const themeOptions = [];
  for (const theme in THEME_LIST) {
    const themeName = THEME_LIST[theme];
    themeOptions.push(
      <option key={themeName} value={themeName}>
        {themeName.replaceAll("-", " ")}
      </option>
    );
  }

  const tabOptions = [];
  for (let i = 1; i <= 3; i++) {
    tabOptions.push(
      <option
        key={i}
        value={Math.pow(2, i)}
        onClick={() => setTabSize(Math.pow(2, i))}
      >
        {Math.pow(2, i)}
      </option>
    );
  }

  return (
    <div className="w-96 h-[450px] bg-white flex flex-col rounded-lg">
      <div className="flex flex-row m-2 gap-2">
        <div
          className={
            "flex-1 flex justify-center text-xl p-2 rounded-lg font-semibold text-gray-600 " +
            (userSettings
              ? "bg-gray-300 border-gray-500 border-2"
              : "bg-gray-100")
          }
          onClick={() => setUserSettings(true)}
        >
          User
        </div>
        <div
          className={
            "flex-1 flex justify-center text-xl p-2 rounded-lg font-semibold text-gray-600 " +
            (userSettings
              ? "bg-gray-100"
              : "bg-gray-300 border-gray-500 border-2")
          }
          onClick={() => setUserSettings(false)}
        >
          Editor
        </div>
      </div>
      {userSettings ? (
        <div className="flex flex-col m-2 gap-2">
          <div className="flex flex-col gap-1">
            <div className="text-gray-500 font-normal">Name</div>
            <input
              placeholder={userData.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border-2 border-gray-400 rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-gray-500 font-normal">Color</div>
            <HexColorPicker color={color} onChange={setColor} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col m-2 gap-2">
          <div className="flex flex-col gap-1">
            <div className="text-gray-500 font-normal">Theme</div>
            <div>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="bg-white p-2 border-2 border-gray-200 rounded-lg w-1/2"
              >
                {themeOptions}
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-gray-500 font-normal">Tab size</div>
            <select
              defaultValue={tabSize}
              className="bg-white p-2 border-2 border-gray-200 rounded-lg w-1/2"
            >
              {tabOptions}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-gray-500 font-normal">Font size</div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (fontSize > 10) setFontSize(fontSize - 1);
                }}
                className="text-xl font-bold bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg"
              >
                -
              </button>
              <span className="font-medium text-center border-2 border-gray-200 px-2 py-1 rounded-lg">
                {fontSize}
              </span>
              <button
                onClick={() => {
                  if (fontSize < 50) setFontSize(fontSize + 1);
                }}
                className="text-xl font-bold bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg"
              >
                +
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-gray-500 font-normal">Word wrap</div>
            <div className="flex flex-row gap-2">
              <div className="flex flex-row gap-2">
                <input
                  type="radio"
                  name="word_wrap"
                  value={true}
                  checked={wordWrap === true}
                  onChange={() => setWordWrap(true)}
                />
                <span>On</span>
              </div>
              <div className="flex flex-row gap-2">
                <input
                  type="radio"
                  name="word_wrap"
                  value={false}
                  checked={wordWrap === false}
                  onChange={() => setWordWrap(false)}
                />
                <span>Off</span>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-row justify-end gap-2 m-2 mt-auto">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg"
          onClick={close}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Settings;
