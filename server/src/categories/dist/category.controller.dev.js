"use strict";

var models = require("../../db/models");

function listCategories(req, res) {
  return regeneratorRuntime.async(function listCategories$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.t0 = res;
          _context.next = 3;
          return regeneratorRuntime.awrap(models.Category.findAll());

        case 3:
          _context.t1 = _context.sent;

          _context.t0.send.call(_context.t0, _context.t1);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}

function listSites(req, res) {
  return regeneratorRuntime.async(function listSites$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.t0 = res;
          _context2.next = 3;
          return regeneratorRuntime.awrap(models.Site.findAll());

        case 3:
          _context2.t1 = _context2.sent;

          _context2.t0.send.call(_context2.t0, _context2.t1);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function listCategorySites(req, res) {
  var category;
  return regeneratorRuntime.async(function listCategorySites$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(models.Category.findByPk(req.params.id, {
            include: {
              model: models.Site,
              as: 'sites'
            }
          }));

        case 2:
          category = _context3.sent;
          if (category) res.send(category.sites);else res.sendStatus(404);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function addNewSite(req, res) {
  var result;
  return regeneratorRuntime.async(function addNewSite$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(models.Site.build(req.body));

        case 2:
          result = _context4.sent;
          result.categoryId = req.params.id;
          _context4.next = 6;
          return regeneratorRuntime.awrap(result.save());

        case 6:
          res.send(result);

        case 7:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function addNewCategory(req, res) {
  var result;
  return regeneratorRuntime.async(function addNewCategory$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(models.Category.build(req.body));

        case 2:
          result = _context5.sent;
          _context5.next = 5;
          return regeneratorRuntime.awrap(result.save());

        case 5:
          res.send(result);

        case 6:
        case "end":
          return _context5.stop();
      }
    }
  });
}

function delSite(req, res) {
  var site;
  return regeneratorRuntime.async(function delSite$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(models.Site.findByPk(req.params.id));

        case 2:
          site = _context6.sent;
          if (!site) res.sendStatus(404);
          _context6.next = 6;
          return regeneratorRuntime.awrap(site.destroy());

        case 6:
          res.sendStatus(200);

        case 7:
        case "end":
          return _context6.stop();
      }
    }
  });
}

function delCategory(req, res) {
  var category;
  return regeneratorRuntime.async(function delCategory$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(models.Category.findByPk(req.params.id));

        case 2:
          category = _context7.sent;
          if (!category) res.sendStatus(404);
          _context7.next = 6;
          return regeneratorRuntime.awrap(category.destroy());

        case 6:
          res.sendStatus(200);

        case 7:
        case "end":
          return _context7.stop();
      }
    }
  });
}

function init(app) {
  app.get('/categories/:id', listCategorySites);
  app.get('/categories', listCategories);
  app.get('/sites', listSites);
  app.post('/categories/:id', addNewSite);
  app.post('/categories', addNewCategory);
  app["delete"]('/sites/:id', delSite);
  app["delete"]('/categories/:id', delCategory);
}

module.exports = {
  init: init
};