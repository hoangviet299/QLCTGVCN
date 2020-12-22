import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
@NgModule({
  declarations: [UserComponent, UserComponent, ProfileComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: 'user',
        component: UserComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
  ]),  
  ]
})
export class UserModule { }
