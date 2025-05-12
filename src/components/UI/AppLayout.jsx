import { Container, CssBaseline } from "@mui/material";
import Navbar from "./Navbar";
import { useAuth } from "../../contexts/AuthContext";

export default function AppLayout({ children }) {
  const { currentUser } = useAuth();
  
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        {children}
      </Container>
    </>
  );
}