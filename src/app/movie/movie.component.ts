import { Component, OnInit, inject } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})

export class MovieComponent implements OnInit {
  private movieService = inject(MovieService);
  movies: any[] = [];
  genres: any[] = [];
  imageUrlBase = 'https://image.tmdb.org/t/p/w400';
  pages = [1, 2, 3, 4, 5, 6, 7];
  currentPage: number = 1;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadMovies(this.currentPage);
    this.loadGenres();
  }

  // ini contoh
  // loadMovies() {
  //   this.movieService.getMovies().subscribe({
  //     next: (res: any) => {
  //       this.movies = res.results;
  //       console.log(this.movies);
  //     },
  //     error: (error) => console.log('Error fetching movies:', error)
  //   });
  // }

  loadMovies(page: number = 1): void {
    this.movieService.getMovies(page).subscribe({
      next: (res: any) => {
        this.movies = res.results;
        this.currentPage = page;
        console.log(this.movies);
      },
      error: (error) => console.log('Error fetching movies:', error)
    });
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

  goToDetail(movieId: number): void {
    this.router.navigate(['/detail', movieId]).then(() => {
      window.location.reload();
    });
  }

  trackByMovieId(index: number, movie: any): number {
    return movie.id;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.pages.length) {
      this.loadMovies(page);
    }
  }
}
