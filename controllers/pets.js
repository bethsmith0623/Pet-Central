var Pet = require('../models/pet');
var User = require('../models/user');

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
  User.findById(req.user._id).populate('pets').exec(function(err, user) {
    res.render('pets/index', {user});
  });
};
function show(req, res) {
  User.findById(req.user._id).
    populate('pets').exec(function(err, user) {
    console.log(req.user.pet);
    res.render('pets/show', {
      name: pet.name, 
      type: pet.type, 
      breed: pet.breed, 
      age: pet.age, 
      id: pet._id,
      healthConditions: pet.healthConditions, 
      medications: pet.medications,
      providers: pet.providers
    });
  });
}

function newPet(req, res) {
  
  res.render('pets/new');
};

function create(req, res) {
  console.log(req.body);
  req.body.healthConditions = req.body.healthConditions.replace(/\s*,\s*/g, ',');
  if (req.body.healthConditions) req.body.healthConditions = req.body.healthConditions.split(',');
  req.body.medications = req.body.medications.replace(/\s*,\s*/g, ',');
  if (req.body.medications) req.body.medications = req.body.medications.split(',');
  for(let key in req.body){
    if (req.body[key] === '') delete req.body[key];
  }
  var pet = new Pet(req.body);
  pet.save(function(err) {
    if (err) return res.redirect('pets/new');
    console.log(pet);
    res.redirect(`/pets/${pet._id}`);
  });
}