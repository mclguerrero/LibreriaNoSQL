# BD NoSQL - Librería

## Descripción

Este proyecto se centra en la gestión de una librería, aprovechando las capacidades de MongoDB como base de datos NoSQL. La base de datos está diseñada para almacenar de manera eficiente y flexible información sobre libros, autores, roles, usuarios y órdenes. 

## Requisitos

- **MongoDB**
- **MongoDB Compass** o **Studio 3T**
- **MongoDB Tools**

## Colecciones de la Base de Datos

### 1. Colección `authors`

**Propósito**: Almacena información sobre los autores.

**Estructura**:

```json
{
    "_id": 1,
    "name": "Miguel de Cervantes",
    "country": "España",
    "birth_date": { "$date": "1547-09-29T00:00:00Z" },
    "death_date": { "$date": "1616-04-23T00:00:00Z" },
    "biography": "Miguel de Cervantes fue un escritor, poeta y dramaturgo...",
    "created_at": { "$date": "2024-10-15T00:00:00Z" },
    "updated_at": { "$date": "2024-10-15T00:00:00Z" }
}
```

**Cardinalidad**: Relación con `books` a través de `authors_books` (muchos a muchos).

---

### 2. Colección `genres`

**Propósito**: Define los géneros literarios disponibles en la librería.

**Estructura**:

```json
{
    "_id": 1,
    "name": "Ficción",
    "description": "Libros que contienen historias inventadas.",
    "created_at": { "$date": "2024-10-15T00:00:00Z" },
    "updated_at": { "$date": "2024-10-15T00:00:00Z" }
}
```

**Cardinalidad**: Relación con `books` a través de `genres_books` (muchos a muchos).

---

### 3. Colección `books` 

**Propósito**: Almacena detalles de los libros en inventario.

**Estructura**:

```json
{
    "_id": 1,
    "title": "El Quijote",
    "isbn": "978-3-16-148410-0",
    "publication_date": { "$date": "1605-01-16T00:00:00Z" },
    "price": { "$numberDecimal": "59900.00" },
    "cost_price": { "$numberDecimal": "45900.00" },
    "is_active": true,
    "stock": 30,
    "page_count": 274,
    "created_at": { "$date": "2024-10-15T00:00:00Z" },
    "updated_at": { "$date": "2024-10-15T00:00:00Z" }
}
```

**Cardinalidad**:
- Relación con `genres` a través de `genres_books` (muchos a muchos).
- Relación con `authors` a través de `authors_books` (muchos a muchos).
- Relación con `orders` (uno a muchos, cada libro puede aparecer en múltiples órdenes).

---

### 4. Colección `genres_books`

**Propósito**: Relaciona géneros con libros.

**Estructura**:

```json
{
    "_id": 1,
    "book_id": 1,
    "genre_id": 1,
    "created_at": { "$date": "2024-10-15T00:00:00Z" },
    "updated_at": { "$date": "2024-10-15T00:00:00Z" }
}
```

**Cardinalidad**: Relación muchos a muchos entre `genres` y `books`.

---

### 5. Colección `authors_books`

**Propósito**: Relaciona autores con libros, especificando el rol del autor en cada libro.

**Estructura**:

```json
{
    "_id": 1,
    "author_id": 1,
    "book_id": 1,
    "contribution_type": "Escritor principal",
    "created_at": { "$date": "2024-10-15T00:00:00Z" },
    "updated_at": { "$date": "2024-10-15T00:00:00Z" }
}
```

**Cardinalidad**: Relación muchos a muchos entre `authors` y `books`.

---

### 6. Colección `orders`

**Propósito**: Almacena pedidos de los usuarios.

**Estructura**:

```json
{
    "_id": 1,
    "user_id": 1,
    "books": [
        { "book_id": 1, "quantity": 2 },
        { "book_id": 2, "quantity": 1 }
    ],
    "total": { "$numberDecimal": "111800.00" },
    "status": "Pendiente",
    "created_at": { "$date": "2024-10-15T00:00:00Z" },
    "updated_at": { "$date": "2024-10-15T00:00:00Z" }
}
```

**Cardinalidad**:
- Relación con `users` (muchos a uno, un usuario puede tener múltiples órdenes).
- Relación con `books` (muchos a muchos, una orden puede incluir varios libros y cada libro puede estar en múltiples órdenes).

---

### 7. Colección `roles`

**Propósito**: Define los roles del sistema.

**Estructura**:

```json
{
    "_id": 1,
    "name": "Administrador",
    "created_at": { "$date": "2024-10-15T00:00:00Z" },
    "updated_at": { "$date": "2024-10-15T00:00:00Z" }
}
```

**Cardinalidad**: Relación con `users` a través de `users_roles` (muchos a muchos).

---

### 8. Colección `users`

**Propósito**: Almacena la información de los usuarios de la librería.

**Estructura**:

```json
{
    "_id": 1,
    "email": "juanperez@gmail.com",
    "password": "12345678",
    "profile": {
        "_id": 1,
        "first_name": "Juan Miguel",
        "last_name": "Pérez",
        "address": "Calle Falsa 123",
        "phones": ["123456789", "987654321"]
    },
    "is_active": true,
    "created_at": { "$date": "2024-10-15T00:00:00Z" },
    "updated_at": { "$date": "2024-10-15T00:00:00Z" }
}
```

**Cardinalidad**:
- Relación con `orders` (uno a muchos, un usuario puede tener varias órdenes).
- Relación con `roles` a través de `users_roles` (muchos a muchos).

---

### 9. Colección `users_roles`

**Propósito**: Relaciona usuarios con roles asignados.

**Estructura**:

```json
{
    "_id": 1,
    "user_id": 1,
    "role_id": 1,
    "created_at": { "$date": "2024-10-15T00:00:00Z" },
    "updated_at": { "$date": "2024-10-15T00:00:00Z" }
}
```

**Cardinalidad**: Relación muchos a muchos entre `users` y `roles`.

---
## **Importar Backup Dump** (`.bson`)

### Pasos para Restaurar un Backup Completo:

1. **Abre tu terminal o consola de comandos**.
   
2. **Navega hasta el directorio donde se encuentra el backup** (el que contiene los archivos `.bson`).
   
   ```bash
   cd "C:\Users\USER\Desktop\LibreriaNoSQL\backups"
   ```

3. **Ejecuta el siguiente comando** para restaurar todo el dump en la base de datos `libreria`:

   ```bash
   mongorestore --db libreria ./dumps_2024-10-17_10-14-00/
   ```

   Este comando restaurará todas las colecciones contenidas en el dump (por ejemplo, `authors`, `books`, `orders`, etc.) en la base de datos `libreria`.

### Pasos para Restaurar una Colección Específica:

Si solo necesitas restaurar una colección en particular (por ejemplo, `books`), usa el siguiente comando:

1. **Ejecuta el comando** para restaurar la colección deseada:

   ```bash
   mongorestore --db libreria --collection books ./dumps_2024-10-17_10-14-00/books.bson
   ```

   En este caso, se está restaurando solo la colección `books`.

---

## **Importar Archivos JSON** (`.json`)

### Pasos para Importar Archivos JSON:

1. **Abre tu terminal o consola de comandos**.
   
2. **Navega hasta el directorio donde se encuentran los archivos JSON exportados**. Por ejemplo:

   ```bash
   cd "C:\Users\USER\Desktop\LibreriaNoSQL\backups\json_exports_2024-10-17_10-14-00"
   ```

3. **Para importar un archivo JSON a una colección específica**, utiliza el siguiente comando:

   ```bash
   mongoimport --db libreria --collection books --file ./books.json --jsonArray
   ```

   **Explicación**:
   - `--db libreria`: Especifica la base de datos en la que se importarán los datos.
   - `--collection books`: Indica la colección de destino (en este caso, `books`).
   - `--file ./books.json`: Ruta al archivo JSON que deseas importar.
   - `--jsonArray`: Indica que los datos están en formato de arreglo JSON, lo cual es necesario si el archivo JSON contiene múltiples documentos dentro de un arreglo.

### Pasos para Importar Otros Archivos JSON:

Si tienes otros archivos JSON que deseas importar (por ejemplo, `authors.json`), repite el proceso utilizando el siguiente comando:

```bash
mongoimport --db libreria --collection authors --file ./authors.json --jsonArray
```

Este comando importará el archivo `authors.json` en la colección `authors` de la base de datos `libreria`.

---
