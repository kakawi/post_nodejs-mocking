export type Employee = {
  id: number;
  name: string;
  departmentId: number;
};

export class EmployeeRepository {
  public async getEmployee(id: number): Promise<Employee> {
    return {
      id,
      name: "John Doe",
      departmentId: 123,
    };
  }

  public saveEmployee(employee: Employee): void {
    console.log("Employee saved", employee);
  }

  public updateEmployee(employee: Employee): void {
    console.log("Employee updated", employee);
  }

  public deleteEmployee(id: number): void {
    console.log("Employee deleted", id);
  }
}
