import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { LoginComponent } from './auth/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PainelComponent } from './painel/painel.component';
import { NavbarComponent } from './navbar/navbar.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import ptBr from "@angular/common/locales/pt";
import { registerLocaleData } from "@angular/common";
import { LOCALE_ID, DEFAULT_CURRENCY_CODE } from "@angular/core";
import { AuthenticationService } from './auth/services/authentication.service';
import { ToastrModule } from 'ngx-toastr';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PainelComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
  ],
  providers: [
    AuthenticationService,
    {provide: LOCALE_ID, useValue:"pt"},
    {provide: DEFAULT_CURRENCY_CODE, useValue:"BRL"}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
