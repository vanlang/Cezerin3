import CezerinClient from "cezerin2-client"
import { settings } from "../lib"

let api = null
const dashboardToken = localStorage.getItem("dashboard_token")
const webstoreToken = localStorage.getItem("webstore_token")

const developerMode = settings.developerMode === true

if (dashboardToken || developerMode === true) {
  api = new CezerinClient({
    apiBaseUrl: settings.apiBaseUrl || "/api/v1",
    apiToken: dashboardToken,
    webstoreToken: webstoreToken,
  })
}

export default api
