const mockStudents = [
    { 
      id: 1, 
      name: "John Doe", 
      email: "john@example.com", 
      course: "Computer Science",
      enrollmentDate: "2023-01-15",
      grade: "A"
    },
    { 
      id: 2, 
      name: "Jane Smith", 
      email: "jane@example.com", 
      course: "Mathematics",
      enrollmentDate: "2023-02-20",
      grade: "B+"
    },
    { 
      id: 3, 
      name: "Alex Johnson", 
      email: "alex@example.com", 
      course: "Physics",
      enrollmentDate: "2023-03-10",
      grade: "A-"
    },
    { 
      id: 4, 
      name: "Maria Garcia", 
      email: "maria@example.com", 
      course: "Computer Science",
      enrollmentDate: "2023-01-05",
      grade: "B"
    }
  ];
  
  const simulateDelay = () => new Promise(resolve => setTimeout(resolve, 500));
  
  export const getStudents = async () => {
    await simulateDelay();
    return [...mockStudents];
  };
  
  export const getStudentById = async (id) => {
    await simulateDelay();
    return mockStudents.find(student => student.id === parseInt(id));
  };
  
  export const addStudent = async (studentData) => {
    await simulateDelay();
    const newStudent = { 
      id: mockStudents.length + 1, 
      ...studentData 
    };
    mockStudents.push(newStudent);
    return newStudent;
  };
  