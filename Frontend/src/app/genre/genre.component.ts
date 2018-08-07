import { Component, OnInit } from '@angular/core';
import { Genre } from '../models/genre.model';
import { GenreService } from '../services/genre.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {
  
  genrelist: Genre[];

  new_genre = {name: ''};
  
  constructor(private genreservice: GenreService) { }
  
  ngOnInit() {
    this.getgenres();
  }
  getgenres() {
    this.genreservice.getGenres()
      .subscribe(data => this.genrelist = data);
  }
  newgenre() {
    this.genreservice.postGenre(this.new_genre)
      .subscribe(() => this.getgenres());
    this.new_genre.name = '';
  }
}
