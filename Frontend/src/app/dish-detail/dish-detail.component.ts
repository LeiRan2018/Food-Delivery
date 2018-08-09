import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Dish } from '../models/dish.model';
import { DishService } from '../services/dish.service';
@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.css']
})
export class DishDetailComponent implements OnInit {
  dish: Dish;
  // new_dish = {
  //   name: '',
  //   price: '',

  // }
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private dishservice: DishService
  ) { }

  ngOnInit() {
    this.getDish();
  }
  
  getDish() {
    const id = this.route.snapshot.paramMap.get('id');
    this.dishservice.getDish(id)
      .subscribe(data => this.dish = data)
  }

  updateDish() {
    const id = this.route.snapshot.paramMap.get('id');
  }

  goBack() {
    this.location.back();
  }

  delete(id) {
    this.dishservice.deleteDish(id)
      .subscribe(() => this.goBack())
  }

}
