export class Dish {
    _id: string;
    name: string;
    price: string;
    status: string;
    number: string;
    genre: string;
    date: Date;
    constructor() {
        this.name = '';
        this.price = '';
        this.genre = '';
        this.date = new Date();
    }
}
