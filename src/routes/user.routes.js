const express = require('express');
const app = express.Router();
const controller = require('../controllers/user.controller');

app.get('/',controller.userRoutes);

app.get('/:id',controller.userRoutes);

app.post('/',controller.userRoutes);

app.put('/:id',controller.userRoutes);

app.delete('/:id',controller.userRoutes);

module.exports = app;