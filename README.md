# TPO Aplicaciones Distribuidas "myHome" - 2C2023
## _Grupo 4_

### Integrantes:

- Blanco, Carla (LU 1131968)
- Cappetta, Pablo (LU 1120335)
- Garroni, Sergio (LU 112639)
- Sena, Federico (LU 1112998)
- Stornelli, Mateo (LU 1105771)

## Backend

- Node.js
- Base de datos MongoDB

### Archivo .env

Es necesario configurar las variables de entorno para el backend. Copie el archivo `.env.example` como `.env` y complete los valores correspondientes para su entorno de desarrollo.

- `NODE_ENV`: Entorno de ejecución
- `PORT`: Puerto de escucha para el servidor Express
- `CONNECTION_STRING`: Cadena de conexión a la base de datos MongoDB
- `PRIVATE_KEY`: Clave privada para la aplicación (usada para firmar tokens)
- `SALT`: Valor de sal para mejorar la seguridad en el almacenamiento de contraseñas
- `EMAIL_USER`: Usuario del servidor de correo electrónico para enviar correos desde la aplicación
- `EMAIL_PASSWORD`: Clave del servidor de correo electrónico
- `IMGUR_CLIENT_ID`: ID de cliente de Imgur para el almacenamiento de las imágenes


### Ejecutar

Para inicializar el proyecto por primera vez o al traer actualizaciones:
```
npm install
```
Este comando instalará todas las dependencias necesarias para el correcto funcionamiento del proyecto.

Para ejecutar el servidor del backend:
```
node app.js
```
Este comando iniciará el servidor backend y estará listo para gestionar las solicitudes.

## Frontend

### Ejecutar

1. Asegurarse de tener Android Studio y el emulador de Android en funcionamiento.
2. Ejecute: 
```
npm i
npm start
```
3. Presione la tecla 'A' en la consola para iniciar la instancia de desarrollo.
