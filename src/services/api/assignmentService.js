import assignmentData from '../mockData/assignment.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const assignmentService = {
  async getAll() {
    await delay(300);
    return [...assignmentData];
  },

  async getById(id) {
    await delay(200);
    const assignment = assignmentData.find(a => a.id === id);
    return assignment ? { ...assignment } : null;
  },

  async getBySubject(subjectId) {
    await delay(250);
    return assignmentData.filter(a => a.subjectId === subjectId).map(a => ({ ...a }));
  },

  async create(assignment) {
    await delay(400);
    const newAssignment = {
      ...assignment,
      id: Date.now().toString()
    };
    assignmentData.push(newAssignment);
    return { ...newAssignment };
  },

  async update(id, updates) {
    await delay(300);
    const index = assignmentData.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Assignment not found');
    
    assignmentData[index] = { ...assignmentData[index], ...updates };
    return { ...assignmentData[index] };
  },

  async delete(id) {
    await delay(300);
    const index = assignmentData.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Assignment not found');
    
    const deleted = assignmentData.splice(index, 1)[0];
    return { ...deleted };
  }
};

export default assignmentService;