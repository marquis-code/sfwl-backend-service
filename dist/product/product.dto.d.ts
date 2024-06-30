export declare class ProductDto {
    name: string;
    description: string;
    readonly price: number;
    readonly currentInStock: number;
    category: string;
    cloudinary_id?: string;
    image?: string;
}
export declare class UpdateProductDto {
    name?: string;
    description?: string;
    price?: number;
    currentInStock?: number;
    category?: string;
    cloudinary_id?: string;
    image?: string;
}
export interface UpdateProductWithCreatedByDto extends UpdateProductDto {
    createdBy?: string;
}
