// Dependencies
// =============================================================
let express = require("express");
let path = require("path");
let Database = require("./async-db");
let mysql = require("mysql");

// Sets up the Express App
// =============================================================
let app = express();
let PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const db = new Database({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Shifting Shadows",
    database: "movie_planner_db"
  });
  
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});


// View the home page
app.get("/movies", async function(req, res) {
    try {
        const rows = await db.query("SELECT * FROM movies");
        console.log(`Retrieved ${rows.length}`, rows);
        res.status(200); // success
        res.send(rows);
    } catch(err) {
        // Internal error on the server side.
        res.status(500);
        res.send(err);
    } finally {
        return res;
    }
});

// Update the movie with the given id
app.put("/movies/:id/:movieName", async function(req, res) {
    // UPDATE movies SET movie=? WHERE id=?
    try {
        const movieName = req.params.movieName;
        const movieId = req.params.id;
        console.log("updating movie id: " + movieId);
        console.log("Updating movie title: " + movieName);
    
        const rows = await db.query("UPDATE movies SET movie=? WHERE id=?", [movieName, movieId]);
        console.log(`Retrieved ${rows.length}`, rows);
        res.status(200); // success
        res.send(rows);
    }
    catch(err) {
        // Internal error on the server side.
        res.status(500);
        res.send(err);
    } finally {
        return res;
    }
});

// Delete the movie with the given id
app.delete("/movies/:id", async function(req, res) {
    try {
        console.log("About to delete a movie");
        console.log(req.params.id);
        const movieId = req.params.id;

        // DELETE FROM movies where id=?
        const rows = await db.query("DELETE FROM movies WHERE id=?", [movieId]);
        const success = (rows != undefined);

        if(success) {
            res.status(204); // HTML 204 request succeeded
            res.send(rows);
        } else {
            res.status(404); // HTML status 404 not found
            res.send("");
        }
    }
    catch(err) {
        // Internal error on the server side.
        res.status(500);
        res.send(err);
    } finally {
        return res;
    }
});

// Add a movie
app.post("/movies/:movieName", async function(req, res) {
    // save the movie
    // get the movie info from req.body.movie
    // INSERT INTO movies (movie) values(?), {req.bod.movie}
    try {
        console.log("Adding a movie");
        // console.log(req.body);
        const movieName = req.params.movieName;
        console.log(movieName);
        const rows = await db.query("INSERT INTO movies (movie) values (?)", movieName);
        console.log(`Retrieved ${rows.length}`, rows);

        res.status(201); // HTML status 201 creation successful
        res.send(rows);
    }
    catch(err) {
        // Internal error on the server side.
        res.status(500);
        res.send(err);
    } finally {
        return res;
    }
});

// Close your database connection when Node exits
process.on("exit", async function(code) {
    await db.close();
    return console.log(`About to exit with code ${code}`);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});


