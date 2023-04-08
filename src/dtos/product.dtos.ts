import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';
//La activación de las validaciones se realiza en el archivo main.ts

export class CreateProductDtos {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly description: string;
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number;
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly stock: number;
  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
}

export class UpdateProductDtos {
  readonly name?: string;
  readonly description?: string;
  readonly price?: number;
  readonly stock?: number;
  readonly image?: string;
}
