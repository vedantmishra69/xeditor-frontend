import { Toaster } from "react-hot-toast";
import "./App.css";
import CodeEditorContext from "./contexts/CodeEditorContext";
import CollaborationContext from "./contexts/CollaborationContext";
import CodeEditorPage from "./pages/CodeEditorPage";
import AuthContext from "./contexts/AuthContext";
import ChatContext from "./contexts/ChatContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "./lib/constants";
import StatesContext from "./contexts/StatesContext";

function App() {
  return (
    <>
      <div>
        <Toaster />
      </div>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <AuthContext>
          <CodeEditorContext>
            <CollaborationContext>
              <ChatContext>
                <StatesContext>
                  <CodeEditorPage />
                </StatesContext>
              </ChatContext>
            </CollaborationContext>
          </CodeEditorContext>
        </AuthContext>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
