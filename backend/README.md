# Tripleten web_project_around_express

## Descripción general

*Introducción
*Códigos de estado
*Cors
*Base de datos
*Controladores
*Errores
*Rutas

## Introducción

Api REST, cuenta con los 5 métodos más comunes. Con Node se trabaja junto a la dependencia Express y Mongoose para tener un espacio de trabajo dedicado a a servir los datos que aqui se requisitan.

## Códigos de estado

Se utilizan códigos de errores generales de servidor. Estos son enviados junto a la respuesta con ayuda de express.

## Cors

Unicamente se permite la comunicación con el dominio de la pagina que se sirve en [Around E.E.U.U.](https://www.balam.maya.se/signin)

## Base de datos

Se aprovecha de MongoDB, un NoSQL capaz de servirnos los datos como un JSON.

Con este podemos crear los esquemas que ocuparemos en nuestra base de datos que son para este caso para usuarios y tarjetas. Las tarjetas estan relacionadas con los usuarios por medio de la propiedad con el nombre "ref".

Se emplean difererentes metodos CRUD para acceder a los datos dependiendo de las acciones del cliente.

## Controladores

En el proyecto se aloja una carpeta con todos los controladores para las diferentes rutas. Aquí se identifican posibles errores los cuales son capturados y mandados a next gracias a catch.

## Errores

En la carpeta utils se manejan las clases para los errores personalizados de los códigos de estado.

## Rutas

En su correspondiente carpeta se encuentra unicamente las rutas con sus correspondientes funciones invocadas.
