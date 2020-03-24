const { Router } = require("express");
const router = Router();
const { estaAutenticado } = require("../helpers/auth");

const {
  renderOrdenesForm,
  createNewOrdenes,
  renderOrdenes,
  renderEditForm,
  updatesOrdenes,
  deleteOrdenes,
  apiedit
} = require("../controllers/ordenes.controller");

//  Nuevas ordenes
router.get("/ordenes/add", estaAutenticado, renderOrdenesForm);

router.post("/ordenes/new-ordenes", estaAutenticado, createNewOrdenes);

//  Obtener todas las ordenes
router.get("/ordenes", estaAutenticado, renderOrdenes);

// Editar Ordenes con el metodo Put y Get
router.get("/ordenes/edit/:id", estaAutenticado, renderEditForm);

router.put("/ordenes/edit/:id", estaAutenticado, updatesOrdenes);

// Borrar Ordenes con el metodo delete
router.delete("/ordenes/delete/:id", estaAutenticado, deleteOrdenes);

//  Api
router.get("/api/edit/:id", apiedit);

//  Exportamos las rutas
module.exports = router;
