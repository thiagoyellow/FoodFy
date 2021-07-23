const express = require('express')
const routes = express.Router()
const RecipeController = require('./app/controllers/RecipeController')
const server = express()
const recipes = require("../data")

routes.get('/', function(req, res) {
  return res.render("index", {items: recipes})
})

routes.get('/about', function(req, res) {
  return res.render("about")
})

routes.get('/recipe', function(req, res) {
  const id = req.query.id
  const recipe = recipes.find(function(recipe){
      return recipe.id == id
})

  if(!recipe) {
      return res.send("Receita não encontrada!")
  }

  return res.render("recipe", { item: recipe })
})

routes.get('/recipes', function(req, res) {
  return res.render("recipes")
})

routes.get('/admin', function(req, res) {
  return res.render("admin/index")
})

routes.get('/recipes/create', RecipeController.create)
routes.post('/recipes', RecipeController.post)

//Alias
routes.get('/ads/create', function(req, res) {
  return res.render("recipes/create")
})

routes.use(function (req, res) {
  res.status(404).render("not-found");
});

module.exports = routes