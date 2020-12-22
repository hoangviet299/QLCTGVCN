import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/lib/authentication.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private authenticationService: AuthenticationService) { 
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
  }
  public usser: any;

  ngOnInit(): void {
    this.thongtin();
  }
  
  logout() {
    this.authenticationService.logout();
  }  
  thongtin(){
    this.usser = JSON.parse(localStorage.getItem('user'));

  }
}
