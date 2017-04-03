'use strict';

var trivia = {
    count: 0,  //keep track of current question
    correct: 0,
    incorrect: 0,
    questions: [{
        question: "The capital city of Canada?",
        answer: 'Ottawa',
        selections: ['Whistler','Victoria', 'Ottawa', 'Halifax']
    }, {
        question: 'The largest city in Canada?',
        answer: 'Toronto',
        selections: ['Vancouver', 'Toronto', 'Quebec City', 'Montreal']
    }, {
        question: "What is the Canadian term for the country's indigenous populations?",
        answer: 'The First Nations',
        selections: ['Native Americans', 'Indians', 'American Indians', 'The First Nations']
    }, {
        question: "When do Canadians celebrate their Independence Day?",
        answer: 'July 1',
        selections: ['July 1', 'July 4','July 6', 'July 14']
    }, {
        question: 'How many provinces are in Canada?',
        answer: '10',
        points: '10',
        selections: ['5', '10', '12', '20']
    }, {
        question: "Which province produces the most maple syrup?",
        answer: 'Quebec',
        selections: ['Ontario', 'Newfoundland and Labrador', 'New Brunswick', 'Quebec']
    }, {
        question: "What year did Justin Trudeau become prime minister?",
        answer: '2015',
        selections: ['2012', '2013', '2014', '2015']
    }, {
        question: "The animal symbol of Canada?",
        answer: 'Beaver',
        selections: ['Grizzly Bear', 'Beaver', 'Bison', 'Caribou']
    }],

    getQuestion: function(questionIndex) {
        // reset question html section
       $('.correct, .incorrect, .selection').remove();
       stopwatch.reset();

       // display new question
       $('.question').html(trivia.questions[questionIndex].question);
        
       trivia.questions[questionIndex].selections.forEach(function(index) {
            $('.selection-group').append('<div class="selection">' + index + '</div>');
        });
        
       $('.question, .selection-group').css('display', 'block');
       $('#timer, .quiz').css('display', 'block');
       stopwatch.start();
    },
    getAnswer: function(this_, questionIndex) {
        var playerSelection = $(this_).html();
        $('.question, .selection-group').css('display', 'none');
        stopwatch.stop();

        //Display message for correct or incorrect selection  
        if (playerSelection === trivia.questions[questionIndex].answer){
            $('.answer').append('<h3 class="correct">Correct!</div>');
            trivia.correct++;
        } else {
            $('.answer').append('<h3 class="incorrect">Incorrect! The correct answer is '+ trivia.questions[questionIndex].answer +'. </div>');
            trivia.incorrect++;
      }
      trivia.count++;

      //Show next question or game over page after 1 sec
      if (trivia.count < trivia.questions.length) {
          setTimeout(function() { trivia.getQuestion(trivia.count); }, 2000);                                                             
        } else {
            setTimeout(function() { 
                stopwatch.stop();
                stopwatch.gameOver();
          }, 2000); 
        }
    }
 };

// Variable that will hold our setInterval that runs the stopwatch
var intervalId;

var stopwatch = {

  time: 30,

  start: function() {

    //Use setInterval to start the count.
    intervalId = setInterval(stopwatch.count, 1000);
  },
  reset: function() {
    stopwatch.time = 30;
    $("#display").html("00:30");
  },

  stop: function() {

    //Use clearInterval to stop the count.
    clearInterval(intervalId);
  },

  count: function() {

    //Decrement time by 1, remember we cant use "this" here.
    stopwatch.time--;

    // Get the current time, pass that into the stopwatch.timeConverter function,
    //       and save the result in a variable.
    var converted = stopwatch.timeConverter(stopwatch.time);
    console.log(converted);

    // Use the variable we just created to show the converted time in the "display" div.
    $("#display").html(converted);

    // Timeout condition.  Show correct answer. 
    if (stopwatch.time <= 0){ 
    	stopwatch.stop();
    	$("#display").html("00:00");
      $('.question, .selection-group').css('display', 'none');

      $('.answer').append('<h3 class="incorrect">The correct answer is '+ 
          trivia.questions[trivia.count].answer +'. </div>');
    
    //Show next question or game over page after 1 sec
    setTimeout(function () { 
            stopwatch.stop();
            trivia.count++;
            if(trivia.count < trivia.questions.length){
              trivia.getQuestion(trivia.count);
            }else {
              stopwatch.gameOver();
            }
         
          }, 2000); 
        }
    	
  },

  getScore: function() {

  	var unanswered = 0;

    unanswered = trivia.questions.length - (trivia.correct + trivia.incorrect);

    $("#correct").html(trivia.correct);
    $("#incorrect").html(trivia.incorrect);
    $("#unanswered").html(unanswered);
  },

  gameOver: function() {
   $('.quiz').css('display','none');
	 $('.game-over-container').css('display','block');
	 stopwatch.getScore();
  },
  timeConverter: function(t) {

    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }
    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  }
};

$("#start").click(function() {
    $('.start-container').css('display','none');
    trivia.getQuestion(trivia.count);
}); //end $("#start").click

$(document).on('click', '.selection', function() { trivia.getAnswer(this, trivia.count); });

$("#start-over").click(function() {
$('.game-over-container').css('display', 'none');
    trivia.count = 0;
    trivia.correct = 0;
    trivia.incorrect = 0;
    stopwatch.reset();
    trivia.getQuestion(trivia.count);
});
