import { Component, OnInit } from '@angular/core';
import { Dish } from '../models/dish.model';
import { DishService } from '../services/dish.service';
import { Genre } from '../models/genre.model';
import { GenreService } from '../services/genre.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit {

  dishes: Dish[];
  genres: Genre[];
  new_dish = {
    name: '',
    price: '',
    number: '',
    genre: '',
  }
  constructor(
    private dishservice: DishService,
    private genreservice: GenreService
  ) { }

  ngOnInit() {
    this.getdishes();
  }

  getdishes() {
    this.dishservice.getDishes()
      .subscribe(data => this.dishes = data);
    this.genreservice.getGenres()
      .subscribe((data) => { this.genres = data})
  }

  createdish() {
    this.dishservice.postDish(this.new_dish)
      .subscribe(() => this.getdishes())
    this.new_dish = {
      name: '',
      price: '',
      number: '',
      genre: '',
    }
  }

}
