const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();


// Get Posts

// Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
  });
  
// Post
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text : req.body.text,
        createTime : new Date()
    });
    res.status(201).send();
})
// Delete

router.delete('/:id', async (req, res) =>{
    const posts = await loadPostsCollection();
    // await posts.deleteOne({_id : req.params.id})
    await posts.deleteOne({_id : new mongodb.ObjectId(req.params.id)})
    res.status(200).send();

})


  async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect(
      'mongodb+srv://pankorn:15241524@vueexpress.vfc4b.mongodb.net/VueExpress?retryWrites=true&w=majority',
      {
        useNewUrlParser: true
      }
    );
  
    return client.db('VueExpress').collection('posts');
  }



module.exports = router;