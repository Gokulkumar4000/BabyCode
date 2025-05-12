import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Stack, Alert, MenuItem } from "@mui/material";
import { addStudent, getStudents } from "../services/studentsAPI"; // Ensure getStudents is available

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
  const [students, setStudents] = useState([]);

  // Fetch all students to check for duplicates
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getStudents();  // Make sure this function fetches the students correctly
        setStudents(data);
      } catch (err) {
        setError("Failed to fetch existing students.");
      }
    };

    fetchStudents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Required field check
    const requiredFields = ["name", "email", "course", "enrollmentDate"];
    for (let field of requiredFields) {
      if (!formData[field]) {
        setError("Please fill in all required fields.");
        return;
      }
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Common typo check
    const typoDomains = ["gmai.com", "gmial.com", "gnail.com"];
    const emailDomain = formData.email.split("@")[1];
    if (typoDomains.includes(emailDomain)) {
      setError(`Did you mean "@gmail.com"? Please check your email.`);
      return;
    }

    // Check if student with the same email exists
    const exists = students.some(
      (student) => student.email.toLowerCase() === formData.email.toLowerCase()
    );
    if (exists) {
      setError("A student with this email already exists.");
      return;
    }

    // Submit the form
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
    <form onSubmit={handleSubmit}>
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
  );
}
