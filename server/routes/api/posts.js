const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//GET recipe
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});
//Add recipe

router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        recipe_name: req.body.recipe_name,
        ingredients: req.body.ingredients,
        directions: req.body.directions,
        createdAt: new Date()
    });
    res.status(201).send();
});



//Delete recipe

router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({
        _id: new mongodb.ObjectID(req.params.id)
    });
    res.status(200).send();
})

//Update recipe



async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://user_31:silviu31@cluster0.9grfh.mongodb.net/recipeapp?retryWrites=true&w=majority', {
        useNewUrlParser: true
    })

    return client.db('recipeapp').collection('recipes');
}



module.exports = router;