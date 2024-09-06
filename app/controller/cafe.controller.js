const Cafe = require("../models/cafe.model.js");

exports.findAll = (req, res) => {
  Cafe.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured",
      });
    } else res.send(data);
  });
};

exports.findBrunch = (req, res) => {
  Cafe.getBrunch((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured",
      });
    } else res.send(data);
  });
};

exports.findCoffee = (req, res) => {
  Cafe.getCoffee((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured",
      });
    } else res.send(data);
  });
};

exports.findTea = (req, res) => {
  Cafe.getTea((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured",
      });
    } else res.send(data);
  });
};

exports.findDessert = (req, res) => {
  Cafe.getDessert((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured",
      });
    } else res.send(data);
  });
};

exports.findVegan = (req, res) => {
  Cafe.getVegan((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured",
      });
    } else res.send(data);
  });
};

exports.findStudy = (req, res) => {
  Cafe.getStudy((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured",
      });
    } else res.send(data);
  });
};

exports.findTeam = (req, res) => {
  Cafe.getTeam((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured",
      });
    } else res.send(data);
  });
};

exports.findLarge = (req, res) => {
  Cafe.getLarge((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured",
      });
    } else res.send(data);
  });
};

exports.findChat = (req, res) => {
  Cafe.getChat((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured",
      });
    } else res.send(data);
  });
};

exports.findChild = (req, res) => {
  Cafe.getChild((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured",
      });
    } else res.send(data);
  });
};

exports.findSenior = (req, res) => {
  Cafe.getSenior((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured",
      });
    } else res.send(data);
  });
};

exports.findParty = (req, res) => {
  Cafe.getParty((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured",
      });
    } else res.send(data);
  });
};

exports.findSns = (req, res) => {
  Cafe.getSns((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured",
      });
    } else res.send(data);
  });
};

exports.findRest = (req, res) => {
  Cafe.getRest((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured",
      });
    } else res.send(data);
  });
};

exports.findTheme = (req, res) => {
  Cafe.getTheme((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured",
      });
    } else res.send(data);
  });
};

exports.findAmericano = (req, res) => {
  Cafe.getAmericano((err, data) => {
    if (err){
      res.status(500).send({
        message: err.message || "Some error occured",
      });
    } else res.send(data);
  })
}

exports.findLatte = (req, res) => {
  Cafe.getLatte((err, data) => {
    if (err){
      res.status(500).send({
        message: err.message || "Some error occured",
      });
    } else res.send(data);
  })
}

exports.findReview = (req, res) => {
  Cafe.getReview((err, data) => {
    if (err){
      res.status(500).send({
        message: err.message || "Some error occured",
      });
    } else res.send(data);
  })
}