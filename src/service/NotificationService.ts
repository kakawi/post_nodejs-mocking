import { Department } from "../repository/DepartmentRepository";
import { Employee } from "../repository/EmployeeRepository";

export class NotificationService {
  async sendMessage(department: Department, employee: Employee, message: string) {
    console.log(
      `Employee ${employee.name} sent a message ${message} to department ${department.name}`
    );
  }

  async sendAlert(employeeId: number, error: string) {
    console.log(`${employeeId} encountered an error: ${error}`);
  }
}
