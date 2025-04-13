// place files you want to import through the `$lib` alias in this folder.

export interface TicketFormData {
    concertId: number;
    email: string;
    name: string;
    phone: string;
    quantity: number;
    creditCard: string;
    expiration: string;
    securityCode: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  }
  
  export interface FormErrors {
    [key: string]: string;
  }