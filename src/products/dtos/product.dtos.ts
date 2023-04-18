import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';
//La activación de las validaciones se realiza en el archivo main.ts

import { PartialType } from '@nestjs/swagger';

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

// Personalizar respuesta
/* export class Dto {
  @IsNotEmpty()
  @IsString({message: 'My custom message'})
  name: string;
} */

export class UpdateProductDtos extends PartialType(CreateProductDtos) {}
