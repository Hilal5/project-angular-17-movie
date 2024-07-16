import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Router } from '@angular/router';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-fan-fav',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './fan-fav.component.html',
  styleUrl: './fan-fav.component.css'
})
export class FanFavComponent implements OnInit {
  private movieService = inject(MovieService);

  faMovies: any[] = [];
  genres: any[] = [];
  imageUrlBase = 'https://image.tmdb.org/t/p/w400';
  

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadMovies();
    this.loadGenres();
  }

  loadMovies() {
    this.movieService.getFaMovie().subscribe({
      next: (res: any) => {
        this.faMovies = res.results;
        console.log(this.faMovies)
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

  goToDetail(movieId: number): void {
    this.router.navigate(['/detail', movieId]).then(() => {
      window.location.reload();
    });
  }

}
