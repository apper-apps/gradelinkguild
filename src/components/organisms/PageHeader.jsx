const PageHeader = ({ title, description, className = '' }) => {
  return (
    <div className={`mb-6 ${className}`}>
      <h1 className="text-2xl font-display font-bold text-gray-900 mb-2">
        {title}
      </h1>
      <p className="text-gray-600">
        {description}
      </p>
    </div>
  );
};

export default PageHeader;