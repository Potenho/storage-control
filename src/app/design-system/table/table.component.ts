import { Component, input, output } from '@angular/core';
import { Row, TableData } from '../../services/table';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  tableData = input.required<TableData | undefined>();
  addOutput = output<Row>();
  updateOutput = output<Row>();
  deleteOutput = output<Row>();

}
