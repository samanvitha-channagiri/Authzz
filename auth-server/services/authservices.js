const User=require('../models/userModel')

async function findUser({id,email,username},selectedField=false){
  const query={};
  if(id) query._id=id
  if(email) query.email=email
  if(username) query.username=username
  //use $or operator to allow finding by id, email or username
  const userQuery=   User.findOne({
    $or:[
      id?{_id:id}:null,
      email?{email}:null,
      username?{username}:null,
  ].filter(Boolean),
});
if(selectedField){
  userQuery.select(`${selectedField.join(' ')}`)
}
return await userQuery;
}
async function createUserOrUpdate(userData,updateUser){
  //in case of update dynamic keys
  //userData dalli-->we are sending the new information,
  //updateUser has already saved data-->idrolage hosad enen idyo, we put everything
  if(Boolean(updateUser)){
     // updateUser is already a Mongoose document since it's been fetched/created before.
      for(let key in userData){
        updateUser[key]=userData[key];
      }
      return updateUser.save();
  }
    // Otherwise, create a new Mongoose document using userData.
    const data= new User(userData)
   return await data.save()
}
module.exports={
    findUser,createUserOrUpdate
}


// updateUser:
// This parameter is expected to be a Mongoose document. You know it is because it is fetched from the database (for example, via User.findOne(...)), so it has all the methods and internal properties of Mongoose documents.

// userData:
// This is a plain object that comes from your front-end (for example, the request body with new field values). It’s just a JSON-like object without Mongoose methods. That’s why you cannot call userData.save() on it. Instead, you use its values to update the Mongoose document (updateUser) and then save that updated document.