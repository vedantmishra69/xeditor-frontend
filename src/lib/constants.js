export const api = "xeditor.dev/api"; //localhost:8000
export const API_URL = `https://${api}`;
export const SOCKET_URL = `wss://${api}`;
export const DEFAULT_LANGUAGE = "Python (3.8.1)";
export const DEFAULT_CODE = "";
export const DEFAULT_THEME = "Dracula";
export const DEFAULT_TAB_SIZE = 4;
export const DEFAULT_FONT_SIZE = 18;
export const DEFAULT_WORD_WRAP = true;
export const SUPABASE_PROJECT_URL = "https://krazjhqzqqlbkvyilfkd.supabase.co";
export const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtyYXpqaHF6cXFsYmt2eWlsZmtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAwODkwNjQsImV4cCI6MjA0NTY2NTA2NH0.Hf18lTwwSavQvMePDroD7BR6alS9AVNzQ1Fvx9Y1Lss";
export const GOOGLE_CLIENT_ID =
  "232593721299-a4s7mbnvceusicttu50pqn563er26a16.apps.googleusercontent.com";
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

export const DEFAULT_CODE_BASE64 =
  "JycnCiAgICBfXyAgX18gICAgICAgIF8gXyBfICAgICAgICAgICAgIAogICAgXCBcLyAvX19fICBfX3wgKF8pIHxfIF9fXyAgXyBfXyAKICAgICBcICAvLyBfIFwvIF9gIHwgfCBfXy8gXyBcfCAnX198CiAgICAgLyAgXCAgX18vIChffCB8IHwgfHwgKF8pIHwgfCAgIAogICAgL18vXF9cX19ffFxfXyxffF98XF9fXF9fXy98X3wgICAKCiAgICAgICAgICAgIENvZGUgJiBDb2xsYWIKClhlZGl0b3IgaXMgYSByZWFsLXRpbWUgY29sbGFib3JhdGl2ZSBjb2RlIGVkaXRvciBzdXBwb3J0aW5nIG11bHRpcGxlIHByb2dyYW1taW5nIGxhbmd1YWdlcywgaW5jbHVkaW5nIEMsIEMrKywgSmF2YSwgUHl0aG9uLCBhbmQgSmF2YVNjcmlwdC4gQ29sbGFib3JhdGUgc2VhbWxlc3NseSBieSBpbnZpdGluZyBmcmllbmRzIGFuZCBlbmpveSBidWlsdC1pbiBjaGF0IGZ1bmN0aW9uYWxpdHkgZm9yIGVmZmVjdGl2ZSBjb21tdW5pY2F0aW9uLiBTaWduIGluIHRvIGNyZWF0ZSBhbmQgbWFuYWdlIG11bHRpcGxlIGZpbGVzLCBhY2Nlc3NpYmxlIGFjcm9zcyBhbGwgeW91ciBkZXZpY2VzLgoKJycnCnByaW50KCJoZWxsbyIp";

export const DEFAULT_CODE_BUFFER = {
  data: [
    1, 1, 250, 246, 181, 244, 3, 0, 4, 1, 0, 195, 4, 39, 39, 39, 13, 10, 32, 32,
    32, 32, 95, 95, 32, 32, 95, 95, 32, 32, 32, 32, 32, 32, 32, 32, 95, 32, 95,
    32, 95, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 13, 10, 32, 32,
    32, 32, 92, 32, 92, 47, 32, 47, 95, 95, 95, 32, 32, 95, 95, 124, 32, 40, 95,
    41, 32, 124, 95, 32, 95, 95, 95, 32, 32, 95, 32, 95, 95, 32, 13, 10, 32, 32,
    32, 32, 32, 92, 32, 32, 47, 47, 32, 95, 32, 92, 47, 32, 95, 96, 32, 124, 32,
    124, 32, 95, 95, 47, 32, 95, 32, 92, 124, 32, 39, 95, 95, 124, 13, 10, 32,
    32, 32, 32, 32, 47, 32, 32, 92, 32, 32, 95, 95, 47, 32, 40, 95, 124, 32,
    124, 32, 124, 32, 124, 124, 32, 40, 95, 41, 32, 124, 32, 124, 32, 32, 32,
    13, 10, 32, 32, 32, 32, 47, 95, 47, 92, 95, 92, 95, 95, 95, 124, 92, 95, 95,
    44, 95, 124, 95, 124, 92, 95, 95, 92, 95, 95, 95, 47, 124, 95, 124, 32, 32,
    32, 13, 10, 13, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 67, 111,
    100, 101, 32, 38, 32, 67, 111, 108, 108, 97, 98, 13, 10, 13, 10, 88, 101,
    100, 105, 116, 111, 114, 32, 105, 115, 32, 97, 32, 114, 101, 97, 108, 45,
    116, 105, 109, 101, 32, 99, 111, 108, 108, 97, 98, 111, 114, 97, 116, 105,
    118, 101, 32, 99, 111, 100, 101, 32, 101, 100, 105, 116, 111, 114, 32, 115,
    117, 112, 112, 111, 114, 116, 105, 110, 103, 32, 109, 117, 108, 116, 105,
    112, 108, 101, 32, 112, 114, 111, 103, 114, 97, 109, 109, 105, 110, 103, 32,
    108, 97, 110, 103, 117, 97, 103, 101, 115, 44, 32, 105, 110, 99, 108, 117,
    100, 105, 110, 103, 32, 67, 44, 32, 67, 43, 43, 44, 32, 74, 97, 118, 97, 44,
    32, 80, 121, 116, 104, 111, 110, 44, 32, 97, 110, 100, 32, 74, 97, 118, 97,
    83, 99, 114, 105, 112, 116, 46, 32, 67, 111, 108, 108, 97, 98, 111, 114, 97,
    116, 101, 32, 115, 101, 97, 109, 108, 101, 115, 115, 108, 121, 32, 98, 121,
    32, 105, 110, 118, 105, 116, 105, 110, 103, 32, 102, 114, 105, 101, 110,
    100, 115, 32, 97, 110, 100, 32, 101, 110, 106, 111, 121, 32, 98, 117, 105,
    108, 116, 45, 105, 110, 32, 99, 104, 97, 116, 32, 102, 117, 110, 99, 116,
    105, 111, 110, 97, 108, 105, 116, 121, 32, 102, 111, 114, 32, 101, 102, 102,
    101, 99, 116, 105, 118, 101, 32, 99, 111, 109, 109, 117, 110, 105, 99, 97,
    116, 105, 111, 110, 46, 32, 83, 105, 103, 110, 32, 105, 110, 32, 116, 111,
    32, 99, 114, 101, 97, 116, 101, 32, 97, 110, 100, 32, 109, 97, 110, 97, 103,
    101, 32, 109, 117, 108, 116, 105, 112, 108, 101, 32, 102, 105, 108, 101,
    115, 44, 32, 97, 99, 99, 101, 115, 115, 105, 98, 108, 101, 32, 97, 99, 114,
    111, 115, 115, 32, 97, 108, 108, 32, 121, 111, 117, 114, 32, 100, 101, 118,
    105, 99, 101, 115, 46, 13, 10, 13, 10, 39, 39, 39, 13, 10, 112, 114, 105,
    110, 116, 40, 34, 104, 101, 108, 108, 111, 34, 41, 0,
  ],
  type: "Buffer",
};
