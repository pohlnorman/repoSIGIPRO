import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgbCollapseModule, NgbDropdownModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  user: User = {
    id: 0,
    email: '',
    role: '',
    status: false,
    personaId: 0
  };
  isMenuCollapsed = true;

  constructor(private authService: AuthService) { }

  toggleTheme() {
    const htmlElement = document.documentElement;
    htmlElement.setAttribute(
      'data-bs-theme',
      htmlElement.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark'
    );
    this.isMenuCollapsed = true;
  }

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user) {
      this.user = user;
    }
  }
  logout() {
    this.authService.logout();
    this.isMenuCollapsed = true;
  }
  hasAnyRole(roles:string[]): boolean {
    return this.authService.hasAnyRole(roles);
  }
}
