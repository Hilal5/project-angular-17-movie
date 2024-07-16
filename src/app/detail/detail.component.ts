import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MovieService } from '../services/movie.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, NgIf, NgFor],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  movie: any = {};
  genres: any[] = [];
  genreNames: string[] = [];
  videos: { name: string, key: string, url: SafeResourceUrl }[] = [];
  imageUrlBase = 'https://image.tmdb.org/t/p/w400';
  activeSlideIndex = 0;


  constructor(private route: ActivatedRoute, private movieService: MovieService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.loadMovieId();
  }

  loadMovieId() {
    const movieId = +this.route.snapshot.paramMap.get('id')!;
    this.movieService.getMovieDetails(movieId).subscribe(data => {
      this.movie = data;
      this.mapGenres();
    });
    this.movieService.getMovieVideos(movieId).subscribe(data => {
      this.videos = data.results.map((video: any) => ({
        name: video.name,
        key: video.key,
        url: this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${video.key}`)
      }));
    });
    this.movieService.getGenres().subscribe(data => {
      this.genres = data.genres;
      this.mapGenres();
    });
  }

  mapGenres() {
    if (this.movie && this.genres?.length > 0) {
      this.genreNames = this.movie.genres.map((genre: any) => {
        const matchedGenre = this.genres.find(g => g.id === genre.id);
        return matchedGenre ? matchedGenre.name : '';
      });
    }
  }
}
