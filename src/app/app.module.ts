import { NgtUniversalModule } from '@ng-toolkit/universal';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninPageComponent } from './signin-page/signin-page.component';
import { ProtectedPageComponent } from './protected-page/protected-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninPageComponent,
    ProtectedPageComponent
  ],
  imports:[
    ReactiveFormsModule,
    CommonModule,
    NgtUniversalModule,
    TransferHttpCacheModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
})
export class AppModule { }
