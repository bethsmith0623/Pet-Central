var Pet = require('../models/pet');
var User = require('../models/user');
var Provider = require('../models/provider');

module.exports = {
  index,
  show, 
  new: newPet,
  create,
  delete: deletePet,
  edit, 
  update
};

function update(req, res) {
  petID = req.params.id
  Pet.findByIdAndUpdate(petID, req.body, 
    {new:true}, function (err, pet){
      res.redirect(`/pets/${petID}`);
  })
};

function edit(req, res) {
  console.log(req.params.id);
  Pet.findById(req.params.id, function(err, pet) {
    res.render('pets/edit', {pet});
    });
  };

function deletePet(req, res){
  Pet.findByIdAndDelete(req.params.id, function(err, pets){
    console.log(pets)
    res.redirect('/pets/index');
  })
};

function index(req, res) {
  User.findById(req.user._id).populate('pets')
    .exec(function(err, user) {
    console.log(user)
    res.render('pets/index', {user});
  });
};

function show(req, res) {
  Pet.findById(req.params.id).populate('providers').exec(function(err, pet) {
    Provider.find({_id: {$nin: pet.providers}}).exec(function(err, providers){
      res.render('pets/show', {
      pet,
      user: req.user,
      providers
    })
    });
  });
}

function newPet(req, res) {
  res.render('pets/new');
};

function create(req, res) {

  req.body.healthConditions = req.body.healthConditions.replace(/\s*,\s*/g, ', ');
  if (req.body.healthConditions) req.body.healthConditions = req.body.healthConditions.split(', ');
  req.body.medications = req.body.medications.replace(/\s*,\s*/g, ', ');
  if (req.body.medications) req.body.medications = req.body.medications.split(',s');
  for(let key in req.body){
    if (req.body[key] === '') delete req.body[key];
  }
  var pet = new Pet(req.body);
  pet.save(function(err, pet) {
    User.findById(req.user._id, function(err, user) {
      user.pets.push(pet._id)
      user.save(function(err) {
        if (err) return res.redirect('pets/new');
        res.redirect(`/pets/${pet._id}`);
      })
    })
  });
}