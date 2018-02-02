// I created a base styles folder where all of my app level styling will go.
// normalize or reset.css is imported first, this works like link tags in html.
// This will apply those styles first, then the index.css will be applied.
// We can then import component level stylesheets into each component for use.
// Remember that all className's are global, meaning that a class made in once component is usable in all.
// IF you want to import fonts or some other general import, do it in the app level css like index.css

// if you want to use your own favicon (the logo in the browser tab) replace the favicon file in
// the public folder with your own image and call the file favicon.ico
// more on favicons here --> https://www.favicon-generator.org/
import React from "react";
import ReactDOM from "react-dom";
import "./base_styles/normalize.css";
import "./base_styles/index.css";
import App from "./components/App";

// We've removed registerServiceWorker, both the import and the function invocation
// We've also deleted the serviceWorker File.

ReactDOM.render(<App />, document.getElementById("root"));
