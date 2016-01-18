$(function(){

  var selected;

  $('#employee-list').delegate('.employee', 'click', function(){
    var name = $(this).find("h2").html();
    console.log(name);
    console.log(selected.name);
    if (name === selected.name){
      console.log("winner");
      $(this).find(".hidden").removeClass("hidden");
      $(this).addClass("correct");
      setTimeout(newGame, 1000);
    } else {
      console.log("choose again");
      $(this).find(".hidden").removeClass("hidden");
      $(this).addClass("incorrect");
    }
  });

  function newGame(){
    $.ajax({
      url: 'http://namegame.willowtreemobile.com:2000',
      success: function(people) {
        shuffle(people);
        getList(people, selectRandom);
        // var data = {employees: []};
        // for (i=0; i<5; i++){
        //   data.employees.push(people[i]);
        // };
        // var randomselect = Math.floor((Math.random() * data.employees.length) + 1);
        // selected = data.employees[randomselect];
        // console.log(data);
        // console.log(selected.name);
        // asynchronous issue: sometimes randomselect doesn't compute fast enough, selected is undefined

        // var emplsource = $("#employee-template").html();
        // var empltemplate = Handlebars.compile(emplsource);
        // $("#employee-list").html(empltemplate(data));

        // selectRandom(data.employees);
      }
    });



  };

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
  function selectRandom(object){
    console.log("running selectRandom");
    var randomselect = Math.floor((Math.random() * object.length) + 1);
    selected = object[randomselect];
    if (selected){
      var qsource = $("#question-template").html();
      var qtemplate = Handlebars.compile(qsource);
      $("#question").html(qtemplate(selected));
    } else {
      console.log("nothing selected");
    }
  }

  function getList(array, callback){
    var data = {employees: []};
    for (i=0; i<5; i++){
      data.employees.push(array[i]);
    };
    if (data.employees.length === 5){
      callback(data.employees);
    }
    var emplsource = $("#employee-template").html();
    var empltemplate = Handlebars.compile(emplsource);
    $("#employee-list").html(empltemplate(data));
  }


  newGame();
});
