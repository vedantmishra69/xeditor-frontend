import "./App.css";
import CodeEditorContext from "./contexts/CodeEditorContext";
import CodeEditorPage from "./pages/CodeEditorPage";

function App() {
  return (
    <CodeEditorContext>
      <CodeEditorPage />
    </CodeEditorContext>
  );
}

export default App;
