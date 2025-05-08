import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordValidator } from '../../utils/passwordValidator';
import { AuthService } from '../../services/auth.service';
import { AuthResponse } from '../../interfaces/auth.response';
import { AuthRequest } from '../../interfaces/auth.request';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  errorMessage: string | null = null;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', [Validators.required, passwordValidator()]],
    })
  }
  ngOnInit(): void {
    this.authService.checkSession().subscribe({
      next: (authResponse) => {
        if (authResponse.isAuthenticated) {
          this.router.navigate(['/home']);
        }
      },
      error:(e)=>{}
    });
  }

  onSubmit() {
    const authRequest: AuthRequest = {
      username: this.form.get("username")?.value,
      password: this.form.get("password")?.value
    }
    this.authService.login(authRequest).subscribe({
      next: (authResponse: AuthResponse) => {
        this.router.navigate(['/home']);
      },
      error: (e) => {
        this.errorMessage = e.error.message;
      }
    })
  }
}
