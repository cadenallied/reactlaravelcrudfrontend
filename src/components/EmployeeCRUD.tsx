// EmployeeCRUD.tsx
// This is the main container component for the Employee CRUD app.
// It manages all state and API calls, and passes data/handlers to EmployeeForm and EmployeeList.
import React, { useEffect, useState } from 'react';
import EmployeeList from './EmployeeList';
import EmployeeForm from './EmployeeForm';
import type { Employee } from './types';

// API endpoint for the backend (now loaded from Vite environment variable)
const API_URL = import.meta.env.VITE_API_URL;

// Main EmployeeCRUD component
const EmployeeCRUD: React.FC = () => {
  // State for employees, loading, error, form, and editing
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Employee>>({});
  const [editingId, setEditingId] = useState<number | null>(null);

  // Fetch employees on mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Fetch all employees from the backend
  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setEmployees(data);
    } catch (e) {
      setError('Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit for add or update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.position || !form.system_working_on) return;
    try {
      if (editingId) {
        // Update existing employee
        await fetch(`${API_URL}/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
      } else {
        // Add new employee
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
      }
      setForm({});
      setEditingId(null);
      fetchEmployees();
    } catch (e) {
      setError('Failed to save employee');
    }
  };

  // Set form to selected employee for editing
  const handleEdit = (emp: Employee) => {
    setForm(emp);
    setEditingId(emp.id);
  };

  // Delete employee by id
  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this employee?')) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchEmployees();
    } catch (e) {
      setError('Failed to delete employee');
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setForm({});
    setEditingId(null);
  };

  // Render the form and list, passing all necessary props
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Employee CRUD</h1>
      {error && <div className="text-red-500">{error}</div>}
      <EmployeeForm
        form={form}
        editingId={editingId}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
      <EmployeeList
        employees={employees}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />
    </div>
  );
};

export default EmployeeCRUD;
