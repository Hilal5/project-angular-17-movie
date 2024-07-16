import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// bearer
const bearerToken: string = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwM2RiYmVjYWU5YjI4MzUzMWEzZGUzYzNlZWFkNzA1YyIsIm5iZiI6MTcyMDA3ODcyMS45MjEyODksInN1YiI6IjY2ODM1ZDdhMDQwN2RkMmZjNzI2MmI3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.glLrnoheufYYGBkryX2tRqjaWIZ8A3guB3mbu5MvK3U';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private baseUrl = 'https://api.themoviedb.org/3';
  private apiKey = '03dbbecae9b283531a3de3c3eead705c';

  constructor(private http: HttpClient) { }

  getMovies(page: number = 1): Observable<any> {
    const url = `${this.baseUrl}/movie/now_playing?api_key=${this.apiKey}&language=en-US&page=${page}`;
    return this.http.get<any>(url, {
      headers: {
        'Authorization': bearerToken
      }
    });
  }

  getUpMovies(page: number = 1): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/upcoming?api_key=${this.apiKey}&language=en-US&page=${page}`, {
      headers: {
        'Authorization': bearerToken
      }
    });
  }

  getFaMovie(): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/top_rated?api_key=${this.apiKey}&language=en-US&page=1`, {
      headers: {
        'Authorization': bearerToken
      }
    });
  }

  getGenres(): Observable<any> {
    const urlGenres = `${this.baseUrl}/genre/movie/list?language=en-US`;
    return this.http.get(urlGenres, {
      headers: {
        'Authorization': bearerToken
      }
    });
  }

  getMovieDetails(movieId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}&language=en-US`);
  }

  getMovieVideos(movieId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/${movieId}/videos?api_key=${this.apiKey}&language=en-US`);
  }

  searchMovies(query: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search/movie`, {
      params: {
        api_key: this.apiKey,
        query: query,
        include_adult: 'false',
        language: 'en-US',
        page: '1'
      },
      headers: {
        'Authorization': bearerToken
      }
    });
  }
}
