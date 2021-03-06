///// PLUMBING /////

// Basic setup
var express = require('express'),
    router = express.Router(),
// Parses information from POST
    bodyParser = require('body-parser'),
// Used to manipulate POST methods
    methodOverride = require('method-override'),
    passport = require("passport")

// Require controllers
var usersController = require('../controllers/users_controller'),
    methodsController = require('../controllers/methods_controller'),
    exercisesController = require('../controllers/exercises_controller'),
    staticPagesController = require('../controllers/static_pages_controller')

// Routes helpers

function authenticateUser(request, response, next) {
  // If the user is authenticated, then we continue the execution
  if (request.isAuthenticated()) return next()
  // Otherwise the request is always redirected to the login page
  response.redirect('/login')
}

///// ROUTES /////

// Root path
router.get('/', function(request, response){
	response.render('./static_pages/index.ejs')
})

// Static Pages

router.route('/about')
	.get(staticPagesController.about)

// Authentication Routes

router.route('/signup')
  .get(usersController.getSignup)
  .post(usersController.postSignup)

router.route('/login')
  .get(usersController.getLogin)
  .post(usersController.postLogin)

router.route('/logout')
  .get(usersController.getLogout)

// route for facebook authentication and login
router.route('/auth/facebook')
  .get(usersController.getFacebook)

// handle the callback after facebook has authenticated the user
router.route('/auth/facebook/callback')
  .get(usersController.getFacebookCallback)


// User Routes

router.route('/dashboard')
	.get(authenticateUser, usersController.dashboard)

router.route('/exercises')
	// .get(authenticateUser, usersController.exercises)
	.get(usersController.exercises)
	.post(usersController.runCode)

// Method Routes
router.route('/admin/methods')
  .get(authenticateUser, methodsController.index)

router.route('/admin/methods/new')
  .get(authenticateUser, methodsController.newMethod)
  .post(authenticateUser, methodsController.createMethod)

router.route('/admin/methods/:id/edit')
  .get(authenticateUser, methodsController.editMethod)
  .post(authenticateUser, methodsController.updateMethod)
  .delete(authenticateUser, methodsController.destroyMethod)

router.route('/admin/methods/:id')
  .get(authenticateUser, methodsController.show)

// Exercises routes

router.route('/admin/exercises')
	.get(authenticateUser, exercisesController.index)

router.route('/admin/exercises/new')
  .get(authenticateUser, exercisesController.newExercise)
  .post(authenticateUser, exercisesController.createExercise)

router.route('/admin/exercises/:id')
	.get(authenticateUser, exercisesController.show)

module.exports = router
