import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { MovieComponent } from './movie/movie.component';
import { FanFavComponent } from './fan-fav/fan-fav.component';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { DetailComponent } from './detail/detail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    DetailComponent,
    RouterLinkActive,
    HeaderComponent,
    HeroSectionComponent,
    MovieComponent,
    FanFavComponent,
    UpcomingComponent,
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myfilm-app';
  constructor(private router: Router) {}

  isDetailRoute(): boolean {
    return this.router.url.startsWith('/detail');
  }

}
