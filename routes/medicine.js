const { Category } = require('../models/category');
const { Medicine } = require('../models/medicine');
const { Tag } = require('../models/tag');
const router = require('express').Router();


router.get('/', (req, res) => {
    const medicine = Medicine.find().populate('category', {name:1}).exec((error, medicines) => {
        Tag.find().exec((err, tags) => {
            Category.find().exec((xato, categories) => {

                res.render('medicine',
                    {
                        medicines: JSON.stringify(medicines),
                        tags: JSON.stringify(tags),
                        categories: JSON.stringify(categories)
                    });
            })
        })
    });
});

router.post('/', (req, res) => {
    console.log(req.body.tags[1].split(','));
    // let tags =req.body.tags.split(',');
    // for (const tag of req.body.tags) {
    //     tags = [...tags, {
    //         _id: tag
    //     }];
    // }
    // console.log(tags);
    let medicine = new Medicine({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        quantity: req.body.quantity,
        tags: req.body.tags[1].split(',')
    });
    medicine = medicine.save();
    res.redirect('/medicine');

});

router.post('/delete', (req, res) => {
    Medicine.deleteOne({ _id: req.body._id }).then(() => {
        res.redirect('/medicine');
    }).catch(() => {
        res.redirect('/medicine');
    });

})


module.exports = router;