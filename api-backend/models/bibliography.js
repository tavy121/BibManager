const mongoose = require('mongoose');

const bookBibSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    key: {
		type: String
	},
	source: {
		type: String
	},
	style: {
		type: String
	},
	book: {},
	pubtype: {
		main: {
			type: String
		}
	},
	pubnonperiodical: {
		title: {
			type: String
		},
		publisher: {
			type: String
		},
		city: {
			type: String
		},
		year: {
			type: Date
		},
		start: {
			type: String
		}
	},
	contributors:[{
        functions:String,
        first: String,
        middle: String,
        last: String
    }]

});

module.exports = mongoose.model('Bibliography', bookBibSchema);
