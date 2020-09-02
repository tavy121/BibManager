const mongoose = require('mongoose');

const BookBib = require('../models/bibliography');


exports.bibs_get_all = (req, res, next)=>{
    BookBib.find()
    .select('_id pubnonperiodical.title pubtype.main pubnonperiodical.year contributors.first contributors.last request')
    .exec()
    .then(docs => {
        const response ={
            count: docs.length,
            bibs: docs.map(doc =>{
                return  {
                    id: doc._id,
                    book: doc.book,
                    title: doc.pubnonperiodical.title,
                    main: doc.pubtype.main,
                    first: doc.contributors.first,
                    last: doc.contributors.last,
                    year: doc.pubnonperiodical.year,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/bibs/' + doc._id
                    }
                }
            })
        }
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.bibs_post =(req,res,next)=>{

    const bib = new BookBib({
        _id: new mongoose.Types.ObjectId(),
        key: req.body.key,
        source: req.body.source,
        style: req.body.style,
        book: req.body.book,
        pubtype: req.body.pubtype,
        pubnonperiodical : req.body.pubnonperiodical,
        contributors: req.body.contributors
    });
    bib.save().then(result =>{
        console.log(result);
        res.status(200).json({
            message: 'Am adaugat bibliografie cu succes',
            cratedBib : {
                title: result.title,
                year: result.year,
                first: result.first,
                last: result.last,
                id: res._id,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/bibs/' + result._id
                }
            }
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
   
}

exports.get_bib_by_id = (req, res, next)=>{
    const bibId = req.params.bibId;
    BookBib.findById(bibId)
    .exec()
    .then(doc =>{
        console.log(doc);
        if(doc){
        res.status(200).json({
            bibliography: doc,
            request:{
                type: 'GET',
                description: 'Get all bibs',
                url: 'http://localhost:3000/bibs/'
            }
        });
        }
        else {
            res.status(404).json({message: 'No valid entry for the ID'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
}

exports.patch_bib_by_id = (req, res, next)=>{
    const id = req.params.bibId;
    const updateOps = {};
//    for(const ops of req.body){
//        updateOps[ops.propName] = ops.value;
//    }
    const bib = new BookBib({
        key: req.body.key,
        source: req.body.source,
        style: req.body.style,
        book: req.body.book,
        pubtype: req.body.pubtype,
        pubnonperiodical : req.body.pubnonperiodical,
        contributors: req.body.contributors
    });
    BookBib.update({_id: id}, {$set: bib})
    .exec()
    .then(result =>{
        console.log(result);
        res.status(200).json({
            message: 'Bib updated',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/bibs/' + id
            }
        })
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}

exports.delete_bib = (req, res, next)=>{
    const id = req.params.bibId;
    BookBib.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Bib deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/bibs/',
                instructions: { fields: 'String' }
            }
        });
    })
    .catch(err =>{
        console.log(err);
       res.status(500).json({
           error:err
       })
    });
}
