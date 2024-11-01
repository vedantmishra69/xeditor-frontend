import "./App.css";
import CodeEditorContext from "./contexts/CodeEditorContext";
import CollaborationContext from "./contexts/CollaborationContext";
import CodeEditorPage from "./pages/CodeEditorPage";

function App() {
  return (
    <CodeEditorContext>
      <CollaborationContext>
        <CodeEditorPage />
      </CollaborationContext>
    </CodeEditorContext>
  );
}

export default App;
