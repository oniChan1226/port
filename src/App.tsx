import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  return (
    <BrowserRouter>
      <LoadingScreen />
      <AppRoutes />
      <ToastContainer position="bottom-right" theme="dark" />
    </BrowserRouter>
  );
}

export default App
