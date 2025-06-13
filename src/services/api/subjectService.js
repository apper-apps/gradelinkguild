import subjectData from '../mockData/subject.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const subjectService = {
  async getAll() {
    await delay(300);
    return [...subjectData];
  },

  async getById(id) {
    await delay(200);
    const subject = subjectData.find(s => s.id === id);
    return subject ? { ...subject } : null;
  },

  async create(subject) {
    await delay(400);
    const newSubject = {
      ...subject,
      id: Date.now().toString()
    };
    subjectData.push(newSubject);
    return { ...newSubject };
  },

  async update(id, updates) {
    await delay(300);
    const index = subjectData.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Subject not found');
    
    subjectData[index] = { ...subjectData[index], ...updates };
    return { ...subjectData[index] };
  },

  async delete(id) {
    await delay(300);
    const index = subjectData.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Subject not found');
    
    const deleted = subjectData.splice(index, 1)[0];
    return { ...deleted };
  }
};

export default subjectService;