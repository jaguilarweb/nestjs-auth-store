import { SetMetadata } from '@nestjs/common';
//Se centraliza el valor de la variable y se puede usar en otras partes ya que usa export.
export const IS_PUBLIC_KEY = 'isPublic';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
