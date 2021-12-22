const TheAddButton = document.querySelector('.btn-blue')
const TheAnswer = document.querySelector('.answer');
const TheAnswers = document.querySelector('.answers')
const ButtonSave = document.querySelector('.actions .btn-large')


console.log(TheAnswers);
deleteTheChosenAnswer()

function appendAnswers() {
    
    TheAnswers.appendChild(TheAnswer.cloneNode(true));
    deleteTheChosenAnswer()
}

function deleteTheChosenAnswer() {
    var deleteButton = document.querySelectorAll('.btn-orange')
    for (let i = 0; i < deleteButton.length; i++) {
        deleteButton[i].onclick = function (event) {
            event.target.parentNode.remove(event.target);
        }
    }
}
TheAddButton.addEventListener('click', appendAnswers)

//Store

const Store = {};
const listOfTheAnswer = [];
async function AddMoreQuestion(){    
    const dataOfTheQuestionInsert = document.querySelectorAll('input[type="text"]');
    const dataOfTheRadioInsert = document.querySelectorAll('input[type="radio"]');
     Store["text"] = dataOfTheQuestionInsert[0].value;
    for (let i = 1; i < dataOfTheQuestionInsert.length; i++){
        listOfTheAnswer.push(dataOfTheQuestionInsert[i].value);
        if (dataOfTheRadioInsert[i - 1].checked) {
            Store["correctAnswer"] = String(i - 1);
        }      
    }
    Store["answers"] =  listOfTheAnswer;
    await console.log(Store);
    SendDataToServer(Store)
}
 
ButtonSave.onclick = function(event){
    event.preventDefault();
}
ButtonSave.addEventListener('click', AddMoreQuestion)
 
function SendDataToServer(infoRequest){
    fetch('http://localhost:3000/questions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(infoRequest)
    }).then( response => response.json() )
    .then( info => {
        console.log(info);
        alert('Add The Question And The Answers sucessfully!!!')
    } );
}






