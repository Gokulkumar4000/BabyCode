import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Stack,
  Alert,
  MenuItem,
  Box,
  Paper,
  Typography,
} from "@mui/material";
import { addStudent } from "../../services/studentsAPI";

export default function AddStudent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
    grade: "",
    enrollmentDate: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.course ||
      !formData.enrollmentDate
    ) {
      setError("Name, Email, Course, and Enrollment Date are required");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await addStudent(formData);
      navigate("/");
    } catch (err) {
      setError("An error occurred while adding the student.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "#f0f2f5",
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: "450px",
          p: 4,
          borderRadius: 2,
          bgcolor: "white",
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
          Student Dashboard
        </Typography>
        
        <Stack spacing={3}>
          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            name="name"
            label="Full Name"
            required
            fullWidth
            value={formData.name}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            name="email"
            label="Email"
            type="email"
            required
            fullWidth
            value={formData.email}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            name="course"
            label="Course"
            required
            select
            fullWidth
            value={formData.course}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          >
            <MenuItem value="">Select Course</MenuItem>
            <MenuItem value="Computer Science">Computer Science</MenuItem>
            <MenuItem value="Mathematics">Mathematics</MenuItem>
            <MenuItem value="Physics">Physics</MenuItem>
          </TextField>

          <TextField
            name="grade"
            label="Grade"
            fullWidth
            value={formData.grade}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            name="enrollmentDate"
            label="Enrollment Date"
            type="date"
            required
            fullWidth
            value={formData.enrollmentDate}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <Button 
            type="submit" 
            variant="contained" 
            size="large"
            disabled={loading}
            sx={{
              mt: 2,
              py: 1.5,
              fontWeight: 'bold',
              textTransform: 'none',
              fontSize: '1rem',
            }}
          >
            {loading ? "Saving..." : "ADD STUDENT"}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
