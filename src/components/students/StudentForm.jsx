import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Stack, Alert, MenuItem, Box } from "@mui/material";
import { addStudent } from "../../services/studentsAPI"; // Assuming this is how you add the student

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
    if (!formData.name || !formData.email || !formData.course || !formData.enrollmentDate) {
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
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2, // Padding for mobile view
      }}
    >
      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 500 }}>
        <Stack spacing={2}>
          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            name="name"
            label="Full Name"
            required
            value={formData.name}
            onChange={handleChange}
          />

          <TextField
            name="email"
            label="Email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
          />

          <TextField
            name="course"
            label="Course"
            required
            select
            value={formData.course}
            onChange={handleChange}
          >
            <MenuItem value="">Select Course</MenuItem>
            <MenuItem value="Computer Science">Computer Science</MenuItem>
            <MenuItem value="Mathematics">Mathematics</MenuItem>
            <MenuItem value="Physics">Physics</MenuItem>
          </TextField>

          <TextField
            name="grade"
            label="Grade"
            value={formData.grade}
            onChange={handleChange}
          />

          <TextField
            name="enrollmentDate"
            label="Enrollment Date"
            type="date"
            required
            value={formData.enrollmentDate}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "Saving..." : "Add Student"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
