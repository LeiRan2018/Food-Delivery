export class BillFormBase<T> {
    value: T;
    _id: string;
    label: string;
    required: boolean;
    order: number;
    controlType: string;
  
    constructor(options: {
        value?: T,
        _id?: string,
        label?: string,
        required?: boolean,
        order?: number,
        controlType?: string
      } = {}) {
      this.value = options.value;
      this._id = options._id || '';
      this.label = options.label || '';
      this.required = !!options.required;
      this.order = options.order === undefined ? 1 : options.order;
      this.controlType = options.controlType || '';
    }
  }