// This file defines the Employee type used throughout the frontend for type safety.
// Keeping types in a separate file helps avoid circular dependencies and makes refactoring easier.
export interface Employee {
  id: number; // Unique identifier for the employee
  name: string; // Employee's name
  position: string; // Employee's job position
  system_working_on: string; // System the employee is currently working on
}
