# Tripleten web_project_api_full

## Descripción general

* Introducción
* Pagina
* Registro
* Autenticación
* Firmar los jwt
* Manejo centralizado de errores
* Validación previa al controlador de la base de datos
* Logs
* Servidor

## Introducción

El proyecto implementa tanto frontEnd como Backend trabajando en un servidor 24/7.

## Pagina

[Aqui](https://www.balam.maya.se/signin) puedes encontrar la pagina servida.

## Registro

Para registrar a los usuarios se solicita un correo electrónico (en este caso no es necesario que este activo) y una contraseña. 

La contraseña es procesada por el módulo bcrypt para obtener un hash, refuerza la seguridad al momento de almasenaje en la base de datos.

## Autenticación

Se pide ingresar el correo y la contraseña. El servidor buscara primero al usuario por su correo, si no lo encuentra, rechazará la promesa. De tener al usuario, comparara contraseñas con bcrypt, si no es la misma, rechazará la promesa con el mismo mensaje génerico para ambos casos *Incorrect password or email*. 

Se prepara el envio de "jsonwebtoken". Se emplea su correspondiente módulo, el metodo es sign al cual se emplea la id del usuario, una llave que se encuentra guardada en .env y se configura a un periodo de 7d de caducidad.

Como respuesta se envia unicamente el token.

El cliente mantendra acceso a la aplicación enviando la autenticación en cada petición con el método Bearer concatenado al jwt. Ya el servidor se encarga de recuperar el id y comprobar la vigencia del token.

## Firmar los jwt

El recurso es generado con el módulo "crypto" garantizando una clave criptográfica compleja y pseudoaleatório.

## Manejo centralizado de errores

Se puede encontrar en el middleware hasError. Se escribió como un switch. Se pretende modificar a futuro para tener más libertad en el manejo de errores.

## Validación previa al controlador de la base de datos

Se hace uso de librerias como celebrate y joi para los datos ingresados al servidor mejorando la protección del mismo.

El manejo de errores encontrados por estas librerias se emplea el metodo que ofrece celebrate.

## Logs

Se emplea Winston y expressWinston para introducir en la aplicación loggers. Uno para el request y otro para el manejo del error. Estos cubren las rutas para tener un control basico de las solicitudes.

## Servidor

El servidor esta creado en Google Cloud, tiene los puertos 80 y 443 abiertos para las solicitudes http y https. Utiliza nginx para el redireccionamiento interno al puerto 3000 y servir ahi los recursos que estan en ejecución. Se mantiene en ejecución gracias al paquete de pm2 y es capaz de soportar caidas imprevistas. Los nombres de dominio fueron generados en FreeDNS.

Se usa certbot para mejorar la seguridad de la pagina, recurso que nos proporciona certificados para TLS (SSL).
