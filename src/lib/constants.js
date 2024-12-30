export const api = import.meta.env.VITE_BACKEND_API;
export const API_URL = `https://${api}`;
export const SOCKET_URL = `wss://${api}`;
export const DEFAULT_LANGUAGE = "Python (3.8.1)";
export const DEFAULT_CODE = "";
export const DEFAULT_THEME = "Dracula";
export const DEFAULT_TAB_SIZE = 4;
export const DEFAULT_FONT_SIZE = 18;
export const DEFAULT_WORD_WRAP = true;
export const SUPABASE_PROJECT_URL = import.meta.env.VITE_SUPABASE_PROJECT_URL;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
export const LANGUAGE_MAPPING = {
  "C (Clang 7.0.1)": {
    id: 75,
    monacoLanguage: "cpp",
    extension: ".c",
  },
  "C++ (Clang 7.0.1)": {
    id: 76,
    monacoLanguage: "cpp",
    extension: ".cpp",
  },
  "C (GCC 7.4.0)": {
    id: 48,
    monacoLanguage: "cpp",
    extension: ".c",
  },
  "C++ (GCC 7.4.0)": {
    id: 52,
    monacoLanguage: "cpp",
    extension: ".cpp",
  },
  "C (GCC 8.3.0)": {
    id: 49,
    monacoLanguage: "cpp",
    extension: ".c",
  },
  "C++ (GCC 8.3.0)": {
    id: 53,
    monacoLanguage: "cpp",
    extension: ".cpp",
  },
  "C (GCC 9.2.0)": {
    id: 50,
    monacoLanguage: "cpp",
    extension: ".c",
  },
  "C++ (GCC 9.2.0)": {
    id: 54,
    monacoLanguage: "cpp",
    extension: ".cpp",
  },
  "Clojure (1.10.1)": {
    id: 86,
    monacoLanguage: "clojure",
    extension: ".clj",
  },
  "C# (Mono 6.6.0.161)": {
    id: 51,
    monacoLanguage: "csharp",
    extension: ".cs",
  },
  "Elixir (1.9.4)": {
    id: 57,
    monacoLanguage: "elixir",
    extension: ".ex",
  },
  "F# (.NET Core SDK 3.1.202)": {
    id: 87,
    monacoLanguage: "fsharp",
    extension: ".fs",
  },
  "Go (1.13.5)": {
    id: 60,
    monacoLanguage: "go",
    extension: ".go",
  },
  "Java (OpenJDK 13.0.1)": {
    id: 62,
    monacoLanguage: "java",
    extension: ".java",
  },
  "JavaScript (Node.js 12.14.0)": {
    id: 63,
    monacoLanguage: "javascript",
    extension: ".js",
  },
  "Kotlin (1.3.70)": {
    id: 78,
    monacoLanguage: "kotlin",
    extension: ".kt",
  },
  "Lua (5.3.5)": {
    id: 64,
    monacoLanguage: "lua",
    extension: ".lua",
  },
  "Objective-C (Clang 7.0.1)": {
    id: 79,
    monacoLanguage: "objective-c",
    extension: ".m",
  },
  "PHP (7.4.1)": {
    id: 68,
    monacoLanguage: "php",
    extension: ".php",
  },
  "Pascal (FPC 3.0.4)": {
    id: 67,
    monacoLanguage: "pascal",
    extension: ".pas",
  },
  "Perl (5.28.1)": {
    id: 85,
    monacoLanguage: "perl",
    extension: ".pl",
  },
  "Python (2.7.17)": {
    id: 70,
    monacoLanguage: "python",
    extension: ".py",
  },
  "Python (3.8.1)": {
    id: 71,
    monacoLanguage: "python",
    extension: ".py",
  },
  "R (4.0.0)": {
    id: 80,
    monacoLanguage: "r",
    extension: ".r",
  },
  "Ruby (2.7.0)": {
    id: 72,
    monacoLanguage: "ruby",
    extension: ".rb",
  },
  "Rust (1.40.0)": {
    id: 73,
    monacoLanguage: "rust",
    extension: ".rs",
  },
  "SQL (SQLite 3.27.2)": {
    id: 82,
    monacoLanguage: "sql",
    extension: ".sql",
  },
  "Scala (2.13.2)": {
    id: 81,
    monacoLanguage: "scala",
    extension: ".scala",
  },
  "Swift (5.2.3)": {
    id: 83,
    monacoLanguage: "swift",
    extension: ".swift",
  },
  "TypeScript (3.7.4)": {
    id: 74,
    monacoLanguage: "typescript",
    extension: ".ts",
  },
  "Visual Basic.Net (vbnc 0.0.0.5943)": {
    id: 84,
    monacoLanguage: "vb",
    extension: ".vb",
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
