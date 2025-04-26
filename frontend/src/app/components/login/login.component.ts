import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordValidator } from '../../utils/passwordValidator';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  error: boolean = false;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', [Validators.required, passwordValidator()]],
    })
  }
  ngOnInit(): void {
    if (this.authService.isLogged()) {
      this.router.navigate(['/home']);
    }
  }

  onSubmit() {
    this.authService.login(this.form.value).subscribe({
      next: (authResponse) => {
        const token = authResponse.token;
        sessionStorage.removeItem('token');
        sessionStorage.setItem('token', JSON.stringify(token));
        this.router.navigate(['/home']);
      },
      error: (e) => {
        this.error = true;
      }
    })
  }
}
