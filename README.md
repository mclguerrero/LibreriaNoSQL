# BD NoSQL - Librería

## Descripción

Este proyecto se centra en la gestión de una librería, aprovechando las capacidades de MongoDB como base de datos NoSQL. La base de datos está diseñada para almacenar de manera eficiente y flexible información sobre libros, autores, roles, usuarios y órdenes. 

## Requisitos

- **MongoDB**
- **MongoDB Compass** o **Studio 3T**
- **MongoDB Tools**

## Estructura de la Base de Datos

### Colección: `authors`

```bash
{
  "_id": 1,
  "name": "Gabriel García Márquez",
  "country": "Colombia",
  "createdAt": ISODate("2024-10-17T10:00:00Z"),
  "updatedAt": ISODate("2024-10-17T10:10:00Z")
}
```

### Colección: `books`

```bash
{
  "_id": 1,
  "title": "Cien Años de Soledad",
  "isbn": "978-3-16-148410-0",
  "genre": "Ficción",
  "publicationDate": { "$date": "1605-01-16T00:00:00Z" },
  "price": 59900,
  "costPrice": 45900,
  "isActive": true,
  "stock": 30,
  "authors": [1],
  "pageCount": 274,
  "createdAt": { "$date": "2024-10-15T00:00:00Z" },
  "updatedAt": { "$date": "2024-10-15T00:00:00Z" }
}
```

### Colección: `roles`

```bash
{
  "_id": 1,
  "name": "Cliente",
  "createdAt": ISODate("2024-10-17T10:00:00Z"),
  "updatedAt": ISODate("2024-10-17T10:10:00Z")
}
```

### Colección: `users`

```bash
{
  "_id": 1,
  "email": "juanperez@gmail.com",
  "password": "12345678",
  "profile": {
    "_id": 1,
    "firstName": "Juan Miguel",
    "lastName": "Pérez",
    "address": "Calle Falsa 123",
    "phones": ["123456789", "987654321"]
  },
  "roles": [1, 2],
  "createdAt": { "$date": "2024-10-15T00:00:00Z" },
  "updatedAt": { "$date": "2024-10-15T00:00:00Z" }
}
```

### Colección: `orders`

```bash
{
    "_id": 1,
    "user_id": 1,
    "books": [
      {
        "book_id": 1,
        "quantity": 2
      },
      {
        "book_id": 2,
        "quantity": 1
      }
    ],
    "total": 111800,
    "createdAt": { "$date": "2024-10-15T00:00:00Z" },
    "updatedAt": { "$date": "2024-10-15T00:00:00Z" }
  }
```

## Consultas de Actualización

Los scripts de actualización de la base de datos se encuentran en el archivo `scripts/update_queries.js`, donde se actualizan autores, libros, usuarios, órdenes y roles.

* Consulta de actualización:

```javascript

// Actualizar el nombre y país del autor con _id 1

db.authors.updateOne(
  { _id: 1 },
  {
    $set: { 
      name: "Miguel de Cervantes", 
      country: "España", 
      updatedAt: new Date() 
    },
    $setOnInsert: { createdAt: new Date() }
  },
  { upsert: true }
);
```

## **Importar Backup Dump** (`.bson`)

#### Pasos:
1. Abre tu terminal o consola de comandos.
2. Ve al directorio donde se encuentra tu backup (el que contiene los archivos `.bson`).
   
   ```bash
   cd "C:\Users\USER\Desktop\LibreriaNoSQL\backups"
   ```

3. Ejecuta el siguiente comando para restaurar todo el dump:

   ```bash
   mongorestore --db libreria ./dumps_2024-10-17_10-14-00/
   ```

   Esto restaurará todas las colecciones del dump (`authors`, `books`, `orders`, etc.) en la base de datos `libreria`.

4. Si quieres restaurar una colección específica, puedes hacerlo de la siguiente manera:

   ```bash
   mongorestore --db libreria --collection books ./dumps_2024-10-17_10-14-00/books.bson
   ```

## **Importar Archivos JSON** (`.json`)

#### Pasos:
1. Abre tu terminal o consola de comandos.
2. Ve al directorio donde se encuentran los archivos JSON exportados.

   ```bash
   cd "C:\Users\USER\Desktop\LibreriaNoSQL\backups\json_exports_2024-10-17_10-14-00"
   ```

3. Para importar un archivo JSON a una colección específica, usa el siguiente comando:

   ```bash
   mongoimport --db libreria --collection books --file ./books.json --jsonArray
   ```

   **Explicación**:
   - `--db libreria`: Indica la base de datos en la que se importarán los datos.
   - `--collection books`: Especifica la colección de destino.
   - `--file ./books.json`: Ruta al archivo JSON que deseas importar.
   - `--jsonArray`: Indica que los datos están en formato de arreglo JSON (esto es necesario si el archivo JSON contiene múltiples documentos dentro de un arreglo).

4. Repite el proceso para cada archivo JSON que desees importar:

   ```bash
   mongoimport --db libreria --collection authors --file ./authors.json --jsonArray
   ```

### Consideraciones:
- Antes de importar, asegúrate de que la estructura de los datos en los archivos `.json` coincida con la estructura de la base de datos.
- Si los datos ya existen en la base de datos, el comando `mongoimport` no actualiza los documentos existentes, sino que añade nuevos. Para actualizaciones, deberás usar scripts o consultas específicas en MongoDB.