import { Component, inject, OnInit, signal } from '@angular/core';
import { TableComponent } from '../../design-system/table/table.component';
import { TableData } from '../../services/table';
import { BackendService, Product } from '../../services/backend.service';
import { CreateModalComponent } from './create-modal/create-modal.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [TableComponent, CreateModalComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  backendService = inject(BackendService);
  modalSignals: any = {
    update: signal<boolean>(false),
    delete: signal<boolean>(false),
    create: signal<boolean>(false)
  }
  tableData = signal<TableData | undefined>(undefined);
  dataToUpdate = signal<Product & {id: number} | undefined>(undefined);

  async ngOnInit(): Promise<void> {
      this.setTable();
  }

  async setTable() {
    const products = await this.backendService.productsTable.toArray();
    const header = ['Nome', 'Descrição', 'Quantidade', 'Preço (R$)']
    const body = products.map((product: any) => {
      return {
        data: product,
        cells: Object.keys(product).filter(prod => prod != 'id').map((key: any) => product[key])
      }
    });

    this.tableData.set({header, body})
  }

  onUpdate(item: any) {
    this.dataToUpdate.set(item);
    this.openModal('update');
    console.log(item);
  }

  onDelete(item: any) {
    this.backendService.deleteProduct(item.id).then(() => this.setTable());
  }

  onNewProductOrUpdate(product: Product & {id: number | undefined}) {
    if (product.id) {
      const id = product.id as number;
      return this.backendService.updateProduct({...product, id: id}).then(() => this.setTable());
    }

    const newProduct: Product = {
      name: product.name,
      description: product.description,
      quantity: product.quantity,
      price: product.price
    }

    return this.backendService.addProduct(newProduct).then(() => this.setTable());
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
