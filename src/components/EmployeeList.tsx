// EmployeeList.tsx
// This component displays a table of employees and provides Edit/Delete actions for each row.
// It receives the employee data and action handlers as props from the parent component.
import React from 'react';
import type { Employee } from './types';

// Props for EmployeeList: list of employees, edit/delete handlers, and loading state
interface EmployeeListProps {
  employees: Employee[];
  onEdit: (emp: Employee) => void;
  onDelete: (id: number) => void;
  loading: boolean;
}

// Renders a table of employees. Shows a loading message if data is being fetched.
const EmployeeList: React.FC<EmployeeListProps> = ({ employees, onEdit, onDelete, loading }) => {
  if (loading) return <div>Loading...</div>;
  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">Name</th>
          <th className="border p-2">Position</th>
          <th className="border p-2">System</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(emp => (
          <tr key={emp.id}>
            <td className="border p-2">{emp.name}</td>
            <td className="border p-2">{emp.position}</td>
            <td className="border p-2">{emp.system_working_on}</td>
            <td className="border p-2">
              {/* Edit and Delete buttons call the handlers passed from the parent */}
              <button onClick={() => onEdit(emp)} className="mr-2 text-blue-600">Edit</button>
              <button onClick={() => onDelete(emp.id)} className="text-red-600">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeList;
