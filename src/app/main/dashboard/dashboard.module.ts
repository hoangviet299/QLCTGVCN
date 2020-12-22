import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule ,Routes} from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      
      // {
      //   path: 'khoa',
      //   component: KhoaComponent,
        
      // },
      
     
      
  ]),  
  ]
})
export class DashboardModule { }




