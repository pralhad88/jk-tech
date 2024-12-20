import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PublicRoute from "./routes/publicRoute";
import PrivateRoute from "./routes/privateRoute";
import LoginPage from "./components/loginPage/LoginPage";
import DashboardPage from "./components/DashboardPage/Dashboard";
import HomePage from "./components/Home/Home";
import Header from "./components/Header/HeaderPage";
import CreateBlog from "./components/CreateBlogPage/CreateBlogPage";
import ViewBlogDetails from './components/viewBlog/viewBlogDetails';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="container-1">
          <div className="container-2">
            <Header />
          </div>
          <div className="container-3">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<PublicRoute />}>
                <Route index element={<HomePage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="viewblog/:id" element={<ViewBlogDetails />} />
              </Route>

              {/* Private Routes */}
              <Route path="/dashboard" element={<PrivateRoute />}>
                <Route index element={<DashboardPage />} />
                <Route path="create-blog" element={<CreateBlog />} />
              </Route>
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
