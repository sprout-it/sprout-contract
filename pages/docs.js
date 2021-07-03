import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"
const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT
const App = () => <SwaggerUI url={`${ENDPOINT}/docs`} />
export default App