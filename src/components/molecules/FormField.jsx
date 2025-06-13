const FormField = ({ label, description, children, className = '' }) => {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-900 mb-2">
        {label}
      </label>
      {description && (
        <p className="text-sm text-gray-500 mb-3">
          {description}
        </p>
      )}
      {children}
    </div>
  );
};

export default FormField;