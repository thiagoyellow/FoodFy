const Chef = require('../models/Chef')
const Recipe = require('../models/Recipe')

module.exports = {
    create(req, res) {
        // Pegar chefs
        Chef.all()
        .then(function(results) {
            const chefs = results.rows
            return res.render("recipes/create.njk", { chefs })
        }).catch(function(err) {
            throw new Error(err)
        })
        
    },
    async post(req, res) {
        // Lógica de salvar
        const keys = Object.keys(req.body)

        for(key in keys) {
            if(req.body[key] == "") {
                return res.send('Please, fill all fields')
            }
        }

        let results = await Recipe.create(req.body)
        const recipeId = results.rows[0].id

        results = await Chef.all()
        const chefs = results.rows

        return res.render("recipes/create.njk", { recipeId, chefs })
    }
}

