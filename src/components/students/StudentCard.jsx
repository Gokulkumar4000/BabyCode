import { Card, CardContent, Typography, Chip, Avatar, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { School, Email, CalendarToday, Grade } from '@mui/icons-material';

export default function StudentCard({ student }) {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 345,  // Set the maximum width of the card
        margin: 'auto', // Center the card horizontally
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[6],
          cursor: 'pointer',
        },
      }}
      onClick={() => navigate(`/student/${student.id}`)}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
            {student.name.charAt(0)}
          </Avatar>
          <Typography variant="h6" component="div">
            {student.name}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Email fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {student.email}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <School fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
          <Chip label={student.course} size="small" color="primary" variant="outlined" />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <CalendarToday fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            Enrolled: {new Date(student.enrollmentDate).toLocaleDateString()}
          </Typography>
        </Box>

        {student.grade && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Grade fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              Grade: <strong>{student.grade}</strong>
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
