import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
export declare class ValidateMongoId implements PipeTransform {
    transform(id: any, metadata: ArgumentMetadata): any;
}
