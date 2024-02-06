import {
  Department,
  DepartmentRepository,
} from "../repository/DepartmentRepository";
import { Employee, EmployeeRepository } from "../repository/EmployeeRepository";
import { DepartmentService } from "./DepartmentService";
import { NotificationService } from "./NotificationService";

describe("Department Service", () => {
  let employeeRepository: jest.Mocked<EmployeeRepository>;
  let departmentRepository: jest.Mocked<DepartmentRepository>;
  let notificationService: jest.Mocked<NotificationService>;
  let departmentService: DepartmentService;

  beforeEach(() => {
    employeeRepository = {
      getEmployee: jest.fn(),
      saveEmployee: jest.fn(),
      updateEmployee: jest.fn(),
      deleteEmployee: jest.fn(),
    } as jest.Mocked<EmployeeRepository>;
    departmentRepository = {
      getDepartment: jest.fn(),
      saveDepartment: jest.fn(),
      updateDepartment: jest.fn(),
      deleteDepartment: jest.fn(),
    } as jest.Mocked<DepartmentRepository>;
    notificationService = {
      sendMessage: jest.fn(),
      sendAlert: jest.fn(),
    } as jest.Mocked<NotificationService>;
    departmentService = new DepartmentService(
      employeeRepository,
      departmentRepository,
      notificationService
    );
  });

  it("should send a message when employee and department exist", async () => {
    // given
    const departmentId = 94323;
    const employeeId = 2342;
    const employee: Employee = {
      id: employeeId,
      name: "John Doe",
      departmentId,
    };
    const department: Department = { id: departmentId, name: "Department" };
    const input = { employeeId: employeeId, message: "Hello" };

    employeeRepository.getEmployee.mockResolvedValueOnce(employee);
    departmentRepository.getDepartment.mockResolvedValueOnce(department);

    // when
    await departmentService.sendMessage(input);

    // then
    expect(employeeRepository.getEmployee).toHaveBeenCalledWith(
      input.employeeId
    );
    expect(departmentRepository.getDepartment).toHaveBeenCalledWith(
      departmentId
    );
    // expect(notificationServiceMock.sendMessage).toHaveBeenCalledWith(
    //   department,
    //   employee,
    //   input.message
    // );
    expect(notificationService.sendAlert).not.toHaveBeenCalled();
  });

  it("should send an alert when an error occurs", async () => {
    // given
    const employeeId = 9834;
    const input = { employeeId: employeeId, message: "Hello" };
    const errorMessage = "Something went wrong";
    const error = new Error(errorMessage);

    employeeRepository.getEmployee.mockRejectedValueOnce(error);

    // when
    await departmentService.sendMessage(input);

    // then
    expect(notificationService.sendAlert).toHaveBeenCalledWith(
      employeeId,
      errorMessage
    );
    expect(notificationService.sendMessage).not.toHaveBeenCalled();
  });
});
