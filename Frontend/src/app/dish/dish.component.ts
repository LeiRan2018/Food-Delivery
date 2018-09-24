import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../models/dish.model';
import { DishService } from '../services/dish.service';
import { Genre } from '../models/genre.model';
import { GenreService } from '../services/genre.service';
import { Observable } from 'rxjs';
import { BillService } from '../services/bill.service';
import { Bill } from '../models/bill.model';
import { AuthService } from '../auth/auth.service';
import { element } from '@angular/core/src/render3/instructions';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit {
  bill: Bill;
  dishes: Dish[];
  genres: Genre[];
  created = false;
  orderlist = [];
  newdish_token = false;
  auth_token = (this.auth.loggedIn) ? true : false;
  newdish_text = "create";
  text = 0;
  test_form: FormGroup
  newtest: any;
  new_dish = {
    name: '',
    price: '',
    number: '',
    genre: '',
  }
  newmenuvalue = [];
  constructor(
    private dishservice: DishService,
    private genreservice: GenreService,
    private billservice: BillService,
    public auth: AuthService,
    private fb: FormBuilder,
  ) {
    this.test_form = this.fb.group({
      dishes: this.fb.array([])
    })
   }

  ngOnInit() {
    this.getdishes();
  }

  getdishes() {
    this.dishservice.getDishes()
      .subscribe(data => {
        this.dishes = data;
        this.dishes.forEach(element =>{
          (<FormArray>this.test_form.get('dishes')).push(this.fb.group({
            id: [element._id],
            name:[element.name],
            price: [element.price],
            number: [element.number],
            new: 0
          }))
        })
      });
    this.genreservice.getGenres()
      .subscribe((data) => { this.genres = data });
    if (this.auth.loggedIn) {
      this.billservice.getBill$(this.auth.userProfile.sub)
        .subscribe(data => {
          this.bill = data;
          this.created = (this.bill) ? true : false;
          if (this.created) {
            let temp = data.dishes.reduce((alldata, data) => {
              var key = data['_id'];
              if (!alldata[key]) { alldata[key] = [] }
              alldata[key].push(data)
              return alldata;
            }, []);
            this.orderlist = Object.entries(temp);
          }
        });
    }
  }
  newdish() {
    if (!this.newdish_token) {
      this.newdish_token = true;
      this.newdish_text = "hide";
    } else {
      this.newdish_token = false;
      this.newdish_text = "create";
    }
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
  createbill() {
    let menu = [];
    this.newmenuvalue.map(element => menu.push(element._id));
    this.billservice.postBill({ 'userId': this.auth.userProfile.sub, 'dishes': menu })
      .subscribe(() => this.getdishes());
    this.newmenuvalue = [];
  }

  deletebill(id) {
    this.billservice.deleteBill(id)
      .subscribe(() => this.getdishes());
  }

  @Input()
  get menulist() {
    let abc = this.newmenuvalue.reduce((alldata, data) => {
      var key = data['_id'];
      if (!alldata[key]) { alldata[key] = [] }
      alldata[key].push(data)
      return alldata;
    }, []);
    return Object.entries(abc);
  }

  set menulist(value) {
    this.newmenuvalue = value;
  }

  get totalcost() {
    let ttt = [];
    this.newmenuvalue.map(element => ttt.push(element.price));
    let rrr = 0;
    ttt.forEach(element => {
      rrr += parseInt(element);
    });
    return rrr;
  }

  adddish(dish: Dish) {
    let temp = this.newmenuvalue;
    temp.push(dish);
    this.menulist = temp;
  }

  deletedish(dish: Dish) {
    let temp = this.newmenuvalue;
    let i = temp.indexOf(dish);
    if (i > -1) {
      temp.splice(i, 1);
      this.menulist = temp;
    }
  }
  newadddish(id) {
    (<FormArray>this.test_form.controls['dishes']).at(id).patchValue({
      new:  this.test_form.value.dishes[id].new +1
    })
  }
  newdeletedish() {}

}
