const mongoose = require('mongoose')

const scoreSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		percent: {
			type: Number,
			required: true,
		},
    bBubble: {
      type: Boolean,
      required: true
    },
    bQuick: {
      type: Boolean,
      required: true
    },
    bMerge: {
      type: Boolean,
      required: true
    },
    bHeap: {
      type: Boolean,
      required: true
    }
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Score', scoreSchema)
