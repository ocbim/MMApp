const indexCtrl = {};

indexCtrl.renderIndex = (req, res)=>{
    res.render('index');
};

indexCtrl.renderAbout = (req, res)=>{
    res.render('about');
};

indexCtrl.probar = (req, res) =>{
    res.render('probar');
}

module.exports = indexCtrl;