import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import { studentService } from '@/services';

const StudentSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    setLoading(true);
    try {
      const data = await studentService.getAll();
      setStudents(data);
      if (data.length > 0) {
        setSelectedStudent(data[0]);
      }
    } catch (error) {
      toast.error('Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    setIsOpen(false);
    toast.success(`Switched to ${student.name}`);
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-bold">
            {selectedStudent?.name?.charAt(0) || 'S'}
          </span>
        </div>
        <div className="text-left hidden sm:block">
          <p className="text-sm font-medium text-gray-900">
            {selectedStudent?.name || 'Select Student'}
          </p>
          <p className="text-xs text-gray-500">
            {selectedStudent?.grade || ''}
          </p>
        </div>
        <ApperIcon name="ChevronDown" size={16} className="text-gray-500" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-30"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-40"
            >
              <div className="p-2">
                {loading ? (
                  <div className="p-4 space-y-2">
                    {[...Array(2)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                          <div className="flex-1">
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  students.map(student => (
                    <motion.button
                      key={student.id}
                      whileHover={{ backgroundColor: '#f3f4f6' }}
                      onClick={() => handleStudentSelect(student)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                        selectedStudent?.id === student.id ? 'bg-primary/10' : ''
                      }`}
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">
                          {student.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {student.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {student.grade} • {student.school}
                        </p>
                      </div>
                      {selectedStudent?.id === student.id && (
                        <ApperIcon name="Check" size={16} className="text-primary" />
                      )}
                    </motion.button>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentSelector;