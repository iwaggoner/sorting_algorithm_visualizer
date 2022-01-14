// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for scores
const Score = require('../models/score')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { score: { title: '', text: 'foo' } } -> { score: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /scores
router.get('/scores', requireToken, (req, res, next) => {
	Score.find()
		.then((scores) => {
			// `scores` will be an array of Mongoose documents
			// we want to convert each one to a POJO, so we use `.map` to
			// apply `.toObject` to each one
			return scores.map((score) => score.toObject())
		})
		// respond with status 200 and JSON of the scores
		.then((scores) => res.status(200).json({ scores: scores }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// INDEX myScores
// GET /scores for one user
router.get('/scores/user/:userId', requireToken, (req, res, next) => {
	Score.find({ 'userId': req.params.userId})
		.then((myScores) => {
			// `scores` will be an array of Mongoose documents
			// we want to convert each one to a POJO, so we use `.map` to
			// apply `.toObject` to each one
			return myScores.map((myScore) => myScore.toObject())
		})
		// respond with status 200 and JSON of the scores
		.then((myScores) => res.status(200).json({ myScores: myScores }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// SHOW
// GET /scores/5a7db6c74d55bc51bdf39793
router.get('/scores/:id', requireToken, (req, res, next) => {
	// req.params.id will be set based on the `:id` in the route
	Score.findById(req.params.id)
		.then(handle404)
		// if `findById` is succesful, respond with 200 and "score" JSON
		.then((score) => res.status(200).json({ score: score.toObject() }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// CREATE
// POST /scores
router.post('/scores', requireToken, (req, res, next) => {
	// set owner of new score to be current user
	// req.body.score.userId = req.user._id

	Score.create(req.body)
		// respond to succesful `create` with status 201 and JSON of new "score"
		.then((score) => {
			res.status(201).json({ score: score.toObject() })
		})
		// if an error occurs, pass it off to our error handler
		// the error handler needs the error message and the `res` object so that it
		// can send an error message back to the client
		.catch(next)
})

// UPDATE
// PATCH /scores/5a7db6c74d55bc51bdf39793
router.patch('/scores/:id', requireToken, removeBlanks, (req, res, next) => {
	// if the client attempts to change the `owner` property by including a new
	// owner, prevent that by deleting that key/value pair
	delete req.body.score.owner

	Score.findById(req.params.id)
		.then(handle404)
		.then((score) => {
			// pass the `req` object and the Mongoose record to `requireOwnership`
			// it will throw an error if the current user isn't the owner
			requireOwnership(req, score)

			// pass the result of Mongoose's `.update` to the next `.then`
			return score.updateOne(req.body.score)
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// DESTROY
// DELETE /scores/5a7db6c74d55bc51bdf39793
router.delete('/scores/:id', requireToken, (req, res, next) => {
	Score.findById(req.params.id)
	.then(handle404)
	.then((score) => {		
			// throw an error if current user doesn't own `score`
			// requireOwnership(req, score)
			// delete the score ONLY IF the above didn't throw
			score.deleteOne()
		})
		// send back 204 and no content if the deletion succeeded
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

module.exports = router
