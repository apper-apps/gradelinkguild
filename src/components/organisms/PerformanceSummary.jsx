import ProgressRing from '@/components/atoms/ProgressRing';

const PerformanceSummary = ({ gpa, attendanceRate, completionRate }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Summary</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Overall Progress</span>
          <ProgressRing percentage={gpa ? (gpa / 4.0) * 100 : 0} size={50} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Attendance</span>
          <ProgressRing 
            percentage={attendanceRate || 0} 
            size={50}
            color="#10b981"
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Assignments</span>
          <ProgressRing 
            percentage={completionRate} 
            size={50}
            color="#3b82f6"
          />
        </div>
      </div>
    </div>
  );
};

export default PerformanceSummary;