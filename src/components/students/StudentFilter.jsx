import { TextField, MenuItem, Box } from "@mui/material";

export default function StudentFilter({ courseFilter, setCourseFilter }) {
  const courses = ["All", "Computer Science", "Mathematics", "Physics"];
  
  return (
    <Box sx={{ mb: 3 }}>
      <TextField
        select
        label="Filter by Course"
        value={courseFilter}
        onChange={(e) => setCourseFilter(e.target.value)}
        fullWidth
      >
        {courses.map((course) => (
          <MenuItem key={course} value={course}>
            {course}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}