export const api = import.meta.env.VITE_BACKEND_API;
export const API_URL = `http://${api}`;
export const SOCKET_URL = `ws://${api}`;
export const DEFAULT_LANGUAGE = "Python (3.8.1)";
export const DEFAULT_CODE = "print('hello')";
export const DEFAULT_THEME = "Monokai";
export const DEFAULT_TAB_SIZE = 4;
export const DEFAULT_FONT_SIZE = 14;
export const DEFAULT_WORD_WRAP = true;
export const SUPABASE_PROJECT_URL = import.meta.env.VITE_SUPABASE_PROJECT_URL;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
export const LANGUAGE_MAPPING = {
  "Bash (5.0.0)": {
    id: 46,
    monacoLanguage: "shell",
  },
  "Basic (FBC 1.07.1)": {
    id: 47,
    monacoLanguage: "vb",
  },
  "C (Clang 18.1.8)": {
    id: 104,
    monacoLanguage: "cpp",
  },
  "C (Clang 7.0.1)": {
    id: 75,
    monacoLanguage: "cpp",
  },
  "C (GCC 14.1.0)": {
    id: 103,
    monacoLanguage: "cpp",
  },
  "C (GCC 7.4.0)": {
    id: 48,
    monacoLanguage: "cpp",
  },
  "C (GCC 8.3.0)": {
    id: 49,
    monacoLanguage: "cpp",
  },
  "C (GCC 9.2.0)": {
    id: 50,
    monacoLanguage: "cpp",
  },
  "C++ (Clang 7.0.1)": {
    id: 76,
    monacoLanguage: "cpp",
  },
  "C++ (GCC 14.1.0)": {
    id: 105,
    monacoLanguage: "cpp",
  },
  "C++ (GCC 7.4.0)": {
    id: 52,
    monacoLanguage: "cpp",
  },
  "C++ (GCC 8.3.0)": {
    id: 53,
    monacoLanguage: "cpp",
  },
  "C++ (GCC 9.2.0)": {
    id: 54,
    monacoLanguage: "cpp",
  },
  "C# (Mono 6.6.0.161)": {
    id: 51,
    monacoLanguage: "csharp",
  },
  "Clojure (1.10.1)": {
    id: 86,
    monacoLanguage: "clojure",
  },
  "Dart (2.19.2)": {
    id: 90,
    monacoLanguage: "dart",
  },
  "Elixir (1.9.4)": {
    id: 57,
    monacoLanguage: "elixir",
  },
  "F# (.NET Core SDK 3.1.202)": {
    id: 87,
    monacoLanguage: "fsharp",
  },
  "Go (1.13.5)": {
    id: 60,
    monacoLanguage: "go",
  },
  "Go (1.18.5)": {
    id: 95,
    monacoLanguage: "go",
  },
  "Java (JDK 17.0.6)": {
    id: 91,
    monacoLanguage: "java",
  },
  "Java (OpenJDK 13.0.1)": {
    id: 62,
    monacoLanguage: "java",
  },
  "JavaFX (JDK 17.0.6, OpenJFX 22.0.2)": {
    id: 96,
    monacoLanguage: "java",
  },
  "JavaScript (Node.js 12.14.0)": {
    id: 63,
    monacoLanguage: "javascript",
  },
  "JavaScript (Node.js 18.15.0)": {
    id: 93,
    monacoLanguage: "javascript",
  },
  "JavaScript (Node.js 20.17.0)": {
    id: 97,
    monacoLanguage: "javascript",
  },
  "JavaScript (Node.js 22.08.0)": {
    id: 102,
    monacoLanguage: "javascript",
  },
  "Kotlin (1.3.70)": {
    id: 78,
    monacoLanguage: "kotlin",
  },
  "Lua (5.3.5)": {
    id: 64,
    monacoLanguage: "lua",
  },
  "Objective-C (Clang 7.0.1)": {
    id: 79,
    monacoLanguage: "objective-c",
  },
  "PHP (7.4.1)": {
    id: 68,
    monacoLanguage: "php",
  },
  "PHP (8.3.11)": {
    id: 98,
    monacoLanguage: "php",
  },
  "Pascal (FPC 3.0.4)": {
    id: 67,
    monacoLanguage: "pascal",
  },
  "Perl (5.28.1)": {
    id: 85,
    monacoLanguage: "perl",
  },
  "Python (2.7.17)": {
    id: 70,
    monacoLanguage: "python",
  },
  "Python (3.11.2)": {
    id: 92,
    monacoLanguage: "python",
  },
  "Python (3.12.5)": {
    id: 100,
    monacoLanguage: "python",
  },
  "Python (3.8.1)": {
    id: 71,
    monacoLanguage: "python",
  },
  "R (4.0.0)": {
    id: 80,
    monacoLanguage: "r",
  },
  "R (4.4.1)": {
    id: 99,
    monacoLanguage: "r",
  },
  "Ruby (2.7.0)": {
    id: 72,
    monacoLanguage: "ruby",
  },
  "Rust (1.40.0)": {
    id: 73,
    monacoLanguage: "rust",
  },
  "SQL (SQLite 3.27.2)": {
    id: 82,
    monacoLanguage: "sql",
  },
  "Scala (2.13.2)": {
    id: 81,
    monacoLanguage: "scala",
  },
  "Swift (5.2.3)": {
    id: 83,
    monacoLanguage: "swift",
  },
  "TypeScript (3.7.4)": {
    id: 74,
    monacoLanguage: "typescript",
  },
  "TypeScript (5.0.3)": {
    id: 94,
    monacoLanguage: "typescript",
  },
  "TypeScript (5.6.2)": {
    id: 101,
    monacoLanguage: "typescript",
  },
  "Visual Basic.Net (vbnc 0.0.0.5943)": {
    id: 84,
    monacoLanguage: "vb",
  },
};

export const STATUS_MAPPING = {
  1: "In Queue",
  2: "Processing",
  3: "Successful",
  4: "Wrong Answer",
  5: "Time Limit Exceeded",
  6: "Compilation Error",
  7: "Runtime Error (SIGSEGV)",
  8: "Runtime Error (SIGXFSZ)",
  9: "Runtime Error (SIGFPE)",
  10: "Runtime Error (SIGABRT)",
  11: "Runtime Error (NZEC)",
  12: "Runtime Error (Other)",
  13: "Internal Error",
  14: "Exec Format Error",
};

export const COLORS = [
  "#2196F3", // Vibrant blue
  "#FF5722", // Deep orange
  "#4CAF50", // Fresh green
  "#9C27B0", // Rich purple
  "#FFC107", // Warm amber
  "#607D8B", // Cool blue-gray
  "#E91E63", // Pink rose
  "#00BCD4", // Turquoise
  "#8BC34A", // Lime green
  "#FF9800", // Orange
  "#795548", // Warm brown
  "#3F51B5", // Indigo
  "#009688", // Teal
  "#FFEB3B", // Yellow
  "#673AB7", // Deep purple
  "#F44336", // Red
  "#03A9F4", // Light blue
  "#4DB6AC", // Seafoam
  "#FFA726", // Soft orange
  "#5C6BC0", // Muted blue
];

export const THEME_LIST = [
  "Active4D",
  "All Hallows Eve",
  "Amy",
  "Birds of Paradise",
  "Blackboard",
  "Brilliance Black",
  "Brilliance Dull",
  "Chrome DevTools",
  "Clouds Midnight",
  "Clouds",
  "Cobalt",
  "Cobalt2",
  "Dawn",
  "Dracula",
  "Dreamweaver",
  "Eiffel",
  "Espresso Libre",
  "GitHub Dark",
  "GitHub Light",
  "GitHub",
  "IDLE",
  "Katzenmilch",
  "Kuroir Theme",
  "LAZY",
  "MagicWB (Amiga)",
  "Merbivore Soft",
  "Merbivore",
  "Monokai Bright",
  "Monokai",
  "Night Owl",
  "Nord",
  "Oceanic Next",
  "Pastels on Dark",
  "Slush and Poppies",
  "Solarized-dark",
  "Solarized-light",
  "SpaceCadet",
  "Sunburst",
  "Textmate (Mac Classic)",
  "Tomorrow-Night-Blue",
  "Tomorrow-Night-Bright",
  "Tomorrow-Night-Eighties",
  "Tomorrow-Night",
  "Tomorrow",
  "Twilight",
  "Upstream Sunburst",
  "Vibrant Ink",
  "Xcode",
  "Zenburnesque",
];
