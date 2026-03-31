import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter } from "react-router-dom";
import App from "./App";
 //Material ui theme vvv
import CssBaseline from '@mui/material/CssBaseline'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
<React.StrictMode>
<BrowserRouter>
<CssBaseline/>{/*resetare Css*/
}

<App/>
</BrowserRouter>
</React.StrictMode>
);
