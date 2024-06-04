# 🌐 Web Scraping con Puppeteer y API con Express.js

Este proyecto es una aplicación de Node.js que utiliza Puppeteer para realizar web scraping y Express.js para proporcionar una API con tres rutas principales.

## 🚀 Funcionalidades

1. **Buscar todos los textos de los elementos que tienen un selector específico.**
2. **Buscar el elemento o los elementos cuyo texto coincide exactamente con el título proporcionado.**
3. **Tomar una captura de pantalla de una página web.**

---

## 📦 Instalación

1. Clona este repositorio:
    ```sh
    git clone https://github.com/AbrahamBass/scraper.git
    ```
2. Navega al directorio del proyecto:
    ```sh
    cd tu_repositorio
    ```
3. Instala las dependencias:
    ```sh
    npm install
    ```

## 📝 Uso

1. Inicia el servidor:
    ```sh
    npm run dev
    ```
2. Realiza solicitudes a la API utilizando las rutas descritas a continuación.

---

## 📚 Rutas de la API

### 1. Obtener textos por atributo

- **Ruta:** `/get/by/atribute`
- **Método:** `GET`
- **Descripción:** Obtiene todos los textos de los elementos que coinciden con el selector CSS proporcionado.
- **Parámetros:**
  - `url` (string): URL de la página web.
  - `selector` (string): Selector CSS para los elementos deseados.
- **Retorno:** Array de textos encontrados.
- **Ejemplo de solicitud:**
    ```sh
    curl "http://localhost:3000/get/by/atribute?url=https://ejemplo.com&selector=#about"
    ```
- **Respuesta:**
    ```json
    [
        "Texto del primer elemento",
        "Texto del segundo elemento",
        ...
    ]
    ```

### 2. Buscar elementos por título

- **Ruta:** `/get/by/title`
- **Método:** `GET`
- **Descripción:** Busca elementos cuyo texto coincida exactamente con el título proporcionado.
- **Parámetros:**
  - `url` (string): URL de la página web.
  - `title` (string): Texto exacto a buscar.
- **Retorno:** Elementos encontrados con su texto, ID y clase.
- **Ejemplo de solicitud:**
    ```sh
    curl "http://localhost:3000/get/by/title?url=https://ejemplo.com&title=Texto exacto"
    ```
- **Respuesta:**
    ```json
    [
        {
            "text": "Texto exacto",
            "id": "elemento-id",
            "class": "elemento-clase"
        },
        ...
    ]
    ```

### 3. Capturar pantalla

- **Ruta:** `/screenshot`
- **Método:** `GET`
- **Descripción:** Toma una captura de pantalla de la página web especificada.
- **Parámetros:**
  - `url` (string): URL de la página web.
- **Retorno:** Captura de pantalla en formato de imagen.
- **Ejemplo de solicitud:**
    ```sh
    curl "http://localhost:3000/screenshot?url=https://ejemplo.com" -o screenshot.png
    ```

---

## 📄 Documentación con Swagger

Este proyecto utiliza Swagger para documentar la API. Puedes acceder a la documentación interactiva de Swagger en la siguiente ruta:

- **URL:** `http://localhost:3000/api-docs`

---

## 🛠️ Contribuciones

Las contribuciones son bienvenidas. Para contribuir, sigue estos pasos:

1. Bifurca este repositorio.
2. Crea una rama nueva (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y confirma tus cambios (`git commit -m 'Añadir nueva funcionalidad'`).
4. Empuja tu rama a GitHub (`git push origin feature/nueva-funcionalidad`).
5. Crea una solicitud de extracción.

---

¡Gracias por utilizar esta API! Si tienes alguna pregunta o problema, no dudes en abrir un issue en GitHub.


