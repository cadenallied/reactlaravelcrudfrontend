// EmployeeForm.tsx
// This component renders a form for adding or editing an employee.
// It receives the form state, handlers, and editing state as props from the parent.
import React from 'react';
import type { Employee } from './types';

// Props for EmployeeForm: form state, editingId, change/submit/cancel handlers
interface EmployeeFormProps {
  form: Partial<Employee>;
  editingId: number | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

// Renders a form with fields for name, position, and system_working_on.
// Shows 'Update' if editing, 'Add' if creating a new employee.
const EmployeeForm: React.FC<EmployeeFormProps> = ({ form, editingId, onChange, onSubmit, onCancel }) => (
  <form onSubmit={onSubmit} className="mb-6 space-y-2">
    <input
      name="name"
      placeholder="Name"
      value={form.name || ''}
      onChange={onChange}
      className="border p-2 mr-2"
    />
    <input
      name="position"
      placeholder="Position"
      value={form.position || ''}
      onChange={onChange}
      className="border p-2 mr-2"
    />
    <input
      name="system_working_on"
      placeholder="System Working On"
      value={form.system_working_on || ''}
      onChange={onChange}
      className="border p-2 mr-2"
    />
    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
      {editingId ? 'Update' : 'Add'}
    </button>
    {/* Show Cancel button only when editing */}
    {editingId && (
      <button type="button" onClick={onCancel} className="ml-2 px-4 py-2 border rounded">
        Cancel
      </button>
    )}
  </form>
);

export default EmployeeForm;
