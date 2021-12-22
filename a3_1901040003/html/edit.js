function listOfTheEditFunction(info) {
    appendAnswers();
    function appendAnswers() {
        const textRights = document.querySelector('.text-right')
        const TheAddButton = textRights.querySelector('.btn-blue')
        const formGroup = document.querySelectorAll('.form-group')
        const answer = formGroup[1].querySelector('.answer')
        const answers = formGroup[1].querySelector('.answers')
        console.log(TheAddButton);
        deleteTheChosenAnswer()
        TheAddButton.onclick = function () {
            answers.appendChild(answer.cloneNode(true));
            deleteTheChosenAnswer()
        }
    }
    function deleteTheChosenAnswer() {
        let listOfTheOrangeButton = document.querySelectorAll('.btn-orange')
        for (let i = 0; i < listOfTheOrangeButton.length; i++) {
            listOfTheOrangeButton[i].onclick = function (event) {
                event.target.parentNode.remove(event.target);
            }
        }
    }
    //save the question
    const saveTheEditButton = document.querySelector('.actions .btn-large')

    const Store = {};
    const listOfTheAnswer = [];
    function getTheData(){
        const dataOfTheQuestionInsert = document.querySelectorAll('input[type="text"]');
        const dataOfTheRadioInsert = document.querySelectorAll('input[type="radio"]');
         Store["text"] = dataOfTheQuestionInsert[1].value;
 
        for (let i = 2; i < dataOfTheQuestionInsert.length; i++){
            listOfTheAnswer.push(dataOfTheQuestionInsert[i].value);
               
        }
 
        for (let i = 0; i < dataOfTheRadioInsert.length; i++) {
            if (dataOfTheRadioInsert[i].checked == true) {
                Store["correctAnswer"] = String(i);
            }      
        }
        Store["answers"] =  listOfTheAnswer;
        editTheChosenQuestion(Store)
 
    }
    saveTheEditButton.onclick = function(event){
        event.preventDefault();
    }
 
    saveTheEditButton.addEventListener('click', getTheData);
 
    function editTheChosenQuestion(){
        fetch('http://localhost:3000/questions/' + info, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Store)
        }).then( response => response.json() )
        .then( info => {
            console.log(info);
            alert('Edit The Question and The Answers sucessfully!!!')
        });
    }
 

}

