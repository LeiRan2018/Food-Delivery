import { Component, OnInit } from '@angular/core';
import { Dish } from '../models/dish.model';
import { DishService } from '../services/dish.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit {

  dishes: Dish[];

  constructor(private dishservice: DishService) { }

  ngOnInit() {
    this.getdishes();
  }
  getdishes() {
    this.dishservice.getDish()
      .subscribe(data => this.dishes = data);
  }

}
