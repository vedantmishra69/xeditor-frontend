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
        <Toaster
          position="bottom-left"
          reverseOrder={false}
          duration={5000}
          toastOptions={{
            className: "",
            style: {
              background: "#282A36",
              border: "2px solid #6272A4",
              color: "#F8F8F2",
              fontSize: "1.125rem",
              lineHeight: "1.75rem",
            },
            success: {
              iconTheme: {
                primary: "#6272A4",
                secondary: "#282A36",
              },
            },
            error: {
              iconTheme: {
                primary: "#BE609A",
                secondary: "#282A36",
              },
            },
          }}
        />
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
