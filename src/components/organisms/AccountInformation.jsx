import ApperIcon from '@/components/ApperIcon';
import Input from '@/components/atoms/Input';
import FormField from '@/components/molecules/FormField';

const AccountInformation = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="flex items-center space-x-2 mb-4">
        <ApperIcon name="User" className="text-primary" size={20} />
        <h2 className="text-lg font-semibold text-gray-900">
          Account Information
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Parent Name">
          <Input type="text" defaultValue="Sarah Johnson" readOnly />
        </FormField>
        
        <FormField label="Email Address">
          <Input type="email" defaultValue="sarah.johnson@email.com" readOnly />
        </FormField>
        
        <FormField label="Phone Number">
          <Input type="tel" defaultValue="(555) 123-4567" readOnly />
        </FormField>
        
        <FormField label="School District">
          <Input type="text" defaultValue="Lincoln Unified School District" readOnly />
        </FormField>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700">
          <ApperIcon name="Info" size={14} className="inline mr-1" />
          Account information is managed by your school district. 
          Contact the school office to update your contact details.
        </p>
      </div>
    </div>
  );
};

export default AccountInformation;