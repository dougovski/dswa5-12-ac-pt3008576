module.exports = function(app) {
    var Contato = app.models.contato;
    var controller = {};
    var verificaAutenticacao = require('../../config/auth');
    var controller = app.controllers.contato;
    app.route('/contatos')
        .get(verificaAutenticacao, controller.listaTodos)
        .post(verificaAutenticacao, controller.salvaContato);
    app.route('/contatos/:id')
        .get(verificaAutenticacao, controller.obtemContato)
        .delete(verificaAutenticacao, controller.removeContato);
};

    function verificaAutenticacao(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.status('401').json('Não autorizado');
        }
    }

    module.exports = function (app) {
        var controller = app.controllers.contato;
        app.route('/contatos')
            .get(verificaAutenticacao, controller.listaTodos)
            .post(verificaAutenticacao, controller.salvaContato);
        app.route('/contatos/:id')
            .get(verificaAutenticacao, controller.obtemContato)
            .delete(verificaAutenticacao, controller.removeContato);
        };

    controller.listaContatos = function(req, res) {
        Contato.find().exec().then(
            function(contatos) {
                res.json(contatos);
            },
            function(erro) {
                console.error(erro)
                res.status(500).json(erro);
            });
    };

    controller.obtemContato = function(req, res) {
        var _id = req.params.id;
        Contato.findById(_id).exec().then(
            function(contato) {
                if (!contato) throw new Error("Contato não encontrado");
                res.json(contato)
            },
            function(erro) {
                console.log(erro);
                res.status(404).json(erro)
            });
    };

    controller.removeContato = function(req, res) {
        var _id = req.params.id;
        Contato.deleteOne({ "_id": _id }).exec().then(
            function() {
                res.end();
            },
            function(erro) {
                return console.error(erro);
            });
    };

    controller.salvaContato = function(req, res) {
        var _id = req.body._id;
        if (_id) {
            Contato.findByIdAndUpdate(_id, req.body).exec().then(
                function(contato) {
                    res.json(contato);
                },
                function(erro) {
                    console.error(erro)
                    res.status(500).json(erro);
                });
        } else {
            Contato.create(req.body).then(
                function(contato) {
                    res.status(201).json(contato);
                },
                function(erro) {
                    console.log(erro);
                    res.status(500).json(erro);
                });
        }
    };

    return controller;
};
