/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { MultiStepForm } from './MultiStepForm';
import { Input } from '../../../atoms/Input';
import { FormField } from '../../../molecules/FormField';
import { Box } from '../../../atoms/Box/Box';
import { Text } from '../../../atoms/Text/Text';
import { Select } from '../../../atoms/Select';
import { Textarea } from '../../../atoms/Textarea';
import { Button } from '../../../atoms/Button/Button';

// Define a type for the keys of the forms object for better type safety
type FormKey = 'userRegistration' | 'projectCreation';

export const MultiStepFormPlayground = () => {
  // State cho form hiện tại đang active
  const [activeForm, setActiveForm] = useState<FormKey>('userRegistration');
  
  // State cho từng form riêng biệt
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
  });

  const [projectForm, setProjectForm] = useState({
    projectName: '',
    projectType: '',
    budget: '',
    deadline: '',
    description: '',
  });

  const [step, setStep] = useState(0);

  // Các forms configuration
  const forms = {
    userRegistration: {
      title: 'User Registration',
      steps: [
        {
          id: 'basic',
          title: 'Basic Info',
          description: 'User identity information',
          content: (
            <Box display="grid" gap="lg">
              <FormField label="Name" required>
                <Input
                  value={userForm.name}
                  onChange={(e) =>
                    setUserForm({ ...userForm, name: e.target.value })
                  }
                  placeholder="Enter full name"
                />
              </FormField>

              <FormField label="Email" required>
                <Input
                  type="email"
                  value={userForm.email}
                  onChange={(e) =>
                    setUserForm({ ...userForm, email: e.target.value })
                  }
                  placeholder="example@company.com"
                />
              </FormField>
            </Box>
          ),
          isValid: () => !!userForm.name && !!userForm.email,
        },
        {
          id: 'role',
          title: 'Role & Department',
          description: 'Organization information',
          content: (
            <Box display="grid" gap="lg">
              <FormField label="Role" required>
                <Select
                  value={userForm.role}
                  onChange={(e) =>
                    setUserForm({ ...userForm, role: e.target.value })
                  }
                  options={[
                    { value: '', label: 'Select role' },
                    { value: 'admin', label: 'Administrator' },
                    { value: 'manager', label: 'Manager' },
                    { value: 'developer', label: 'Developer' },
                    { value: 'designer', label: 'Designer' },
                  ]}
                />
              </FormField>

              <FormField label="Department">
                <Input
                  value={userForm.department}
                  onChange={(e) =>
                    setUserForm({ ...userForm, department: e.target.value })
                  }
                  placeholder="e.g., Engineering, Marketing"
                />
              </FormField>
            </Box>
          ),
          isValid: () => !!userForm.role,
        },
        {
          id: 'review',
          title: 'Review',
          description: 'Confirm user information',
          content: (
            <Box display="grid" gap="md">
              <Text size="lg" weight="bold">User Details</Text>
              <Box display="grid" gap="sm">
                <Text>Name: <strong>{userForm.name}</strong></Text>
                <Text>Email: <strong>{userForm.email}</strong></Text>
                <Text>Role: <strong>{userForm.role || '—'}</strong></Text>
                <Text>Department: <strong>{userForm.department || '—'}</strong></Text>
              </Box>
            </Box>
          ),
        },
      ],
      onSubmit: () => {
        alert(JSON.stringify(userForm, null, 2));
        // Reset form after submission
        setUserForm({
          name: '',
          email: '',
          role: '',
          department: '',
        });
        setStep(0);
      },
    },

    projectCreation: {
      title: 'Project Creation',
      steps: [
        {
          id: 'basic',
          title: 'Project Basics',
          description: 'Basic project information',
          content: (
            <Box display="grid" gap="lg">
              <FormField label="Project Name" required>
                <Input
                  value={projectForm.projectName}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, projectName: e.target.value })
                  }
                  placeholder="Enter project name"
                />
              </FormField>

              <FormField label="Project Type" required>
                <Select
                  value={projectForm.projectType}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, projectType: e.target.value })
                  }
                  options={[
                    { value: '', label: 'Select type' },
                    { value: 'web', label: 'Web Application' },
                    { value: 'mobile', label: 'Mobile App' },
                    { value: 'desktop', label: 'Desktop Software' },
                    { value: 'api', label: 'API Development' },
                  ]}
                />
              </FormField>
            </Box>
          ),
          isValid: () => !!projectForm.projectName && !!projectForm.projectType,
        },
        {
          id: 'details',
          title: 'Project Details',
          description: 'Budget and timeline',
          content: (
            <Box display="grid" gap="lg">
              <FormField label="Budget (USD)">
                <Input
                  type="number"
                  value={projectForm.budget}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, budget: e.target.value })
                  }
                  placeholder="Enter budget amount"
                  min="0"
                />
              </FormField>

              <FormField label="Deadline">
                <Input
                  type="date"
                  value={projectForm.deadline}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, deadline: e.target.value })
                  }
                />
              </FormField>

              <FormField label="Description">
                <Textarea
                  value={projectForm.description}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, description: e.target.value })
                  }
                  placeholder="Project description..."
                  rows={4}
                />
              </FormField>
            </Box>
          ),
        },
        {
          id: 'review',
          title: 'Review',
          description: 'Confirm project details',
          content: (
            <Box display="grid" gap="md">
              <Text size="lg" weight="bold">Project Summary</Text>
              <Box display="grid" gap="sm">
                <Text>Project Name: <strong>{projectForm.projectName}</strong></Text>
                <Text>Type: <strong>{projectForm.projectType || '—'}</strong></Text>
                <Text>Budget: <strong>{projectForm.budget ? `$${projectForm.budget}` : 'Not specified'}</strong></Text>
                <Text>Deadline: <strong>{projectForm.deadline || 'Not set'}</strong></Text>
                <Text>Description: <strong>{projectForm.description || 'No description'}</strong></Text>
              </Box>
            </Box>
          ),
        },
      ],
      onSubmit: () => {
        alert(JSON.stringify(projectForm, null, 2));
        // Reset form after submission
        setProjectForm({
          projectName: '',
          projectType: '',
          budget: '',
          deadline: '',
          description: '',
        });
        setStep(0);
      },
    },
  };

  const currentForm = forms[activeForm];

  // Xử lý chuyển đổi form
  const handleFormChange = (formKey: FormKey) => {
    setActiveForm(formKey);
    setStep(0); // Reset về step đầu tiên khi chuyển form
  };

  return (
    <Box display="grid" gap="xl">
      {/* Form Selector */}
      <Box display="flex" gap="md" sx={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '1rem' }}>
        {(Object.keys(forms) as FormKey[]).map((formKey) => (
          <Button
            key={formKey}
            variant={activeForm === formKey ? 'primary' : 'secondary'}
            onClick={() => handleFormChange(formKey as FormKey)}
            sx={{
              fontWeight: activeForm === formKey ? 'bold' : 'normal',
              borderBottom: activeForm === formKey ? '3px solid #3b82f6' : 'none',
            }}
          >
            {forms[formKey].title}
          </Button>
        ))}
      </Box>

      {/* Form Title */}
      <Text size="xl" weight="bold">{currentForm.title}</Text>

      {/* MultiStepForm Component */}
      <MultiStepForm
        steps={currentForm.steps}
        currentStep={step}
        onStepChange={setStep}
        onSubmit={currentForm.onSubmit}
      />

      {/* Form Data Preview (Optional - for debugging) */}
      <Box 
        css={{ 
          marginTop: '2rem', 
          padding: '1rem', 
          background: '#f8fafc', 
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}
      >
        <Text size="md" weight="semibold">Current Form Data:</Text>
            <Text
                size="sm"
                sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}
                >
                {JSON.stringify(
                    activeForm === 'userRegistration' ? userForm : projectForm,
                    null,
                    2
                )}
            </Text>

      </Box>
    </Box>
  );
};