var Pet = require('../models/pet');

module.exports = {
  index,
  new: newPet,
  create,
  show
};

function index(req, res) {
  Pet.find({}, function(err, pets) {
    res.render('pets/index', {pets});
  });
};
function show(req, res) {
  Pet.findById (req.params.id, function(err, pet) {
    console.log(pet);
    res.render('pets/show');
  });
}

function newPet(req, res) {
  res.render('pets/new');
};

function create(req, res) {
  // for (let key in req.body) {
  //   if (req.body[key] === '') delete req.body[key];
  // }
  var pet = new Pet(req.body);
  pet.save(function(err) {
    if (err) return res.redirect('/pets/new');
    console.log(pet);
    res.redirect(`/pets/${pet._id}`);
  })
}