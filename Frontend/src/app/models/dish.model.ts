export class Dish {
    _id: string;
    name: string;
    price: string;
    status: string;
    number: string;
    genre: any;
    created_at: Date;
    modified_at: Date;
    constructor() {
        this.name = '';
        this.price = '';
        this.genre = '';
        this.created_at = new Date();
        this.modified_at = new Date();
    }
}
