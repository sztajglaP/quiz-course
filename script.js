window.onload = function() {
    quiz.init();
}

class Quiz {
    currentQuestionIndex = -1;

    async init() {
        this.progress = document.querySelector('#progress');
        this.countDownInfo = document.querySelector('#count-down');
        this.questionHeading = document.querySelector('#question-heading');

        this.answersList = document.querySelector('#answers-list');
        this.summary = document.querySelector('.summary');

        this.submitButton = document.querySelector('#submit-answer');
        this.submitButton.addEventListener('click', this.submitAnswer);

        this.restartButton = document.querySelector('#restart-quiz');
        this.restartButton.addEventListener('click', this.restartQuiz);

        await this.loadData();

        this.restartQuiz();
    }

    loadData = async() => {
        const serverData = await fetch("questions.json");
        const jsonData = await serverData.json();

        if(!jsonData.questions) {
            console.log('Brak pytan');
            return;
        }

        this.quizMaxTime = jsonData.quizMaxTime * 1000;
        this.questions = jsonData.questions;
    }

    submitAnswer = () => {
        
    }

    restartQuiz = () => {
        this.questions.forEach(q => q.userSelectedIndex = -1);

        this.currentQuestionIndex = -1;
        this.countDown();
        this.setNextQuestionData();
    }

    countDown = () => {
        if(!this.countDownInterval) {
            this.quizStartTime = new Date().getTime();
            this.quizEndTime = this.quizStartTime + this.quizMaxTime;

            this.countDownInterval = setInterval(() => {
                const currentTime = new Date().getTime();

                if(currentTime >= this.quizEndTime) {
                    console.log('Koniec quizu');
                    this.stopCountDown();
                    this.showSummary();
                    return;
                }

                let timeLeft = Math.floor((this.quizEndTime - currentTime) / 1000);

                this.countDownInfo.innerHTML = 'Pozostalo: ' + timeLeft + ' sekund';
            }, 1000);
        }
    }

    stopCountDown = () => {
        clearInterval(this.countDownInterval);
        this.countDownInterval = null;
        this.countDownInfo.innerHTML = '';
    }

    setNextQuestionData = () => {

    }

    showSummary = () => {

    }
}

const quiz = new Quiz;

