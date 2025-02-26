import { Excalidraw, THEME, WelcomeScreen } from "@excalidraw/excalidraw"
import { ExcalidrawElement, Theme } from "@excalidraw/excalidraw/types/element/types";
import { AppState, BinaryFiles } from "@excalidraw/excalidraw/types/types";
import { useEffect, useState } from "react";

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping');

  const [theme, setTheme] = useState<Theme>(THEME.LIGHT);
  const [render, setRender] = useState<boolean>(false);

  const onCanvasChange = (el: readonly ExcalidrawElement[], state: AppState, files: BinaryFiles) => {
    const newTheme = state.theme;
    if(newTheme !== theme){
        localStorage.setItem("theme", newTheme);
    }
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if(savedTheme) {
        if(savedTheme == THEME.LIGHT || savedTheme == THEME.DARK) {
            setTheme(savedTheme);
        }
    }
    setRender(true);
  }, []);

  return (
    <>
      <div id="excalidraw-container">
        { render ? (
            <Excalidraw initialData={{appState: {theme: theme, showWelcomeScreen: true}}} onChange={onCanvasChange}>
                <WelcomeScreen />
            </Excalidraw>
        ) : null}
      </div>
    </>
  )
}

export default App
