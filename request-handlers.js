
const mysql = require("mysql");
const options = require("./connection-options.json");

function getPeople(req, res) {
    var connection = mysql.createConnection(options);
    connection.connect();
    var query = "SELECT id, name, birthDate, idCountry FROM users";
    connection.query(query, function (err, rows) {
      if (err) {
        res.json({"message": "error", "error": err });
      } else {
        res.json({"message": "success", "people": rows });
      }
      connection.end();
    });
  }

function getPersonById(req, res) {
    var connection = mysql.createConnection(options);
    connection.connect();
    var query = "SELECT id, name, birthDate, idCountry FROM users WHERE id = ?";
    connection.query(query, [req.params.id], function (err, rows) {
      if (err) {
        res.json({"message": "error", "error": err });
      } else {
        res.json({"message": "success", "person": rows[0] });
      }
      connection.end();
    });

}

function createPerson(req, res) {
    var createConnection = mysql.createConnection(options);
    createConnection.connect();
    var query = "INSERT INTO person (name, email, phone, password, type) VALUES (?, ?, ?, ?, ?)";
    createConnection.query(query, [req.body.name, req.body.email, req.body.phone, req.body.password, req.body.type], 
      function (err, result) {
      if (err) {
        res.json({"message": "error", "error": err });
      } else {
        res.json({"message": "success", "person": result.insertId });
      }
      createConnection.end();
    });
}

function updatePerson(req, res) {
    var updateConnection = mysql.createConnection(options);
    updateConnection.connect();
    var query = "UPDATE person SET name = ?, birthDate = ?, idCountry = ? WHERE id = ?";
    updateConnection.query(query, [req.body.name, req.body.birthDate, req.body.idCountry, req.params.id], function (err, result) {
      if (err) {
        res.json({"message": "error", "error": err });
      } else {
        res.json({"message": "success", "person": req.params.id });
      }
      updateConnection.end();
    });
}

function deletePerson(req, res) {
    var deleteConnection = mysql.createConnection(options);
    deleteConnection.connect();
    var query = "DELETE FROM person WHERE id = ?";
    deleteConnection.query(query, [req.params.id], function (err, result) {
      if (err) {
        res.json({"message": "error", "error": err });
      } else {
        res.json({"message": "success", "person": req.params.id });
      }
      deleteConnection.end();
    });
}



module.exports = {
    getPeople: getPeople,
    getPerson: getPersonById,
    createPerson: createPerson,
    updatePerson: updatePerson,
    deletePerson: deletePerson,
   
};
