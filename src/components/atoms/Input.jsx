import { motion } from 'framer-motion';

const Input = ({
  type = 'text',
  value,
  onChange,
  placeholder,
  className = '',
  readOnly = false,
  min,
  max,
  step,
  options = [], // For select type
  ...props
}) => {
  const baseClasses = 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent';
  const readOnlyClasses = readOnly ? 'bg-gray-50 cursor-not-allowed' : '';

  const commonProps = {
    value,
    onChange: (e) => onChange && onChange(e.target.value),
    placeholder,
    readOnly,
    className: `${baseClasses} ${readOnlyClasses} ${className}`,
    ...props
  };

  if (type === 'select') {
    return (
      <motion.select
        whileTap={{ scale: 0.99 }}
        {...commonProps}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </motion.select>
    );
  }

  if (type === 'range') {
    return (
      <motion.input
        whileTap={{ scale: 0.99 }}
        type="range"
        min={min}
        max={max}
        step={step}
        {...commonProps}
        className={`${commonProps.className} appearance-none cursor-pointer h-2 bg-gray-200`}
      />
    );
  }

  return (
    <motion.input
      whileTap={readOnly ? {} : { scale: 0.99 }}
      type={type}
      {...commonProps}
    />
  );
};

export default Input;