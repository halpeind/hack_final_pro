const note = require("../controller/note.controller");

const routes = (app) => {
    app.get("/notes", note.json_findAll);
    app.post("/notes", note.json_create);
    app.delete("/notes", note.json_delete);
    app.put("/notes", note.json_update);

    app.use("/graphql", note.graphql);
}

module.exports = routes;