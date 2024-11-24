import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { DefaultComponent } from './modules/default/default.component';

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
            }
        ]
    },
    
];
