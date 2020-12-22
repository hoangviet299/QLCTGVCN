import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/lib/authentication.service';
import { BaseComponent } from 'src/app/lib/base-component';

@Component({
selector: 'app-profile',
templateUrl: './profile.component.html',
styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
public usser:any;
public doneSetupForm:any;
public showUpdateModal:any;
constructor(private authenticationService: AuthenticationService,) { }

ngOnInit(): void {
this.thongtin();
}
thongtin() {
this.usser=JSON.parse(localStorage.getItem('user'));
}
}