const ProductModel = require('../models/products');

module.exports = app => {

  app.get('/products', (req, res) => {
    ProductModel.getProducts((err, data) => {
      res.status(200).json(data);
    });
  });

  app.post('/products', (req, res) => {
    var userData = {
      id: null,
      nome: req.body.nome,
      preco: req.body.preco,
      iamgem: req.body.imagem,
      view:req.body.view
    };
    
    ProductModel.insertUser(userData, (err, data) => {
      if (data && data.insertId) {
        res.status(200).json({
          success: true,
          msg: "Novo produto adicionado!",
          data: data
        });
      } else {
        res.status(500).json({
          success: false,
          msg: "Error"
        });
      }
    });
  });

  app.put('/products/:id', (req, res) => {
    const userData = {
      id: req.params.id,
      nome: req.body.nome,
      preco: req.body.preco,
      imagem: req.body.imagem,
      view: req.body.view
    };
    UserModel.updateUser(userData, function (err, data) {
      if (data && data.msg) {
        res.status(200).json({data});
      } else {
        res.status(500).json({
          success: false,
          msg: 'Error'
        });
      }
    });
  });

  app.delete('/users/:id', (req, res) => {
    var id = req.params.id;
    UserModel.deleteUser(id, (err, data) =>  {
      if (data && data.msg === 'deleted' || data.msg == 'not Exists') {
        res.json({
          success: 'true',
          data
        });
      } else {
        res.status(500).json({
          msg: 'Error'
        });
      }
    });
  });
};
