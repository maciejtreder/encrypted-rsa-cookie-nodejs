import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthorizationService } from '../authorization.service';

@Component({
 selector: 'app-protected-page',
 templateUrl: './protected-page.component.html',
 styleUrls: ['./protected-page.component.css']
})
export class ProtectedPageComponent {

  public mySecret: Observable<string> = this.http.get<any>('/secretData').pipe(map(resp => resp.secret));

  constructor(private http: HttpClient, private authService: AuthorizationService) { }

  public signOut(): void {
    this.authService.signOut().subscribe();
  }
}