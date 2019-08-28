const Provider = require('../models/provider');
var User = require('../models/user');

module.exports = {
  index,
  show,
  new: newProvider,
  create, 
  delete: deleteProvider,
  edit, 
  update
};

function update(req, res) {
  providerID = req.params.id
  Provider.findByIdAndUpdate(providerID, req.body,
    {new:true}, function (err, provider) {
      res.redirect(`/providers/${providerID}`);
    })
}

function edit(req, res) {
  Provider.findById(req.params.id, function(err, provider) {
    res.render('providers/edit', {provider});
  })
};

function deleteProvider(req, res) {
  Provider.findByIdAndDelete(req.params.id, function(err, providers){
    console.log(providers)
    res.redirect('/providers/index');
  })
}

function newProvider(req,res) {
  Provider.find({}, function(err, providers){
    res.render('providers/new', {
      pet: 'Add Provider', providers
    });
  });
}

function create(req, res) {
  console.log(req.body);
  req.body.services = req.body.services.replace(/\s*,\s*/g, ',');
  if (req.body.services) req.body.services = req.body.services.split(','); 
  for(let key in req.body){
    if (req.body[key] === '') delete req.body[key];
  }
  var provider = new Provider(req.body);
  provider.save(function(err, provider){
    User.findById(req.user._id, function(err, user) {
      user.providers.push(provider._id)
      user.save(function(err) {
        if (err) return res.redirect('providers/new');
        res.redirect(`/providers/${provider._id}`);
      })
    })
  });
}

 
function show(req,res) {
 User.findById(req.user._id)
 .populate('providers').exec(function(err, user) {
   res.render('providers/show', {
     user
   });
 });
}

function index(req, res) {
  User.findById(req.user._id).populate('providers')
    .exec(function(err, user){
    res.render('providers/index', {user});
  });
};