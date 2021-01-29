const bill = document.getElementById('input');
const billForm = document.querySelector('.input');
const people = document.querySelectorAll('.people');
const peopleUp = document.querySelector('.people-plus');
const peopleDown = document.querySelector('.people-minus');
const peopleNum = document.querySelector('.number-people');
const emoji = document.querySelectorAll('.emoji-container');
const numBtns = document.querySelectorAll('.num');

const numpad = document.querySelector('.numpad');

const resultPage = document.querySelector('.button-box');
const resultBtn = document.querySelector('button');
const calculator = document.querySelector('.calculator');
const resultWindow = document.querySelector('.result');

const totalEl = document.querySelector('.total-result');
const tipEl = document.querySelector('.tip-result');
const eachEl = document.querySelector('.each-result');

let company = 3;
let equation ='';
let final = 0;
let tip = 0.15;
let sum = 0;
let each;
let extra;


let calc = function() {

    const hideCalculator = function() {
        calculator.classList.add('hidden');
    }

    const showStartButton = function() {
        resultPage.classList.replace('hidden','button-appear');
        // resultPage.classList.remove();
    }

    function restartPage() {
        numpad.classList.remove('button-appear');
        numpad.classList.add('button-dissapear');
        setTimeout(()=> {
            numpad.classList.replace('fa-undo-alt','fa-calculator');
            numpad.classList.remove('button-dissapear');
            numpad.classList.add('button-appear');
        },500);


        //add animation
        
        resultWindow.classList.remove('result-appear');
        resultWindow.classList.add('result-remove');
        setTimeout(()=>{
            resultWindow.classList.add('hidden');
        }, 500);

        setTimeout(showStartButton, 500);
        //заменить репит на калькулятор*
        //убрать numpad *
        //вернуть кнопку *
        //обнулить данные

    }

    // INPUT FILTER

    bill.addEventListener('focus', ()=> {
        restoreAttention();
    });

    bill.addEventListener('keypress', function(e) {
        if(e.key == '.' && bill.value.match(/\./)) {
            e.preventDefault();
        }
        if (!e.key.match(/[\.0-9]/ig)) {
            e.preventDefault();
        }
    });

    bill.addEventListener('input', () => {
        if (!bill.value.match(/[\.0-9]/ig)) {
           bill.value = '';
        }
     });
     
    //NUMPAD FUNCTIONALITY
    function removeStartButton() {
        function hideStartButton() {
            resultPage.classList.add('hidden');
        }
            resultPage.classList.remove('button-appear');
            resultPage.classList.add('button-dissapear');
            setTimeout(hideStartButton,600);
    }

    numpad.addEventListener('click', () => {
        if (numpad.classList.contains('fa-undo-alt')) {
            restartPage();
        } else {
            if (!numpad.classList.contains('fas-active')) {

                numpad.classList.add('fas-active');

                const calcShow = function() {
                    calculator.classList.remove('hidden');
                    calculator.classList.remove('calc-up'); //add-on
                    calculator.classList.add('calc-down');
                }

                removeStartButton()
                setTimeout(calcShow, 600);

            } else {
                numpad.classList.remove('fas-active');

                

                calculator.classList.remove('calc-down');
                calculator.classList.add('calc-up');
                setTimeout(hideCalculator, 500);
                resultPage.classList.remove('button-dissapear');
                setTimeout(showStartButton, 500);
            }
        }

    });


    numBtns.forEach(numb => {
        numb.addEventListener('click', (e)=> {
            restoreAttention();
        if(e.target.textContent == "c") {
            bill.value = bill.value.slice(0,-1);
            return;
        }
        if (e.target.textContent == ".") {
            if (bill.value.match(/\./g)) {
            return;
            } else {
                bill.value += ".";
                return;
            }       
        }
        equation+=e.target.textContent;
        bill.value += e.target.textContent;
    });
    });


    // PEOPLE BUTTONS

    people.forEach(per => {
        per.addEventListener('click', (e)=> {
            people.forEach(p => {
                p.classList.remove('fas-active');
            });
            company = e.target.dataset.people;
            peopleNum.textContent = e.target.dataset.people;
            per.classList.add('fas-active');
            console.log(company);
        });
        
    });

    peopleUp.addEventListener('click', ()=> {
        if (company < 3) {
            people[peopleNum.textContent-1].classList.remove('fas-active'); //2
            people[peopleNum.textContent].classList.add('fas-active'); //3
        }
       if (company < 9) {
        peopleNum.textContent = Number(peopleNum.textContent) + 1  ;
        company = peopleNum.textContent;
        console.log(company);
       } else {
           return;
       }
    });

    peopleDown.addEventListener('click', ()=> {
        if (company < 4 && company > 1) {
            people[peopleNum.textContent-1].classList.remove('fas-active'); //2
            people[peopleNum.textContent-2].classList.add('fas-active');//1
        }
       if (company > 1) {
        peopleNum.textContent = Number(peopleNum.textContent) - 1  ;
        company = peopleNum.textContent;
        console.log(company);
       } else {
           return;
       }
    });

    // EMOJI FUNCTIONALITY

    emoji.forEach(em => {
        em.addEventListener('click', ()=> {
            emoji.forEach(p => {
                p.firstElementChild.classList.remove('fas-active');
                p.lastElementChild.classList.remove('tip-active');
            });
                em.firstElementChild.classList.add('fas-active');
                em.lastElementChild.classList.add('tip-active');
        });
        em.addEventListener('click', (e)=> {
            tip = (e.target.dataset.tip)/100;
            console.log(tip);
        });
    });

    //SHOW RESULT 
    function calculateResult() {
        sum = (bill.value * (1+tip));
        if(!Number.isInteger(sum)) {
            sum = sum.toFixed(2);
        } 
        totalEl.textContent = sum+"$";

        extra = bill.value * tip;
        if(!Number.isInteger(extra)) {
            extra = extra.toFixed(2);
        } 
        tipEl.textContent = extra+"$";

        each = (bill.value * (1+tip))/company;
        if(!Number.isInteger(each)) {
            each = each.toFixed(2);
        } 
        eachEl.textContent = each+"$";
    }

    function showResult() {
        resultWindow.classList.remove('result-remove');
        resultWindow.classList.remove('hidden');
        resultWindow.classList.add('result-appear');
    }

    function bringAttention() {
        billForm.classList.add('btn--shockwave');
        billForm.classList.add('is-active');
    }

    function restoreAttention() {
        billForm.classList.remove('btn--shockwave');
    }



    resultBtn.addEventListener('click', ()=> {
        
        function addRepeatBtn() {
            numpad.classList.remove('button-appear');
            numpad.classList.add('button-dissapear');
            setTimeout(()=> {
                numpad.classList.remove('fa-calculator');
                numpad.classList.remove('button-dissapear');
                numpad.classList.add('fa-undo-alt');
                numpad.classList.add('button-appear');
            },500);
        }

        if(!bill.value) {
            bringAttention();
            setInterval(restoreAttention,10000);
            return;
        }
        addRepeatBtn();
        removeStartButton();
        calculateResult();
        setTimeout(showResult,600);
    });
};

calc();

// add filter for input *
// add calculate function *

// add condition for a button * + add animation *kind of

// remove everything when calculator is open;

//  add repeat button - replace calculator 

//fix result-button
//fix animation when check for result
//add currency + local Storage