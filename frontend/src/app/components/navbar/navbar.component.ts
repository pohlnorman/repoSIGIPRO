import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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

  isMenuCollapsed = true;
  user: User | undefined;
  rolId: number = -1;

  constructor(private authService: AuthService,private router: Router) { }

  toggleTheme() {
    const htmlElement = document.documentElement;
    htmlElement.setAttribute(
      'data-bs-theme',
      htmlElement.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark'
    );
    this.isMenuCollapsed = true;
  }

  ngOnInit(): void {
    this.authService.checkSession().subscribe({
      next: (authResponse) => {
        this.user = authResponse.user;
        this.rolId = Number(authResponse.user?.rolId);
      }
    });

  }
  logout() {
    this.authService.logout().subscribe({
      next:(authResponse)=>{
        this.router.navigate(['/login']);
      }
    });
    this.isMenuCollapsed = true;
  }
  hasAnyRole(roles: number[]): boolean {
    if (this.rolId && roles.indexOf(this.rolId) >= 0) {
      return true;
    } else {
      return false;
    }
  }
}
