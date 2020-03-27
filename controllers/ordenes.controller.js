const ordenesCtrl = {};
const Ordenes = require("../models/ordenes.model");

// Renderisar formulario de nuevas ordenes
ordenesCtrl.renderOrdenesForm = (req, res) => {
  res.render("ordenes/newordenes");
};

//  Post de nuevas ordenes
ordenesCtrl.createNewOrdenes = async (req, res) => {
  const {
    codOrden,
    typeInstalation,
    meter,
    dateInstalation,
    description,
    point
  } = req.body;

  const newOrdenes = new Ordenes({
    codOrden,
    typeInstalation,
    meter,
    point,
    description,
    dateInstalation
  });
  newOrdenes.user_id = req.user.id;
  await newOrdenes.save();

  req.flash("success_msg", "Orden Agragada con Exito");
  res.redirect("/ordenes");
};

//  Renderisa all Ordenes
ordenesCtrl.renderOrdenes = async (req, res) => {
  const ordenes = await Ordenes.find({ user_id: req.user.id }).sort({
    createdAt: "desc"
  }).lean();

  if (ordenes.length > 0) {
    console.log(ordenes);
    res.render("ordenes/all-ordenes", { ordenes });
  } else {
    res.redirect("/ordenes/add");
  }
};

//  Renderisar Editado de ordenes
ordenesCtrl.renderEditForm = async (req, res) => {
  const ordenes = await Ordenes.findById(req.params.id).lean();
  console.log(ordenes);
  
  if (ordenes.user_id != req.user.id) {
    req.flash("error_msg", "No Autorizado");
    return res.redirect("/ordenes");
  }
  res.render("ordenes/edit-ordenes", { ordenes });
};
//  Metodo que edita en la base de datos las nuevas ordenes
ordenesCtrl.updatesOrdenes = async (req, res) => {
  await Ordenes.findByIdAndUpdate(
    req.params.id,
    ({
      codOrden,
      typeInstalation,
      meter,
      point,
      description,
      dateInstalation
    } = req.body)
  );
  req.flash("success_msg", "Orden Actualizada con Exito");
  res.redirect("/ordenes");
};

ordenesCtrl.deleteOrdenes = async (req, res) => {
  await Ordenes.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Orden Eliminada con Exito");
  res.redirect("/ordenes");
};

//  Renderisar Editado de ordenes
ordenesCtrl.apiedit = async (req, res) => {
  const ordenes = await Ordenes.findById(
    req.params.id,
    "codOrden meter typeInstalation point description dateInstalation"
  );
  res.send(ordenes);
};

module.exports = ordenesCtrl;
