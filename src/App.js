import {Routes, Route} from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateProspect from "./pages/CreateProspect";
import { AuthContextProvider } from "./context/AuthContext";
import { ToastContextProvider } from "./context/ToastContext";
import Prospects from "./pages/Prospects";
import EditProspect from "./pages/EditProspect";
import CSVUpload from "./pages/CSVUpload";

const App = () => {
  return (
    <ToastContextProvider>
      <AuthContextProvider>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/create" element={<CreateProspect />} />
            <Route exact path="/prospects" element={<Prospects />} />
            <Route exact path="/csvUpload" element={<CSVUpload />} />
            <Route path="/edit/:id" element={<EditProspect />} />
          </Routes>
        </Layout>
      </AuthContextProvider>
    </ToastContextProvider>
  );
};

export default App;