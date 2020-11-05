import "core-js/stable"
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import "regenerator-runtime/runtime"
import "../../../public/admin-assets/css/flexboxgrid.min.css"
import "../../../public/admin-assets/css/style.css"
import App from "./app"
import { apiWebSoket, auth, settings } from "./lib"
import { fetchSettings } from "./modules/settings/actions"
import store from "./store"

const { connectToWebSocket } = apiWebSoket
const DEVELOPER_MODE = settings.developerMode === true
if (DEVELOPER_MODE === false) {
  auth.validateCurrentToken()
}

//@ts-ignore
store.dispatch(fetchSettings())

if (window.WebSocket) {
  connectToWebSocket(store)
} else {
  console.log("WebSocket is not supported by your browser.")
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
)
