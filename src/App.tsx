import "./App.css";
import Header from "./components/Header.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home.tsx";
import Post from "./Post.tsx";
import Dashboard from "./Dashboard.tsx";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import CreatePost from "./CreatePost";
import ContactUs from "./ContactUs.tsx";
import Footer from "./components/Footer.tsx";
import PrivacyPolicy from "./PrivacyPolicy.tsx";
import TermsOfService from "./TermsOfService.tsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/tos" element={<TermsOfService />} />
        <Route path="/post/:id" element={<Post />} />
        <Route
          path="/post/create"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
