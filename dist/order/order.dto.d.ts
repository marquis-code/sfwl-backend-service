declare class OrderItemDto {
    product: string;
    quantity: number;
}
export declare class CreateOrderDto {
    items: OrderItemDto[];
    user: string;
    location: {
        type: 'Point';
        coordinates: [number, number];
    };
}
export declare class UpdateOrderDto {
    items?: OrderItemDto[];
    location?: {
        type: "Point";
        coordinates: [number, number];
    };
}
export {};
