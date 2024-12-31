/* eslint-disable react/prop-types */
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useAuthContext } from "../contexts/AuthContext";
import { THEME_LIST } from "../lib/constants";
import supabase from "../lib/supabase";
import toast from "react-hot-toast";
import InputField from "./InputField";
import DropDownMenuButton from "./DropDownMenuButton";
import DefaultButton from "./DefaultButton";
import { Minus, Plus } from "lucide-react";
import { useStatesContext } from "../contexts/StatesContext";
import { logError, logInfo } from "../lib/logging";

const Settings = ({ close }) => {
  const [userSettings, setUserSettings] = useState(true);
  const { userData, setUserData } = useAuthContext();
  const [name, setName] = useState(userData.name);
  const [color, setColor] = useState(userData.color);
  const [theme, setTheme] = useState(userData.theme);
  const [tabSize, setTabSize] = useState(userData.tab_size);
  const [fontSize, setFontSize] = useState(userData.font_size);
  const [wordWrap, setWordWrap] = useState(userData.word_wrap);
  const { isSignedIn } = useAuthContext();
  const { setMainLoading, clearConnectionsAndOpenDefault } = useStatesContext();

  const handleSignOut = () => {
    const signOut = async () => {
      close();
      setMainLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        logError("error signing out: ", error);
        toast.error("Error signing out.");
      } else {
        toast.success("Signed out successfully");
        clearConnectionsAndOpenDefault();
      }
      setMainLoading(false);
    };
    signOut();
  };

  const handleSave = async () => {
    const newData = {
      name: name,
      color: color,
      theme: theme,
      tab_size: tabSize,
      font_size: fontSize,
      word_wrap: wordWrap,
    };
    if (!(name.length > 0 && name.length <= 50)) {
      toast.error("length of user's name should between 1 and 50.");
      return;
    }
    close();
    setMainLoading(true);
    const { data, error } = await supabase
      .from("user_info")
      .update(newData)
      .eq("id", userData.id)
      .select();
    if (error) {
      logError(error);
      toast.error("Error in saving settings, Please try again.");
    } else {
      logInfo(data);
      setUserData(data[0]);
      toast.success("Changes applied successfully");
      close();
    }
    setMainLoading(false);
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
    <div className="w-96 h-[500px] bg-color1 flex flex-col rounded-lg">
      <div className="flex flex-row mb-2 cursor-pointer">
        <div
          className={
            "flex-1 flex justify-center text-xl p-2 font-semibold border-2 border-color2 " +
            (userSettings ? "bg-color2 text-color1" : "bg-color1")
          }
          onClick={() => setUserSettings(true)}
        >
          User
        </div>
        <div
          className={
            "flex-1 flex justify-center text-xl p-2 font-semibold border-2 border-color2 " +
            (userSettings ? "bg-color1" : "bg-color2 text-color1")
          }
          onClick={() => setUserSettings(false)}
        >
          Editor
        </div>
      </div>
      {userSettings ? (
        <div className="flex flex-col mb-2 gap-2">
          <div className="flex flex-col gap-1">
            <div className="text-slate-400 font-normal">Name</div>
            <InputField
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={userData?.name}
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-slate-400 font-normal">Color</div>
            <HexColorPicker color={color} onChange={setColor} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col mb-2 gap-2">
          <div className="flex flex-col gap-1">
            <div className="text-slate-400 font-normal">Theme</div>
            <div>
              <DropDownMenuButton
                value={theme}
                onChange={setTheme}
                options={THEME_LIST.map((theme) => theme.replaceAll("-", " "))}
                style={{
                  borderLeftColor: "#6272A4",
                  borderLeftWidth: "2px",
                  fontSize: "1.125rem",
                  lineHeight: "1.75rem",
                }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-slate-400 font-normal">Tab size</div>
            <DropDownMenuButton
              value={tabSize}
              onChange={setTabSize}
              options={[2, 4, 8]}
              style={{
                borderLeftColor: "#6272A4",
                borderLeftWidth: "2px",
                fontSize: "1.125rem",
                lineHeight: "1.75rem",
              }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-slate-400 font-normal">Font size</div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (fontSize > 10) setFontSize(fontSize - 1);
                }}
                className="text-xl font-bold border-2 border-color2 bg-color1 hover:bg-color2 hover:text-color1 px-2 py-2"
              >
                <Minus size={21} />
              </button>
              <span className="text-lg text-center border-2 border-color2 bg-color1 px-2 py-1">
                {fontSize}
              </span>
              <button
                onClick={() => {
                  if (fontSize < 50) setFontSize(fontSize + 1);
                }}
                className="text-xl font-bold border-2 border-color2 bg-color1 hover:bg-color2 hover:text-color1 px-2 py-2"
              >
                <Plus size={21} />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-slate-400 font-normal">Word wrap</div>
            <div className="flex flex-row gap-2">
              <div className="flex flex-row gap-2">
                <input
                  type="radio"
                  name="word_wrap"
                  value={true}
                  checked={wordWrap === true}
                  onChange={() => setWordWrap(true)}
                />
                <span className="text-lg">On</span>
              </div>
              <div className="flex flex-row gap-2">
                <input
                  type="radio"
                  name="word_wrap"
                  value={false}
                  checked={wordWrap === false}
                  onChange={() => setWordWrap(false)}
                />
                <span className="text-lg">Off</span>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-row justify-between gap-2 mt-auto">
        <DefaultButton text="Save" onClick={handleSave} />
        {isSignedIn && (
          <DefaultButton text="Sign Out" onClick={handleSignOut} />
        )}
      </div>
    </div>
  );
};

export default Settings;
