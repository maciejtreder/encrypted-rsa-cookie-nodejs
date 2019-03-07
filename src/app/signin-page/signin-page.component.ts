import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthorizationService } from '../authorization.service';

@Component({
 selector: 'app-signin-page',
 templateUrl: './signin-page.component.html',
 styleUrls: ['./signin-page.component.css']
})
export class SigninPageComponent {

 public signinForm: FormGroup = new FormGroup({
   username: new FormControl(''),
   password: new FormControl('')
 });

 constructor(private authService: AuthorizationService) { }

 public onSubmit(): void {
   this.authService.signIn(
     this.signinForm.get('username').value,
     this.signinForm.get('password').value
   ).subscribe();
 }
}
