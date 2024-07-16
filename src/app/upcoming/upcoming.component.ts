import { Component, OnInit, inject } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-upcoming',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './upcoming.component.html',
  styleUrl: './upcoming.component.css'
})
export class UpcomingComponent implements OnInit {
  private movieService = inject(MovieService);
  upmovies: any[] = [];
  genres: any[] = [];
  imageUrlBase = 'https://image.tmdb.org/t/p/w300';
  pages = [1, 2, 3, 4, 5, 6, 7];
  currentPage: number = 1;

  constructor(private router: Router){}

  ngOnInit(): void {
    this.loadUpMovies(this.currentPage);
    this.loadGenres();
  }

  goToDetail(movieId: number): void {
    this.router.navigate(['/detail', movieId]).then(() => {
      window.location.reload();
    });
  }


  loadUpMovies(page: number = 1) {
    this.movieService.getUpMovies(page).subscribe({
      next: (res: any) => {
        this.upmovies = res.results;
        this.currentPage = page;
        console.log(this.upmovies);
      },
      error: (error) => console.log('Error fetching movies:', error)
    })
  }

  loadGenres() {
    this.movieService.getGenres().subscribe({
      next: (res: any) => {
        this.genres = res.genres;
        console.log(this.genres);
      },
      error: (error) => console.log('Error fetching genres:', error)
    });
  }

  getGenreNames(genreIds: number[]): string {
    const genreNames = this.genres.filter(genre => genreIds.includes(genre.id)).map(genre => genre.name);
    return genreNames.join(', ');
  }

  trackByMovieId(index: number, movie: any): number {
    return movie.id;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.pages.length) {
      this.loadUpMovies(page);
    }
  }
}
