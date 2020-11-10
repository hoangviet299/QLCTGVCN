import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LophocComponent } from './lophoc/lophoc.component';
import { KhoaComponent } from './khoa/khoa.component';
import { GvcnComponent } from './gvcn/gvcn.component';
import { SinhvienComponent } from './sinhvien/sinhvien.component';

@NgModule({
  declarations: [ 
    ProductComponent, LophocComponent, KhoaComponent, GvcnComponent, SinhvienComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: 'gvcn',
        component: GvcnComponent,
      },
      {
        path: 'khoa',
        component: KhoaComponent,
      },
      {
        path: 'product',
        component: ProductComponent,
      },
      {
        path: 'sinhvien',
        component: SinhvienComponent,
      },
      {
        path: 'lophoc',
        component: LophocComponent,
      },
  ]),  
  ]
})
export class ProductModule { }
