const express = require('express');
const path = require('path');
const { body, ValidationResult } = require('express-validator');
const fs = require('fs');
const app = express();

const appPort = 3000;

app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/list', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/list.html'));
});

app.get('/detail/:id', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/detail.html'));
});

app.get('/confirmation', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/confirmation.html'));
});

app.listen(appPort, () => {
	console.log(`Serveur lancé sur le port ${appPort}`);
});
