import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Login from "./components/auth/Login";
import AddStudent from "./pages/AddStudent";
import StudentDetails from "./pages/StudentDetails";
import AppLayout from "./components/UI/AppLayout";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/student/:id" element={<StudentDetails />} />
            <Route
              path="/add-student"
              element={
                <PrivateRoute>
                  <AddStudent />
                </PrivateRoute>
              }
            />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </AuthProvider>
  );
}
