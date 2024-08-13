declare class OrderItemDto {
    product: string;
    quantity: number;
    vendorId: string;
    price: number;
}
export declare class CreateOrderDto {
    items: OrderItemDto[];
    user: string;
    location: {
        type: "Point";
        coordinates: [number, number];
    };
    erranderId?: string;
    address: number;
    phone: number;
    orderNotes: number;
    paymentType: number;
    isNewUser: boolean;
    isSubscription: boolean;
    startDate: Date;
    endDate: Date;
    status: string;
    totalPrice: number;
}
export declare class UpdateOrderDto {
    items?: OrderItemDto[];
    location?: {
        type: "Point";
        coordinates: [number, number];
    };
}
export {};
