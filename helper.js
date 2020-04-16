mutation{
    createUser(userInput:{username:"test",password:"test1234",email:"test@test.com",dob:"2020-04-14T21:21:47.897Z",gender:"M"}){
     username
   }
 }


 mutation{
    updateProfile(profileInput:{firstName:"Test",lastName:"1234",intrestedIn:"",height:"",religion:"", drinks:"",smokes:"",profession:"",intrests:"", about:"",image:""}){
      firstName
      lastName
    }
}