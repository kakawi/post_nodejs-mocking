import {
  Department,
  DepartmentRepository,
} from "../repository/DepartmentRepository";
import { Employee, EmployeeRepository } from "../repository/EmployeeRepository";
import { DepartmentService } from "./DepartmentService";
import { NotificationService } from "./NotificationService";
import { mock, instance, when, verify, _ } from "@johanblumenberg/ts-mockito";

describe("Department Service", () => {
  let employeeRepository: EmployeeRepository;
  let departmentRepository: DepartmentRepository;
  let notificationService: NotificationService;
  let departmentService: DepartmentService;

  beforeEach(() => {
    employeeRepository = mock(EmployeeRepository);
    departmentRepository = mock(DepartmentRepository);
    notificationService = mock(NotificationService);
    departmentService = new DepartmentService(
      instance(employeeRepository),
      instance(departmentRepository),
      instance(notificationService)
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

    when(employeeRepository.getEmployee(employeeId)).thenResolve(employee);
    when(departmentRepository.getDepartment(departmentId)).thenResolve(
      department
    );

    // when
    await departmentService.sendMessage(input);

    // then
    verify(employeeRepository.getEmployee(input.employeeId)).called();
    verify(departmentRepository.getDepartment(departmentId)).called();
    verify(
      notificationService.sendMessage(department, employee, input.message)
    ).called();
    verify(notificationService.sendAlert(_, _)).never();
  });

  it("should send an alert when an error occurs", async () => {
    // given
    const employeeId = 9834;
    const input = { employeeId: employeeId, message: "Hello" };
    const errorMessage = "Something went wrong";
    const error = new Error(errorMessage);

    when(employeeRepository.getEmployee(employeeId)).thenThrow(error);

    // when
    await departmentService.sendMessage(input);

    // then
    verify(notificationService.sendAlert(employeeId, errorMessage)).once();
    verify(notificationService.sendMessage(_, _, _)).never();
  });
});
