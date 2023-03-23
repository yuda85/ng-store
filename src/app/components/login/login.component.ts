import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<LoginComponent>
  ) {}

  public onSubmit(loginForm: NgForm): void {
    console.log(loginForm.value);
    this.authService.login(loginForm.value);
    this.dialogRef.close();
  }
}
