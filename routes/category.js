const { Category } = require('../models/category');
const router = require('express').Router();


router.get('/', (req, res)=>{
    const category = Category.find().exec((error, data)=>{
        console.log(data);

        res.render('category', {categories: JSON.stringify(data)});
    });
});

router.post('/', (req, res)=>{
    let category = new Category({
        name: req.body.name
    });

    category = category.save();
    res.redirect('/category');
    
});

router.post('/delete', (req, res)=>{
    Category.deleteOne({_id: req.body._id}).then(()=>{
        res.redirect('/category');
    }).catch(()=>{
        res.redirect('/category');
    });

})


module.exports = router;