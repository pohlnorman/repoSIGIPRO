import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink,NgbCollapseModule,NgbDropdownModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent{

  isMenuCollapsed = true;

  toggleTheme() {
    const htmlElement = document.documentElement;
    htmlElement.setAttribute(
      'data-bs-theme',
      htmlElement.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark'
    );
    this.isMenuCollapsed=true;
  }
  
}
