let db = require("../models");


// Routes
// =============================================================
module.exports = function (app) {


    // HTML Routes
    // =============================================================

    // app.get("/", function (req, res) {
    //     res.render(path.join(__dirname, "../public/index.html"));
    // });

    // app.get("/login", function (req, res) {
    //     res.render(path.join(__dirname, "../public/login.html"));
    // });

    // app.get("/signup", function (req, res) {
    //     res.render(path.join(__dirname, "../public/signup.html"));
    // });

    app.get("/homepage", function (req, res) {
        res.render(path.join(__dirname, "../view/homepage.handlebars"));
    });

    app.get("/lobby", function (req, res) {
        res.render(path.join(__dirname, "../view/lobby.handlebars"));
    });

    app.get("/questions", function (req, res) {
        res.render(path.join(__dirname, "../view/questions.handlebars"));
    });

    app.get("/results", function (req, res) {
        res.render(path.join(__dirname, "../view/results.handlebars"));
    });

    // API Routes
    // =========================================================

    // Get User Route
    app.get("/api/user/:id", function (req, res) {
        let id = req.params.id
        // findAll returns all entries for a table when used with no options
        db.user.findOne({id: id}).then(function (results) {
            // We have access to the users as an argument inside of the callback function
            res.json(results);
        });
    });

    // Get Avatar Route
    app.get("/api/user/:id/avatar", function (req, res) {
        let id = req.params.id;
        db.user.findOne(id).then(function (results) {
            res.json(results);
        });
    });

    // Sign Up Route, Create New User
    app.post("/api/user", function (req, res) {
        console.log("User Data:");
        console.log(req.body);
        // My hash logic goes here
        let hashedPassword = create(req.body.password);

        db.user.create({
            name: req.body.name,
            username: req.body.username,
            hased: hashedPassword.hash,
            salt: hashedPassword.salt,
            avatar: req.body.avatar,
            totalWins: 0
        }).then(function (results) {
            res.end();
        });
    });

    // Put method to Update Total Wins
    app.put("/api/user/:id", function(req, res) {

        // we use where to describe which objects we want to update
        db.user.update({
          totalWins: req.body.totalWins,
        }, {
          where: {
            id: req.body.id
          }
        }).then(function(results) {
          res.json(results);
        })
          .catch(function(err) {
          // Whenever a validation or flag fails, an error is thrown
          // We can "catch" the error to prevent it from being "thrown", which could crash our node app
            res.json(err);
          });
      });



    // Delete method to Delete Account
    app.delete("/api/user/:id", function (req, res) {
        console.log("User ID:");
        console.log(req.params.id);
        db.user.destroy({
            where: {
                id: req.params.id
            }
        }).then(function () {
            res.end();
        });
    });

};