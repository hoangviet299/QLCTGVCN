
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule ,Routes} from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { DanhsachgvComponent } from './danhsachgv/danhsachgv.component';



@NgModule({
  declarations: [
    
  DanhsachgvComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      
      // {
      //   path: 'baocao',
      //   component: BaocaoComponent,
      // },
      
      {
        path: 'danhsachgv',
        component: DanhsachgvComponent,
      },
      
      
  ]),  
  ]
})
export class DskhoaModule { }




