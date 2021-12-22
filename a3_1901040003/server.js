const express = require('express');
const app = express();
 
app.use(express.static('html'));
 
app.use(express.urlencoded({ extended : true }));
app.use(express.json());
 
const mongodb = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
 
let db = null;
let QvaA;
let elements;
let TheChosenWillBeDelete;
let TheQuestionWillBeInsert;
let TheQuestionWillBeUpdate;
async function startServer() {
    // connect to debugger
    const client = await mongodb.MongoClient.connect('mongodb://localhost:27017/wpr-quiz');
    db = client.db();
    console.log('Hello');
 
}
//Get all question
startServer();
async function attemptTheQuestion(){
   
    const listOfQuestions = await db.collection('questions').find().toArray();    
    let QuestionsAndAnswers = []
 
    // console.log(listOfQuestions);
    listOfQuestions.forEach(mlem => {
       
        for (let i = 0; i < mlem.answers.length; i++) {
           if(i == mlem.correctAnswer){
                var QuesAndAns = {
                    _id: mlem._id,
                    question: mlem.text,
                    correctAnswer: mlem.answers[mlem.correctAnswer]  
                }
           }
                     
        }
        QuestionsAndAnswers.push(QuesAndAns);
 
    });    
    QvaA = {questionAndanswer: QuestionsAndAnswers}
    return QvaA;  
}
 
app.get('/questions', async function(request, response) {
    startServer();
    await attemptTheQuestion();
    response.json(QvaA);
});
 
//Get Detail All The Question
 
async function takeTheID(UserSendID){
    collection = db.collection('questions')
    await console.log(UserSendID);    
    elements = await collection.findOne({ "_id": ObjectId(UserSendID) })
    console.log(elements);
 
    return elements;
}
 
app.get('/questions/:id',async function(request, response){
    startServer();
    await console.log(request.params.id);
    await takeTheID(request.params.id);
    response.json(elements)
})

//Delete The Chosen Question 
async function deleteTheQuestionAndAnswer(UserSendID){
    collection = db.collection('questions')
    TheChosenWillBeDelete = await collection.deleteOne({ "_id": ObjectId(UserSendID) })

    console.log(TheChosenWillBeDelete)

    return TheChosenWillBeDelete;
}

app.delete('/questions/:id',async function(request, response){
    startServer();
    await console.log(request.params.id);
    await deleteTheQuestionAndAnswer(request.params.id);
    response.json(TheChosenWillBeDelete)
});
 
//Insert More questions

async function insertMoreQuestion(TheObjectOfQuestion){
    collection = db.collection('questions');
    TheQuestionWillBeInsert = await collection.insertOne(TheObjectOfQuestion)
   
    return TheQuestionWillBeInsert;
}
 
app.post('/questions', async function(request, response){
    startServer();
    await insertMoreQuestion(request.body)
    console.log(request.body);
    response.json(TheQuestionWillBeInsert)
})

//Update question
async function updateTheQuestionAndAnswers(TheObjectOfNewQuestion, IDOfTheObject){
    collection = db.collection('questions');
    console.log(TheObjectOfNewQuestion);
    TheQuestionWillBeUpdate = await collection.updateOne({ "_id": ObjectId(IDOfTheObject) }, { $set : TheObjectOfNewQuestion} );
    return TheQuestionWillBeUpdate;
}
 
app.put('/questions/:id',async function(request, response){
    startServer();
    await updateTheQuestionAndAnswers(request.body, request.params.id);
    response.json(TheQuestionWillBeUpdate);
})
 

 
app.listen(3000, function(){
    console.log('Listening on port 3000!');
});
 

