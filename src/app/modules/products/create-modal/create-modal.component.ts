import { Component, input, model, output, OnInit } from '@angular/core';
import { ModalComponent } from '../../../design-system/modal/modal.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../../../services/backend.service';

@Component({
  selector: 'app-create-modal',
  standalone: true,
  imports: [ModalComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './create-modal.component.html',
  styleUrl: './create-modal.component.scss'
})
export class CreateModalComponent implements OnInit {
  isModalOpen = model<boolean>();
  data = input<(Product & {id: number}) | undefined>();
  newItem = output<Product & {id: number | undefined}>()

  form: FormGroup = new FormGroup({
    id: new FormControl<number | undefined>(undefined),
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    quantity: new FormControl(0, [Validators.required]),
    price: new FormControl<number | undefined>(undefined, [Validators.required])
  });

  ngOnInit(): void {
    const data = this.data();
    if (data) {
      this.form.patchValue({
        id: data.id,
        name: data.name,
        description: data.description,
        quantity: data.quantity,
        price: data.price
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
