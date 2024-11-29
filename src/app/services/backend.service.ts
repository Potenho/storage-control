import { inject, Injectable, signal } from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import Dexie, { Table } from 'dexie';


export interface Account {
  name: string,
  email: string,
  password: string,
}

export interface Product {
  name: string,
  description: string,
  quantity: number,
  price: number
}

export interface Employees {
  name: string,
  cpf: number,
  position: string,
  hire_date: string
}

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  routerService = inject(Router);

  db: Dexie;

  accountsTable:  Table<Account, number>;
  productsTable:  Table<Product, number>;
  employeesTable: Table<Employees, number>;

  loggedIn = signal(false);

  constructor() {
    this.db = new Dexie('backend');
    this.db.version(1).stores({
      accounts:  '++id, name, email, password',
      products:  '++id, name, description, quantity, price',
      employees: '++id, name, cpf, position, hire_date'
    });

    this.accountsTable = this.db.table('accounts');
    this.productsTable = this.db.table('products');
    this.employeesTable = this.db.table('employees');

    this.db.on('populate', () => this.populates())

    const password = localStorage.getItem('token');
    const email = localStorage.getItem('name');

    if (password && email) {
      this.loggedIn.set(true)
    }

  }

  async populates() {
    await this.accountsTable.bulkAdd([
      {
        name: 'Test de Souza',
        email: 'test@gmail.com',
        password: 'test',
      },
    ]);

    await this.productsTable.bulkAdd([
      {
        name: 'Piano',
        description: 'Piano comum.',
        quantity: 1,
        price: 2100.0
      },
      {
        name: 'Guitarra',
        description: 'Uma guitarra estratosférica!',
        quantity: 4,
        price: 1100.0
      }
    ]);

    await this.employeesTable.bulkAdd([
      {
        name: 'Pedro',
        cpf: 123456789,
        position: 'Caminhoneiro',
        hire_date: new Date().toLocaleString('pt-BR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      }, {
        name: 'Gustavo',
        cpf: 987654321,
        position: 'Faxineiro',
        hire_date: new Date().toLocaleString('pt-BR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      },
    ])
  }

  async register(credentials: any) {
    const user = await this.accountsTable.where({'email': credentials.email}).first();

    if (user) {
      throw new Error('Same email');
    }

    await this.accountsTable.add({
      email: credentials.email,
      name: credentials.name,
      password: credentials.password
    })

    return this.login(credentials);
  }

  async login(credentials: any) {
    const user = await this.accountsTable.where({'email': credentials.email, 'password': credentials.password}).first();

    if (!user) {
      throw new Error('No such login');
    }

    this.loggedIn.set(true);
    
    localStorage.setItem('token', user.password);
    localStorage.setItem('name', user.name);
    localStorage.setItem('email', user.email);
    return user;
  }


  async addProduct(newProduct: Product) {
    return await this.productsTable.add(newProduct);
  }

  async updateProduct(updatedProduct: Product & {id: number}) {
    const id = updatedProduct.id
    if (!await this.productsTable.where({id: id}).first()) {
      throw new Error('No such product');
    }

    return await this.productsTable.update(id, updatedProduct);
  }

  async deleteProduct(id: number) {
    return await this.productsTable.delete(id);
  }


  async deleteEmployee(id: number) {
    return await this.employeesTable.delete(id);
  }

  async addEmployee(newEmployee: Employees) {
    return await this.employeesTable.add(newEmployee);
  }

  async updateEmployee(updatedEmployee: Employees & {id: number}) {
    const id = updatedEmployee.id
    if (!await this.employeesTable.where({id: id}).first()) {
      throw new Error('No such employee');
    }

    return await this.employeesTable.update(id, updatedEmployee);
  }



  

  logout() {
    this.routerService.navigate(['/login']);
    this.loggedIn.set(false);
    sessionStorage.clear();
    localStorage.clear();
  }
}
