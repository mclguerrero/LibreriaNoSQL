// 1. "Authors" - Actualiza el nombre y el país del autor con _id 1, estableciendo también la fecha de actualización. Si no existe, se inserta el autor y se establece la fecha de creación.

db.authors.updateOne(
  { _id: 1 },
  {
    $set: {
      name: "Miguel de Cervantes",
      country: "España",
      updatedAt: new Date()
    },
    $setOnInsert: { 
      createdAt: new Date() 
    }
  },
  { upsert: true }
)

// 2. "Books" - Actualiza el precio y el stock del libro con _id 1, además de la fecha de modificación.

db.books.updateOne(
  { _id: 1 },
  {
    $set: {
      price: 59900,
      stock: 30,
      updatedAt: new Date()
    }
  }
)

// 3. "Orders" - Actualiza el total de la orden con _id 1 y añade nuevos libros (ID 3 y 4) a la lista de libros en la orden, estableciendo la fecha de modificación.

db.orders.updateOne(
  { _id: 1 },
  {
    $set: {
      total: 111800,
      updatedAt: new Date()
    },
    $push: {
      books: {
        $each: [
          { book_id: 3, quantity: 1 },
          { book_id: 4, quantity: 2 }
        ]
      }
    }
  }
)

// 4. "Roles" - Actualiza el nombre del rol con _id 1 y establece la fecha de modificación. Si el rol no existe, se inserta y se establece la fecha de creación.

db.roles.updateOne(
  { _id: 1 },
  {
    $set: {
      name: "Administrador",
      updatedAt: new Date()
    },
    $setOnInsert: {
      createdAt: new Date()
    }
  },
  { upsert: true }
)

// 5. "Users" - Actualiza el primer nombre del usuario con _id 1 y añade nuevos números de teléfono y roles a su perfil, así como la fecha de modificación.

db.users.updateOne(
  { _id: 1 },
  {
    $set: {
      "profile.firstName": "Juan Miguel",
      updatedAt: new Date()
    },
    $push: {
      "profile.phones": {
        $each: ["456789123", "321987654"]
      },
      roles: {
        $each: [3, 4]
      }
    }
  }
)