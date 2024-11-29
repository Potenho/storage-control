import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { DefaultComponent } from './modules/default/default.component';
import { RegisterComponent } from './modules/register/register.component';
import { ProductsComponent } from './modules/products/products.component';
import { authGuard } from './services/auth.guard';
import { EmployeesComponent } from './modules/employees/employees.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
    },
    {
        path: '',
        component: DefaultComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'register',
                component: RegisterComponent
            },
            {
                path: 'products',
                component: ProductsComponent,
                canActivate: [authGuard]
            },
            {
                path: 'employees',
                component: EmployeesComponent,
                canActivate: [authGuard]
            }
        ]
    }, {
        path: '**', redirectTo: 'home'
    }
    
];
