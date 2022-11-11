const Person = require("../models/person");
const jsonWebToken = require("jsonwebtoken");
exports.addPerson = async (req,res,next) => {
    try {
        const newPesron = new Person({...req.body.values,creator: req.body.auth.userId});
        const postedPerson =  await newPesron.save();
         res.json({message: "true",data: postedPerson});
    }catch(err){
        next(err)
    }
   
}
exports.getPersons = async (req,res,next) => {
    try {
       const persons = await Person.find();
       res.json({persons: persons});
    }catch(err){
        console.log(err);
    }
}

exports.editPerson = async (req,res,next) => {
    const {PersonalNumber,age,city,country,name,profesion,surname,personId} = req.body.values;
     console.log(PersonalNumber,age,city,country,name,profesion,surname);
     try {
     const person = await Person.findById(personId);
     if(!person) {
      throw("No such user!");
     }
     console.log();
     if(person.creator.toString() !== req.body.auth.userId.toString()) {
        throw("You can't edit these post,which you did not create!");
     }
    person.PersonalNumber = PersonalNumber;
    person.age = age;
    person.city = city;
    person.country = country;
    person.profesion = profesion;
    person.name = name;
    person.surname = surname;
    await person.save()
    res.json({email: 'edited successfully'});
     }catch(err){
        next(err);
     }
}

exports.deletePerson = async (req,res,next) => {
    const id = req.body.values._id;
    try{
     const person =  await Person.findById(id);
     if(!person) {
        throw("No such user1");
     }
     if(person.creator.toString() !== req.body.auth.userId.toString()) {
        throw("You can't edit these post,which you did not create!");
     }
     await Person.findByIdAndRemove(id);
     res.json({message: "Delted successfuly!"});
    }catch(err){
        next(err);
    }
}