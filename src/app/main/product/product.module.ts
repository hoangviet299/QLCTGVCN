import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LophocComponent } from './lophoc/lophoc.component';
import { KhoaComponent } from './khoa/khoa.component';
import { GvcnComponent } from './gvcn/gvcn.component';
import { SinhvienComponent } from './sinhvien/sinhvien.component';
import { BaocaoComponent } from './baocao/baocao.component';
import { LichctComponent } from './lichct/lichct.component';
import { CongviecComponent } from './congviec/congviec.component';

@NgModule({
  declarations: [ 
    ProductComponent, LophocComponent, KhoaComponent, GvcnComponent, SinhvienComponent, BaocaoComponent, LichctComponent, CongviecComponent
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
      {
        path: 'baocao',
        component: BaocaoComponent,
      },
      {
        path: 'lichct',
        component: LichctComponent,
      },
      {
        path: 'congviec',
        component: CongviecComponent,
      },
  ]),  
  ]
})
export class ProductModule { }
