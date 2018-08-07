import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Genre } from '../models/genre.model';
import { GenreService } from '../services/genre.service';

@Component({
  selector: 'app-genre-detail',
  templateUrl: './genre-detail.component.html',
  styleUrls: ['./genre-detail.component.css']
})
export class GenreDetailComponent implements OnInit {
  genre: Genre;
  new_genre = {name: ''};

  constructor(
    private route: ActivatedRoute,
    private genreservice: GenreService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getGenre();
  }

  getGenre() {
    const id = this.route.snapshot.paramMap.get('id')
    this.genreservice.getGenre(id)
      .subscribe(genre => this.genre = genre)
  }

  updateGenre() {
    const id = this.route.snapshot.paramMap.get('id')
    this.genreservice.updateGenre(id, this.new_genre)
      .subscribe(() => this.getGenre())
    this.new_genre.name = '';
  }

  goBack() {
    this.location.back();
  }

  delete(id) {
    this.genreservice.deleteGenre(id)
      .subscribe(() => this.goBack())
  }
}
