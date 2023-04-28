import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsArray,
  IsOptional,
  Min,
} from 'class-validator';
//La activación de las validaciones se realiza en el archivo main.ts

import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateProductDtos {
  @IsString()
  @IsNotEmpty()
  //Debemos agregar estos apiproperti en cada atributo para no tener problemas en el update
  @ApiProperty({ description: `product's name` })
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly description: string;
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly price: number;
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly stock: number;
  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  readonly image: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly brandId: number;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  readonly categoriesId: number[];
}

// Personalizar respuesta
/* export class Dto {
  @IsNotEmpty()
  @IsString({message: 'My custom message'})
  name: string;
} */

export class UpdateProductDtos extends PartialType(CreateProductDtos) {}

export class FilterProductDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
