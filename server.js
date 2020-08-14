const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const recipes = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express:server,
    autoscape: false,
    noCache: true
})

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

server.listen(5000, function() {
    console.log("server is running")
})