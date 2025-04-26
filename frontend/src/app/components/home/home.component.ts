import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink,NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  user: User = {
    id: 0,
    email: '',
    role: '',
    status: false,
    personaId: 0
  }
  constructor(private authService: AuthService
  ) { }
  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user) {
      this.user = user;
    }
  }

}
