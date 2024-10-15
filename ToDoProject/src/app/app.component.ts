import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ToDoProject';

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (!this.isLoggedIn()) {
      this.router.navigate(['login']);
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
