$(function(){

  var selected; // global variable allows for comparison on picture click

  // possible add-on: difficulty setting for quiz that increases list size
  var difficulties = {
    easy: 5,
    medium: 10,
    hard: 15
  };
  var chosenDifficulty = $("input[name=difficulty]:checked").val();
  var listLength = difficulties[chosenDifficulty];

  $(".difficulty input").on("click", function(){
    chosenDifficulty = $("input[name=difficulty]:checked").val();
    listLength = difficulties[chosenDifficulty];
    newGame();
  });

  $('#employee-list').delegate('.employee', 'click', function(){
    var name = $(this).find("h2").html();
    if (name === selected.name){
      $(this).find(".hidden").removeClass("hidden");
      $(this).addClass("correct");
      correctGuesses++;
      calcScore();
      setTimeout(newGame, 1000); // refresh list by running new game function
    } else {
      $(this).find(".hidden").removeClass("hidden");
      $(this).addClass("incorrect");
      wrongGuesses++;
      calcScore();
    }
  });

  // scoring functionality
  var correctGuesses = 0;
  var wrongGuesses = 0;
  function calcScore(){
    $("#correctscore").html("Correct Guesses: " + correctGuesses);
    $("#wrongscore").html("Incorrect Guesses: " + wrongGuesses);
  }

  function newGame(){
    // picking random number immediately to avoid asynchronous build of question template
    // while math.random is still computing
    var randomSelection = Math.floor((Math.random() * (listLength - 1)) + 1);
    calcScore();
    $.ajax({
      url: 'http://namegame.willowtreemobile.com:2000',
      success: function(people) {
        shuffle(people);
        getList(people);
      }
    });

    // Fisher-Yates shuffle to randomize employee list
    function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }

    // after shuffle, return list of first five employees
    function getList(array){
      var list = {employees: []};
      for (i=0; i<listLength; i++){
        list.employees.push(array[i]);
      };
      // when list is complete, run build question function
      if (list.employees.length === listLength){
        buildQuestion(list.employees);
      }
      // build handlebars template for employee list
      var emplsource = $("#employee-template").html();
      var empltemplate = Handlebars.compile(emplsource);
      $("#employee-list").html(empltemplate(list));
    }

    // build handlebars template for question
    function buildQuestion(object){
      selected = object[randomSelection];
      var qsource = $("#question-template").html();
      var qtemplate = Handlebars.compile(qsource);
      $("#question").html(qtemplate(selected));
    }
  };

  // run newGame on window load
  newGame();
});
