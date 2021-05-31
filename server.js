const express = require('express')
const nunjucks = require('nunjucks')
const routes = require("./routes")

const server = express()

server.use(express.static('public'))
server.use(routes)

server.set("view engine", "njk")

nunjucks.configure("views", {
    express:server,
    autoscape: false,
    noCache: true
})

<<<<<<< HEAD
=======
server.get("/", function(req, res){
    return res.render("home", {items: recipes})
})

server.get("/about", function(req, res) {
    return res.render("about")
})

server.get("/recipes", function(req, res) {
    return res.render("recipes", {items: recipes})
})

server.get("/recipe", function(req, res) {
    const id = req.query.id
    const recipe = recipes.find(function(recipe){
        return recipe.id == id
    })

    if(!recipe) {
        return res.send("Receita não encontrada!")
    }

    return res.render("recipe", { item: recipe })

})

server.use(function (req, res) {
    res.status(404).render("not-found");
});

>>>>>>> 6844e2d9959b28caf3a8f5d85bfc1da795fdf87d
server.listen(5000, function() {
    console.log("server is running")
})