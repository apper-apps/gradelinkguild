import studentData from '../mockData/student.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const studentService = {
  async getAll() {
    await delay(300);
    return [...studentData];
  },

  async getById(id) {
    await delay(200);
    const student = studentData.find(s => s.id === id);
    return student ? { ...student } : null;
  },

  async create(student) {
    await delay(400);
    const newStudent = {
      ...student,
      id: Date.now().toString()
    };
    studentData.push(newStudent);
    return { ...newStudent };
  },

  async update(id, updates) {
    await delay(300);
    const index = studentData.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Student not found');
    
    studentData[index] = { ...studentData[index], ...updates };
    return { ...studentData[index] };
  },

  async delete(id) {
    await delay(300);
    const index = studentData.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Student not found');
    
    const deleted = studentData.splice(index, 1)[0];
    return { ...deleted };
  }
};

export default studentService;