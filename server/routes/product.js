const express = require('express');
const router = express.Router();
const multer = require('multer')
const { Product } = require('../models/Product')

//======================
//       Product
//======================

// multer 라이브러리 활용 - 공식문서 확인
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

var upload = multer({ storage: storage }).single("file")

router.post('/image', (req, res) => { // /api/product/image
    // 가져온 이미지를 저장 해준다.     
    upload(req, res, err => {
        if(err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    })
}) 

router.post('/', (req, res) => { 
    // 받아온 정보들을 DB에 넣어준다.
    const product = new Product(req.body)

    product.save((err) => {
        if(err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })
}) 

router.post('/products', (req, res) => { 
    let limit = req.body.limit ? parseInt(req.body.limit) : 20 // 지정한 Limit이 없으면 20으로 / String인 경우 숫자로 바꿔줌.
    let skip = req.body.skip ? parseInt(req.body.skip) : 0
    let term = req.body.searchTerm 

    let findArgs = {}

    for(let key in req.body.filters) {
        if(req.body.filters[key].length > 0) {
            if(key === "price") {
                findArgs[key] = {
                    $gte: req.body.filters[key][0], // gte : mongodb에서 사용, greater than equal
                    $lte: req.body.filters[key][1] // lte: less than equal
                }
            } else {
                findArgs[key] = req.body.filters[key]
            }
        }
    }

    if (term) {
        // product collection에 들어 있는 모든 상품 정보를 가져오기
        Product.find(findArgs)
            .find({ $text: { $search: term } })
            .populate("writer") // 이 사람에 대한 모든 정보를 가져올 수 있다.
            .skip(skip)
            .limit(limit)
            .exec((err, productInfo) => {
                if(err) return res.status(400).json({ success: false, err })
                return res.status(200).json({ 
                    success: true, productInfo,
                    postSize: productInfo.length 
                })
            })
    } else {
        // product collection에 들어 있는 모든 상품 정보를 가져오기
        Product.find(findArgs)
            .populate("writer") // 이 사람에 대한 모든 정보를 가져올 수 있다.
            .skip(skip)
            .limit(limit)
            .exec((err, productInfo) => {
                if(err) return res.status(400).json({ success: false, err })
                return res.status(200).json({ 
                    success: true, productInfo,
                    postSize: productInfo.length 
                })
            })
    }
})
    
router.get('/products_by_id', (req, res) => {
    let type = req.query.type
    let productId = req.query.id

    // productId를 이용해서 DB에서 productId와 같은 상품의 정보를 가져온다.
    Product.find({ _id: productId })
        .populate('writer')
        .exec((err, product) => {
            if(err) return res.status(400).send(err)
            return res.status(200).send({ success: true, product })
        })
})


module.exports = router;
