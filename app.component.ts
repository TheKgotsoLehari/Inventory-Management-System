import { CommonModule } from '@angular/common';
import { Component, AfterContentChecked, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MaterialModule } from './shared/material.module';
import { isPlatformBrowser } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, MaterialModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentChecked {
  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;

  isLoggedIn = false;
  title: any;

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: any) {}

  toggleSidenav() {
    this.sidenav.toggle();
  }

  ngAfterContentChecked(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isLoggedIn = !!localStorage.getItem('User');
    }
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('User')) {
        localStorage.removeItem('User');
        this.router.navigateByUrl('login');
      }
    }
  }
}
