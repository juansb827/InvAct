const express = require('express');
const router = express.Router();
const { sequelize } = require('../models');



// UPDATES A SINGLE USER IN THE DATABASE
router.get('/activate/:token', function (req, res) {    
    const tokenFac = req.params.token;
    const action = req.query.action;
    const destino = req.query.destino;
    console.log("Params", destino, tokenFac, action);     
    
    sequelize.query("exec dbo.sp_m12grabaEnvioFactura ?,?,?", {
        raw: true, 
        replacements: [destino, tokenFac, action  ] //'PRUEBAS','980051579',1
    })
        .then(myTableRows => {
            console.log(myTableRows)
        res.status(200).send(`Operación Exitosa`);
    }).catch(err=>{
        res.status(500).send('Error al activar la factura');
        console.error(err);
    });
    
        
    
});

module.exports = router;