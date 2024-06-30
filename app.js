const express = require("express");
const bodyParser = require("body-parser");//para fazer a interpretacao do corpo da requisicao
const requestHandlers = require("./request-handlers.js");//importando os manipuladores de requisicao

const app =  express();
app.use(express.static("www"));//arquivos estaticos
app.use(bodyParser.urlencoded({ extended: true }));//para fazer a interpretacao do body

// Coletar valores dos inputs
const name = document.getElementById('userName').value;
const email = document.getElementById('userEmail').value;
const phone = document.getElementById('userPhone').value;
const password = document.getElementById('userPassword').value;
const type = document.getElementById('userType').value;



app.listen(8081, function () {
    console.log("Server running at http://localhost:8081");
});

