export class Bill {
    _id: string;
    customer: string;
    dishes: string[];
    constructor() {
        this.customer = '';
        this.dishes = [];
    }
}
