import { Toaster } from "react-hot-toast";
import "./App.css";
import CodeEditorContext from "./contexts/CodeEditorContext";
import CollaborationContext from "./contexts/CollaborationContext";
import CodeEditorPage from "./pages/CodeEditorPage";
import AuthContext from "./contexts/AuthContext";
import ChatContext from "./contexts/ChatContext";

function App() {
  return (
    <>
      <div>
        <Toaster />
      </div>
      <AuthContext>
        <CodeEditorContext>
          <CollaborationContext>
            <ChatContext>
              <CodeEditorPage />
            </ChatContext>
          </CollaborationContext>
        </CodeEditorContext>
      </AuthContext>
    </>
  );
}

export default App;
