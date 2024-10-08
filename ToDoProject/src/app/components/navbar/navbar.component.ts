import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private auth: AuthService){}

  ngOnInit(): void {
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }


  logout(){
    this.auth.signOut();
  }

}
