import { EmployeeRepository } from "../repository/EmployeeRepository";
import { DepartmentRepository } from "../repository/DepartmentRepository";
import { NotificationService } from "./NotificationService";

export class DepartmentService {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly departmentRepository: DepartmentRepository,
    private readonly serviceA: NotificationService
  ) {}

  public async sendMessage(input: InputData) {
    try {
      const employee = await this.employeeRepository.getEmployee(input.employeeId);
      const department = await this.departmentRepository.getDepartment(
        employee.departmentId
      );
      await this.serviceA.sendMessage(department, employee, input.message);
    } catch (e) {
      if (e instanceof Error) {
        await this.serviceA.sendAlert(input.employeeId, e.message);
      }
    }
  }
}

export type InputData = {
  employeeId: number;
  message: string;
};
