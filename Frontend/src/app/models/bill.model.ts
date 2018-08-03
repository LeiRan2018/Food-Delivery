export class Bill {
    _id: string;
    customer: string;
    dishes: string[];
    created_at: Date;
    modified_at: Date;
    constructor() {
        this.customer = '';
        this.dishes = [];
        this.created_at = new Date();
        this.modified_at = new Date();
    }
}
