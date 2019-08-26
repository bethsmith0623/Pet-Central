var Pet = require('../models/pet');

module.exports = {
  index,
  show, 
  new: newPet,
  create,
  delete: deletePet,
  // edit, 
  // update
};

// function update(req, res) {
//   Pet.update(req.params.id, req.body);
//   res.redirect('/pets/:id');
// }

// function edit(req, res) {
//   Pet.findById (req.params.id, function(err, pet) {
//     res.render(`/pets/${pet._id}edit`, {
//       pet: Pet.updateOne(req.params.id),
//       idx: req.params.id
//     });
//   });
// };

function deletePet(req, res){
  Pet.findByIdAndDelete(req.params.id, function(err, pets){
    console.log(pets)
    // pets.splice(id, 1);
    res.redirect('/pets/index');
  })
};

function index(req, res) {
  Pet.find({}, function(err, pets) {
    res.render('pets/index', {pets});
  });
};
function show(req, res) {
  Pet.findById (req.params.id, function(err, pet) {
    console.log('pet', pet);
    res.render('pets/show', {
      name: pet.name, 
      type: pet.type, 
      breed: pet.breed, 
      age: pet.age, 
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
  })
}