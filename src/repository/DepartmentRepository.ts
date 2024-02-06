export type Department = {
  id: number;
  name: string;
};

export class DepartmentRepository {
  public async getDepartment(departmentId: number): Promise<Department> {
    return {
      id: departmentId,
      name: "Department",
    };
  }

  public saveDepartment(department: Department): void {
    console.log("Department saved", department);
  }

  public updateDepartment(department: Department): void {
    console.log("Department updated", department);
  }

  public deleteDepartment(departmentId: number): void {
    console.log("Department deleted", departmentId);
  }
}
