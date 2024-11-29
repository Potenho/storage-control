import { Component, inject, OnInit, signal } from '@angular/core';
import { TableComponent } from '../../design-system/table/table.component';
import { TableData } from '../../services/table';
import { BackendService, Employees } from '../../services/backend.service';
import { CreateModalComponent } from './create-modal/create-modal.component';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [TableComponent, CreateModalComponent],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent implements OnInit {
  backendService = inject(BackendService);
  modalSignals: any = {
    update: signal<boolean>(false),
    delete: signal<boolean>(false),
    create: signal<boolean>(false)
  }
  tableData = signal<TableData | undefined>(undefined);
  dataToUpdate = signal<Employees & {id: number} | undefined>(undefined);

  async ngOnInit(): Promise<void> {
      this.setTable();
  }

  async setTable() {
    const employees = await this.backendService.employeesTable.toArray();
    const header = ['Nome', 'CPF', 'Cargo', 'Data de Contratação']
    const body = employees.map((employee: any) => {
      return {
        data: employee,
        cells: Object.keys(employee).filter(prod => prod != 'id').map((key: any) => employee[key])
      }
    });

    this.tableData.set({header, body})
  }

  onUpdate(item: any) {
    this.dataToUpdate.set(item);
    this.openModal('update');
  }

  onDelete(item: any) {
    this.backendService.deleteEmployee(item.id).then(() => this.setTable());
  }

  onNewEmployeeOrUpdate(employee: Employees & {id: number | undefined}) {
    if (employee.id) {
      const id = employee.id as number;
      return this.backendService.updateEmployee({...employee, id: id}).then(() => this.setTable());
    }

    const newEmployee: Employees = {
      name: employee.name,
      cpf: employee.cpf,
      position: employee.position,
      hire_date: employee.hire_date
    }

    return this.backendService.addEmployee(newEmployee).then(() => this.setTable());
  }


  openModal(modal: keyof typeof this.modalSignals) {
    Object.keys(this.modalSignals).forEach((key: any) => {
      if (key === modal) {
        this.modalSignals[key].set(true);
        return;
      }

      this.modalSignals[key].set(false);
    })

  }
}
