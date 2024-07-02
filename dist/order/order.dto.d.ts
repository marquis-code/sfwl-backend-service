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
