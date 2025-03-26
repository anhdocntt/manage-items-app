import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'products',
        loadChildren: () => import('./features/product/product-routing.module').then(m => m.BookingRoutingModule),
    },
    { path: '**', redirectTo: 'products' }
];
