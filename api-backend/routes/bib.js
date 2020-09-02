const express = require('express');
const router = express.Router();

const check = require('../middleware/check');

const BibController = require('../controllers/bib');

router.get('/', BibController.bibs_get_all);

router.post('/', BibController.bibs_post);

router.get('/:bibId', BibController.get_bib_by_id);

router.patch('/:bibId', BibController.patch_bib_by_id);

router.delete('/:bibId', BibController.delete_bib);

module.exports = router;
