// 1. Filtrar Ordenes 
db.orders.aggregate([
  { $match: { total: { $gt: 145000 } } }
]);

// 2. Agrupar Gastos por Usuario
db.orders.aggregate([
  { $group: { _id: "$user_id", totalSpent: { $sum: "$total" }, count: { $sum: 1 } } }
]);

// 3. Ordenar Ordenes por Fecha de Creación
db.orders.aggregate([
  { $sort: { created_at: -1 } }
]);

// 4. Proyectar Campos Específicos
db.orders.aggregate([
  { $project: { books: 1, total: 1, user_id: 1 } }
]);

// 5. Limitar el Número de Resultados
db.orders.aggregate([
  { $limit: 5 }
]);

// 6. Omitir Resultados
db.orders.aggregate([
  { $skip: 1 },
  { $limit: 2 }
]);

// 7. Descomponer Libros en Ordenes
db.orders.aggregate([
  { $unwind: "$books" }
]);

// 8. Unir Información del Usuario
db.orders.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "user_id",
      foreignField: "_id",
      as: "userInfo"
    }
  }
]);

// 9. Unir Información del Usuario y Filtrar (Inner Join)
db.orders.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "user_id",
      foreignField: "_id",
      as: "userInfo"
    }
  },
  {
    $match: {
      "userInfo": { $ne: [] }
    }
  }
]);

// 10. Calcular Ganancia de Libros
db.books.aggregate([
  { $addFields: { profit: { $subtract: ["$price", "$cost_price"] } } }
]);

// 11. Contar el Total de Ordenes
db.orders.aggregate([
  { $count: "totalOrders" }
]);

// 12. Suma Total de Pagos ($sum)
db.orders.aggregate([
   { $group: { _id: null, totalOrders: { $sum: "$total" } } }
]);

// 13. Promedio de Ordenes ($avg)
db.orders.aggregate([
   { $group: { _id: null, averageOrderTotal: { $avg: "$total" } } }
]);

// 14. Valor Mínimo de Ordenes ($min)
db.orders.aggregate([
   { $group: { _id: null, minOrderTotal: { $min: "$total" } } }
]);

// 15. Valor Máximo de Ordenes ($max)
db.orders.aggregate([
   { $group: { _id: null, maxOrderTotal: { $max: "$total" } } }
]);

// 16. Crear un Array de Estados de Ordenes ($push)
db.orders.aggregate([
   { $group: { _id: "$user_id", orderStatuses: { $push: "$status" } } }
]);

// 17. Array Único de Estados de Ordenes ($addToSet)
db.orders.aggregate([
   { $group: { _id: "$user_id", uniqueStatuses: { $addToSet: "$status" } } }
]);
