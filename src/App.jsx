import { Toaster } from "react-hot-toast";
import "./App.css";
import CodeEditorContext from "./contexts/CodeEditorContext";
import CollaborationContext from "./contexts/CollaborationContext";
import CodeEditorPage from "./pages/CodeEditorPage";

function App() {
  return (
    <>
      <div>
        <Toaster />
      </div>
      <CodeEditorContext>
        <CollaborationContext>
          <CodeEditorPage />
        </CollaborationContext>
      </CodeEditorContext>
    </>
  );
}

export default App;
