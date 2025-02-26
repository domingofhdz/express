const express = require("express");
const app     = express();
const port    = process.env.PORT || 3000;

const mysql = require("mysql2");
/**
Si sale el error "Client does not support authentication protocol requested by server; consider upgrading MySQL client" hay que crear un nuevo usuario en mysql, en este caso para NodeJS, con los siguientes comandos:

CREATE USER 'nodejs'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'nodejs'@'localhost';
ALTER USER 'nodejs'@'localhost' IDENTIFIED WITH mysql_native_password by 'password';
*/
const con = mysql.createConnection({
    host: "185.232.14.52",
    database: "u760464709_16005339_bd",
    user: "u760464709_16005339_usr",
    password: "/iJRzrJBz+P1"
});

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.render("index");
});
app.get("/holaMundo", function (req, res) {
    res.send("Hola Mundo");
});
app.get("/app", function (req, res) {
    res.send("<h5>Hola, soy la view app</h5>")
});
app.get("/productos", function (req, res) {
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM productos;", function (err, result, fields) {
            if (err) throw err;
            res.render("productos", {
                productos: result
            });
        });
    });
});
app.get("/ventas", function (req, res) {
    con.connect(function(err) {
        if (err) throw err;
        con.query(`SELECT * FROM ventas
            INNER JOIN usuarios ON usuarios.Id_Usuario = ventas.Id_Usuario;`, function (err, result, fields) {
            if (err) throw err;
            res.render("ventas", {
                ventas: result
            });
        });
    });
});

const server = app.listen(port, function () {
    console.log(`listen port ${port}!`);
});
