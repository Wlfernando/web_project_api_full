# Tripleten web_project_api_full

## Descripción general

* Introducción
* Pagina
* Registro
* Autenticación
* Clave secreta

## Introducción

El proyecto implementa tanto frontEnd como Backend trabajando en un servidor 24/7.

## Pagina

![Aqui](https://www.balam.maya.se/signin) puedes encontrar la pagina servida.

## Registro

Para registrar a los usuarios se solicita un correo electrónico (en este caso no es necesario que este activo) y una contraseña. 

La contraseña es procesada por el modulo bcrypt para obtener un hash, refuerza la seguridad al momento de almasenaje en la base de datos.

## Autenticación

Se pide ingresar el correo y la contraseña. El servidor buscara primero al usuario por su correo, si no lo encuentra, rechazará la promesa. De tener al usuario, comparara contraseñas con bcrypt, si no es la misma, rechazará la promesa con el mismo mensaje génerico para ambos casos *Incorrect password or email*. 

Se prepara el envio de "jsonwebtoken". Se emplea su correspondiente módulo, el metodo es sign al cual se emplea la id del usuario, una llave que se encuentra guardada en .env y se configura a un periodo de 7d de caducidad.

Como respuesta se envia unicamente el token.

El cliente mantendra acceso a la aplicación enviando la autenticación en cada petición con el método Bearer concatenado al jwt. Ya el servidor se encarga de recuperar el id y comprobar la vigencia del token.

## Clave secreta

E
