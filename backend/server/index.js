const express = require('express');
const server = express();
const cors = require('cors');
const {TechnologyModel} = require('../models');

//create meddlewares
server.use(express.json());
server.use(express.static(__dirname + '/../public'));
server.use(cors());

server.get('/api/technologies', async (req, res) => {
    let technologies = await TechnologyModel.find();
    technologies = technologies.map( technology => {
        technology.logo = `${req.protocol}://${req.headers.host}/img/${technology.logo}`;
        return technology;
    });
    return res.send({error: false, data: technologies});
});

server.get('/api/technologies/:id', async (req, res) => {
    const {id} = req.params;
    let technology = await TechnologyModel.findById(id);
    technology.logo = `${req.protocol}://${req.headers.host}/img/${technology.logo}`;
    return res.send({error: false, data: technology});
});

server.get('/api/technology/search/:name', async (req, res) => {
    const {name} = req.params;
    let technologies = await TechnologyModel.find({
        name: {$regex: new RegExp(name, 'i')}
    });
    technologies = technologies.map( technology => {
        technology.logo = `${req.protocol}://${req.headers.host}/img/${technology.logo}`;
        return technology;
    });
    return res.send({error: false, data: technologies});
});

module.exports = server;