<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Curso NESTJS Autenticación con Passport y JWT

## Descripción
Este curso incorpora la autenticación con Passport y JWT al store que hemos ido creando en la saga de cursos de Nestjs, ofrecidos por Platzi.


## Herramientas

- NodeJS
- NestJS
- TypeORM
- MySQL y/o Postgress
- Docker
- Postman


## Guards

Los guardianes en Nestjs son clases con el decorador @Injectable y tienen una sola responsabilidad. Ellos determinan si un request será manejado por el controlador o no, dependiendo de ciertas condiciones (como permisos, roles, ACLs, etc) presentes en tiempo de ejecución.
Esto a menudo se denomina como autorización. La Autorización (y su prima la Autenticación, con la que suele colaborar) normalmente ha sido manejada por los middleware en las aplicaciones de Express tradicionales. Los Middleware son una buena elección de autenticación ya que elementos como la validación de tokens y asociación de propiedades a los objetos request no están fuertemente conectados con un contexto de ruta en particular (y su metadata).

Pero los middleware, por naturaleza, son tontos. No saben cuál manejador será ejecutado después de llamar a la función 'next()'. Por otra parte, los Guardianes tienen acceso a la instancia 'ExecutionContext' y, por lo tanto, saben exactamente qué es lo siguiente que será ejecutado. 


