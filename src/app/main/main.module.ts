import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { MainComponent } from './main.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoleGuard } from '../lib/auth.guard';
import { Role } from '../models/role';
import { SharedModule } from '../shared/shared.module';
import { UnauthorizedComponent } from '../shared/unauthorized/unauthorized.component';
import { FileNotFoundComponent } from '../shared/file-not-found/file-not-found.component';
import { BaocaoComponent } from './baocao/baocao.component';
import { NguoidungComponent } from './nguoidung/nguoidung.component';
import { DskhoaComponent } from './dskhoa/dskhoa.component';
import { DssvComponent } from './dssv/dssv.component';
import { DetailComponent } from './detail/detail.component';
export const mainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'dskhoa',
        component: DskhoaComponent,
      },
      {
        path: 'dssv',
        component: DssvComponent,
      },
      {
        path: 'detail/:macv',
        component: DetailComponent,
      },
      {
        path: 'not-found',
        component: FileNotFoundComponent,
      },
      {
        path: 'unauthorized',
        component: UnauthorizedComponent,
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
        canActivate: [RoleGuard],
        data: { roles: [Role.Admin] },
      },
      {
        path: 'product',
        loadChildren: () =>
          import('./product/product.module').then((m) => m.ProductModule),
        canActivate: [RoleGuard],
        data: { roles: [Role.Admin] },
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
        canActivate: [RoleGuard],
        data: { roles: [Role.Admin, Role.User] },
      },
      {
        path: 'dskhoa',
        loadChildren: () =>
          import('./dskhoa/dskhoa.module').then((m) => m.DskhoaModule),
        canActivate: [RoleGuard],
        data: { roles: [Role.Admin, Role.User] },
      },
      {
        path: 'dssv',
        loadChildren: () =>
          import('./dssv/dssv.module').then((m) => m.DssvModule),
        canActivate: [RoleGuard],
        data: { roles: [Role.Admin, Role.User] },
      },
      
    ],
  },
];
@NgModule({
  declarations: [
    SidebarComponent,
    FooterComponent,
    NavbarComponent,
    MainComponent,
    BaocaoComponent,
    NguoidungComponent,
    DashboardComponent,
    DskhoaComponent,
    DssvComponent,
    DetailComponent,
  ],
  imports: [SharedModule, CommonModule, RouterModule.forChild(mainRoutes)],
})
export class MainModule {}
