import { Component, input, model, output, OnInit } from '@angular/core';
import { ModalComponent } from '../../../design-system/modal/modal.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Employees } from '../../../services/backend.service';

@Component({
  selector: 'app-create-modal',
  standalone: true,
  imports: [ModalComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './create-modal.component.html',
  styleUrl: './create-modal.component.scss'
})
export class CreateModalComponent implements OnInit {
  isModalOpen = model<boolean>();
  data = input<(Employees & {id: number}) | undefined>();
  newItem = output<Employees & {id: number | undefined}>()

  form: FormGroup = new FormGroup({
    id: new FormControl<number | undefined>(undefined),
    name: new FormControl('', [Validators.required]),
    cpf: new FormControl<number | undefined>(undefined, [Validators.required]),
    position: new FormControl<string>('', Validators.required),
    hire_date: new FormControl<string>(new Date().toLocaleString('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }), Validators.required)
  });

  ngOnInit(): void {
    const data = this.data();
    if (data) {
      this.form.patchValue({
        id: data.id,
        name: data.name,
        cpf: data.cpf,
        position: data.position,
        hire_date: data.hire_date
      })
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.newItem.emit(this.form.value)
      this.isModalOpen.set(false);
    }
  }
}
