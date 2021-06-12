const { Tag } = require('../models/tag');

const router = require('express').Router();


router.get('/', (req, res)=>{
    const tags = Tag.find().exec((error, data)=>{
        console.log(data);

        res.render('tag', {tags: JSON.stringify(data)});
    });
});

router.post('/', (req, res)=>{
    let tag = new Tag({
        name: req.body.name
    });

    tag = tag.save();
    res.redirect('/tag');
    
});

router.post('/delete', (req, res)=>{
    Tag.deleteOne({_id: req.body._id}).then(()=>{

        res.redirect('/tag');
    }).catch(()=>{
        res.redirect('/tag');
    });

})


module.exports = router;