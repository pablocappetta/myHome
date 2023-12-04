
![Logo](https://i.imgur.com/CyBY6ZQ.jpg)


# myHome 

myHome es una app ficticia desarrollada para cumplir con los requerimientos de la materia Desarrollo de Aplicaciones I. 



## Features

- ABM Usuarios
- ABM Propiedades (Listings)
- ABM Reservas
- ABM Reseñas
- Recomendaciones por cercanía (Geolocation)
- Dark mode
- Google Sign-In
- Material Design 3 (React Native Paper)
## Autores

- [@pablocappetta](https://www.github.com/pablocappetta) - 1120335
- [@mateost](https://www.github.com/mateost) - 1105771
- [@carlablanco](https://www.github.com/carlablanco) - 1131968
- [@serg2404](https://www.github.com/serg2404) - 112639
- [@fedese08](https://www.github.com/fedese08) - 1112998



## Instalación

Dependencias de API y UI

```bash
  cd api-myhome
  npm install
  cd ..
  cd ui-myhome
  npm install
```
## Variables de Entorno

Para poder correr este proyecto, necesitás las siguientes variables de entorno en tu archivo .env

#### API:

- `NODE_ENV`: Entorno de ejecución
- `PORT`: Puerto de escucha para el servidor Express
- `CONNECTION_STRING`: Cadena de conexión a la base de datos MongoDB
- `PRIVATE_KEY`: Clave privada para la aplicación (usada para firmar tokens)
- `SALT`: Valor de SALT para mejorar la seguridad en el almacenamiento de contraseñas
- `EMAIL_USER`: Usuario del servidor de correo electrónico para enviar correos desde la aplicación
- `EMAIL_PASSWORD`: Clave del servidor de correo electrónico
- `IMGUR_CLIENT_ID`: ID de cliente de IMGUR para el almacenamiento de las imágenes

#### UI:

- `NODE_ENV`: Entorno de ejecución
- `PORT`: Puerto de escucha para el servidor Express
- `REACT_APP_API_URL`: Endpoint de la instancia de EC2
- `GOOGLE_APIKEY`: API key de Google para el funcionamiento de servicios de login y registro de usuarios
## Ejecución

#### API:

Para ejecutar el servidor del backend:

```
npm start
```

Este comando iniciará el servidor backend y estará listo para gestionar las solicitudes.

#### UI:


1. Asegurarse de tener Android Studio y el emulador de Android en funcionamiento.

2. Ejecute: 

```
npx expo start
```

3. Presione la tecla 'A' en la consola para iniciar la instancia de desarrollo.


## Capturas de Pantalla

![Captura1](https://i.imgur.com/nzpqnXm.png)
![Captura2](https://i.imgur.com/FuflmUd.png)
![Captura3](https://i.imgur.com/jHwdoC0.png)


## Tecnologías

**Client:** React Native, React Native Paper, Expo, TailwindCSS

**Server:** Node, Express, MongoDB, Atlas, Amazon EC2

## Licencia

[MIT](https://choosealicense.com/licenses/mit/)

