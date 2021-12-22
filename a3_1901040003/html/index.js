const showAllQuestion = document.querySelector('.container .index');
const find = document.querySelector('#search input');
const tableContainAllQuestions = document.querySelector('table');
const formScreen2 = document.querySelector('#screen2 #frm-create');
const monitor1 = document.querySelector('#screen1');
const monitor2 = document.querySelector('#screen2')
const catalogOfQuestionFindByKeyWords = [];
const duplicateData = [];

//This is use to begin the Web
beginTheWebsite()
showAllQuestion.addEventListener('click', beginTheWebsite)

//create a table in screen 2 for the question and the correct answer
async function doTable(info, goback) {
    let mlem = '<table>';
    mlem += '<tr>'
    mlem += '<th>#</th>'
    mlem += '<th>Question</th>'
    mlem += '<th>Answer</th>'
    mlem += '<th width="210">Actions</th>'
    mlem += '</tr>'
    info.forEach((QuesAndAns, i) => {
        mlem += '<tr>'
        mlem += '<td>' + (i + 1) + '</td>'
        mlem += '<td>' + htmlEntities(QuesAndAns.question) + '</td>'
        mlem += '<td>' + htmlEntities(QuesAndAns.correctAnswer) + '</td>'
        mlem += '<td>'
        mlem += '<a  id="' + (QuesAndAns._id) + '" class="btn btn-blue"><i class="far fa-edit"></i> Edit</a>'
        mlem += '<a class="btn btn-orange" value= "' + QuesAndAns._id + '"><i class="far fa-trash-alt"></i> Delete</a>'
        mlem += '</td>'
        mlem += '</tr>'
    });
    mlem += '</table>'

    tableContainAllQuestions.innerHTML = mlem;
    console.log(tableContainAllQuestions);

    goback();
    await returnTheIdOfTheOrangeButton();
}

//List all question and correctAnswer
async function DoAllTheQuesAndAns(info) {
    console.log(info);
    console.log(info.questionAndanswer)
    await doTable(info.questionAndanswer, returnTheIdOfTheBlueButton)
    for (let i = 0; i < info.questionAndanswer.length; i++) {
        duplicateData[i] = info.questionAndanswer[i];

    }
    monitor2.classList.add('hidden')
}

//fetch the question in the database
function beginTheWebsite() {
    fetch('http://localhost:3000/questions', {
        method: 'GET'
    })
        .then(function (response) {
            return response.json()
        })
        .then(DoAllTheQuesAndAns)
}


//find question by keyword
function findTheQuestionByKeyWords() {
    let keywords = find.value.toUpperCase();
    console.log(keywords);

    let count = 0;
    for (let i = 0; i < duplicateData.length; i++) {
        let a = duplicateData[i].question;
        if (a.toUpperCase().indexOf(keywords) > -1) {
            catalogOfQuestionFindByKeyWords[count] = duplicateData[i];
            count++;
        }
    }
    console.log(catalogOfQuestionFindByKeyWords);
    doTable(catalogOfQuestionFindByKeyWords, returnTheIdOfTheBlueButton)
}


//Will find the question when the user click enter on their keyboard
find.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        findTheQuestionByKeyWords();
    }
});

//edit detail question
let idOfAllTheBlueButton;
function returnTheIdOfTheBlueButton() {
    const listOfBlueButton = document.querySelectorAll('.btn-blue');
    console.log(listOfBlueButton);
    for (let i = 0; i < listOfBlueButton.length; i++) {
        listOfBlueButton[i].onclick = function (event) {
            idOfAllTheBlueButton = listOfBlueButton[i].getAttribute('id');
            // console.log(listOfBlueButton[i].getAttribute('id'));
            viewSelectionQuestion();
        }
    }
}

//Hidden the monitor 1 and display monitor 2
async function viewSelectionQuestion() {
    console.log(idOfAllTheBlueButton);
    await editSelectionQuestion(idOfAllTheBlueButton);
    monitor1.classList.add('hidden')
    monitor2.classList.remove('hidden')
}

let mlemSpecify;
//show the question that the user was selected to edit 
function displayTheSelectionQuestionInEdit(info) {
    console.log(info);
    console.log(info.text);
    console.log(info.answers);
    mlemSpecify = '<form id="frm-create">'
    mlemSpecify += '<div class="form-group">'
    mlemSpecify += '<label for="text">Text</label>'
    mlemSpecify += '<input type="text" name="text" value="' + htmlEntities(info.text) + '" />'
    mlemSpecify += '</div>'

    mlemSpecify += '<div class="form-group">'
    mlemSpecify += ' <label>Answers: </label>'
    mlemSpecify += '<div class="answers">'
    info.answers.forEach((solution, i) => {    
        mlemSpecify += '<div class="answer">'
        mlemSpecify += '<input type="text" name="answers" value=" ' + htmlEntities(solution) + '" />'
        mlemSpecify += '<div>'
        mlemSpecify += '<input name="correctAnswer" type="radio" value="0" /> <label for="answer0">correct</label>'
        mlemSpecify += '</div>'
        mlemSpecify += '<button type="button" class="btn btn-orange"><i class="fas fa-times"></i> Remove</button>'
        mlemSpecify += '</div>'
    })
    mlemSpecify += '</div>'

    mlemSpecify += '<div class="text-right">'
    mlemSpecify += '<button type="button" class="btn btn-blue"><i class="fas fa-plus"></i> Add</button>'
    mlemSpecify += '</div>'
    mlemSpecify += '</div>'

    mlemSpecify += '<div class="actions">'
    mlemSpecify += '<button class="btn btn-blue btn-large"><i class="fas fa-save"></i> Save</button>'
    mlemSpecify += '</div>'
    mlemSpecify += '</form>'

    formScreen2.innerHTML = mlemSpecify

    const chooseOnlyButton = document.querySelectorAll('input[type="radio"]')
    console.log(chooseOnlyButton);
    for (let i = 0; i < info.answers.length; i++) {
        if (i == info.correctAnswer) {
            chooseOnlyButton[i].checked = true;
        }
    }

    // addMoreAnswer();

    listOfTheEditFunction(info._id);
}



function editSelectionQuestion(id) {
    fetch('http://localhost:3000/questions/' + id, {
        method: 'GET'
    })
        .then(function (response) {
            return response.json()
        })
        .then(displayTheSelectionQuestionInEdit)
}




//delete question
let idOfAllTheOrangeButton;
function returnTheIdOfTheOrangeButton() {
    const listOfTheOrangeButton = document.querySelectorAll('.btn-orange');
    console.log(listOfTheOrangeButton);
    for (let i = 0; i < listOfTheOrangeButton.length; i++) {
        listOfTheOrangeButton[i].onclick = function (event) {
            idOfAllTheOrangeButton = listOfTheOrangeButton[i].getAttribute('value');
            console.log(idOfAllTheOrangeButton);
            removeTheQuestion(idOfAllTheOrangeButton);
        }
    }
}

function noticeSuccessDelete() {
    if (!alert('Delete The Question And Answer Successfully')) {
        window.location.reload();
    }
}

function removeTheQuestion(id) {
    fetch('http://localhost:3000/questions/' + id, {
        method: 'DELETE'
    })
        .then(function (response) {
            return response.json()
        }).then(noticeSuccessDelete)
}


function htmlEntities(s) {
    return s.replace(/[\u00A0-\u9999<>\&]/gim, function (i) {
        return '&#' + i.charCodeAt(0) + ';';
    });
}






