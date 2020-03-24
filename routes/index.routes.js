var express = require('express');
var router = express.Router();
const {renderIndex, renderAbout, probar} = require('../controllers/index.controller');

/* GET home page. */
router.get('/', renderIndex);

router.get('/about', renderAbout);

//  Para hacer pruebas
router.get('/probar', probar);

module.exports = router;