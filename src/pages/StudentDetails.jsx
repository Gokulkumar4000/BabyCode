import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudentById } from "../services/studentsAPI";
import { Container, Typography, Paper, Chip, Divider } from "@mui/material";

export default function StudentDetails() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const data = await getStudentById(id);
        setStudent(data);
      } catch (error) {
        console.error("Error fetching student:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (!student) return <Typography>Student not found</Typography>;

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h4" gutterBottom>
          {student.name}
        </Typography>
        
        <Chip 
          label={student.course} 
          color="primary" 
          sx={{ mb: 2 }}
        />
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="body1" paragraph>
          <strong>Email:</strong> {student.email}
        </Typography>
        
        <Typography variant="body1" paragraph>
          <strong>Enrollment Date:</strong> {student.enrollmentDate}
        </Typography>
        
        {student.grade && (
          <Typography variant="body1">
            <strong>Grade:</strong> {student.grade}
          </Typography>
        )}
      </Paper>
    </Container>
  );
}