import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProtectedPageComponent } from './protected-page/protected-page.component';
import { SigninPageComponent } from './signin-page/signin-page.component';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
 { path: '', redirectTo: 'home', pathMatch: 'full' },
 { path: 'signin', component: SigninPageComponent },
 { path: 'home', component: ProtectedPageComponent, canActivate: [AuthGuardService] },
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule]
})
export class AppRoutingModule { }