import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const appRoutes: Routes = [
    {
        path: '', children: [
            // {path: '', pathMatch: 'full', },
            {path: '', loadChildren: () => import('./main/main.routes').then(m => m.mainRoutes)},
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent} ,
        ]
    },
    // { path: '**', n}
];
