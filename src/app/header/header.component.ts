import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive, NgIf, NgFor],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showNavLinks = true;
  searchResults: any[] = [];

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.showNav();
  }

  showNav() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNavLinks = !event.url.includes('/detail/');
      }
    });
  }

  onSearch(query: string) {
    if (query) {
      this.movieService.searchMovies(query).subscribe({
        next: (response: any) => {
          this.searchResults = response.results;
        },
        error: (error: any) => {
          console.error('Error fetching search results', error);
        }
      });
    } else {
      this.searchResults = [];
    }
  }
  

  goToDetail(movieId: number) {
    this.router.navigate(['/detail', movieId]).then(() => {
      window.location.reload();
    });
    this.searchResults = [];
  }
}

