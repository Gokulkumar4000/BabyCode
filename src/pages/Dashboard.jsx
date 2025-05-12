import { useState, useEffect } from 'react';
import { getStudents, addStudent } from '../services/studentsAPI';
import { 
  Grid, 
  Container, 
  Typography, 
  Box, 
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Chip,
  CircularProgress
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import StudentCard from '../components/students/StudentCard';

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('All');
  const [sortOption, setSortOption] = useState('name-asc');
  const { currentUser } = useAuth();

  // Fetch the students data
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getStudents();
        setStudents(data);
        setFilteredStudents(data); // Initialize filteredStudents with the fetched data
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  // Apply filters and sorting to the students list
  useEffect(() => {
    let result = [...students];

    // Apply course filter
    if (courseFilter !== 'All') {
      result = result.filter(student => student.course === courseFilter);
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(student => 
        student.name.toLowerCase().includes(term) || 
        student.email.toLowerCase().includes(term)
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortOption) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'grade-asc':
          return (a.grade || '').localeCompare(b.grade || '');
        case 'grade-desc':
          return (b.grade || '').localeCompare(a.grade || '');
        case 'date-asc':
          return new Date(a.enrollmentDate) - new Date(b.enrollmentDate);
        case 'date-desc':
          return new Date(b.enrollmentDate) - new Date(a.enrollmentDate);
        default:
          return 0;
      }
    });

    setFilteredStudents(result);
  }, [students, searchTerm, courseFilter, sortOption]);

  // Get distinct courses for filtering
  const courses = [...new Set(students.map(student => student.course))];

  // Handle adding a new student and updating the list
  const handleAddStudent = async (studentData) => {
    const newStudent = await addStudent(studentData);
    setStudents((prevStudents) => [...prevStudents, newStudent]);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Student Dashboard
      </Typography>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
        {/* Search Field */}
        <TextField
          label="Search Students"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ minWidth: 200 }}
        />
        
        {/* Course Filter */}
        <FormControl sx={{ minWidth: 200 }} size="small">
          <InputLabel>Course</InputLabel>
          <Select
            value={courseFilter}
            label="Course"
            onChange={(e) => setCourseFilter(e.target.value)}
          >
            <MenuItem value="All">All Courses</MenuItem>
            {courses.map(course => (
              <MenuItem key={course} value={course}>{course}</MenuItem>
            ))}
          </Select>
        </FormControl>
        
        {/* Sort Options */}
        <FormControl sx={{ minWidth: 200 }} size="small">
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortOption}
            label="Sort By"
            onChange={(e) => setSortOption(e.target.value)}
          >
            <MenuItem value="name-asc">Name (A-Z)</MenuItem>
            <MenuItem value="name-desc">Name (Z-A)</MenuItem>
            <MenuItem value="grade-asc">Grade (Low-High)</MenuItem>
            <MenuItem value="grade-desc">Grade (High-Low)</MenuItem>
            <MenuItem value="date-asc">Enrollment Date (Oldest)</MenuItem>
            <MenuItem value="date-desc">Enrollment Date (Newest)</MenuItem>
          </Select>
        </FormControl>
        
        {/* Reset Filters */}
        <Button
          variant="outlined"
          onClick={() => {
            setSearchTerm('');
            setCourseFilter('All');
            setSortOption('name-asc');
          }}
        >
          Reset Filters
        </Button>
      </Box>
      
      {/* Filter Summary Chips */}
      <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
        {searchTerm && (
          <Chip
            label={`Search: "${searchTerm}"`}
            onDelete={() => setSearchTerm('')}
          />
        )}
        {courseFilter !== 'All' && (
          <Chip
            label={`Course: ${courseFilter}`}
            onDelete={() => setCourseFilter('All')}
          />
        )}
        <Chip
          label={`Sorted by: ${{
            'name-asc': 'Name (A-Z)',
            'name-desc': 'Name (Z-A)',
            'grade-asc': 'Grade (Low-High)',
            'grade-desc': 'Grade (High-Low)',
            'date-asc': 'Enrollment Date (Oldest)',
            'date-desc': 'Enrollment Date (Newest)'
          }[sortOption]}`}
        />
      </Box>

      {/* Student Cards Grid */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : filteredStudents.length === 0 ? (
        <Typography variant="body1" sx={{ mt: 2 }}>
          No students found matching your criteria
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredStudents.map((student) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={student.id}>
              <StudentCard student={student} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
