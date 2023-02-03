import "./App.css";

import { ThemeProvider } from "@mui/material/styles";

import { BrowserRouter } from "react-router-dom";
import theme from "./theme";
import Header from "container/Header";

// import Header from "container/Header";

function App() {
  return (
    <ThemeProvider theme={theme}>
    <BrowserRouter >
    <Header/>
    </BrowserRouter>
            
    </ThemeProvider>
  );
}

export default App;
