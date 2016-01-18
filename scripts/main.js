$.ajax({
    url: 'http://namegame.willowtreemobile.com:2000',
    success: function(people) {
        shuffle(people);
        var data = {employees: []};
        for (i=0; i<5; i++){
          data.employees.push(people[i]);
        };
        var randomselect = Math.floor((Math.random() * data.employees.length) + 1);
        var selected = data.employees[randomselect];
        // console.log(data);
        // console.log(selected.name);

        var emplsource = $("#employee-template").html();
        var empltemplate = Handlebars.compile(emplsource);
        $("#employee-list").html(empltemplate(data));

        var qsource = $("#question-template").html();
        var qtemplate = Handlebars.compile(qsource);
        $("#question").html(qtemplate(selected));



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
