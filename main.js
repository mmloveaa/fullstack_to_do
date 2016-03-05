'use strict'

$(document).ready(init)

function init(){
	event.preventDefault;
	$('#addItems').on('click', addAllItems);
	showAllItem();
}


function addAllItems() {

var $date = $('#date').val();
var $toDo = $('#toDo').val();

var toDoObj = {
	date: $date,
	toDo: $toDo
};

// console.log(toDoObj)

	$.ajax({
		url: 'http://localhost:8888/todos/',
        type: "POST",
        data: toDoObj,
        success: function(data){
          // console.log('before stringify: ', data)
          // data = JSON.stringify(data);
          // console.log('todo data: ', data )

          var $toDoList = $('#template').clone()

          // $toDoList.removeAttr('id')
          // console.log("toDoList: ", $toDoList)

          $toDoList.find('.oneItem').text(data.toDo);
          $toDoList.find('.dateToDo').text(data.date);
          $('#toDo').val("")

          // console.log("dataToDo: ", data)
          $('#todoTable').append($toDoList);
          // console.log($toDoList)
          $($toDoList).children('td').children('input').removeClass('hidden');

          return $toDoList;

        },
        error: function(err){
          console.error(err);
       }
	})

}

function showAllItem(){

	$.ajax({
		url: 'http://localhost:8888/todos/',
        type: "GET",
        success: function(data){
        	console.log(data)
          // console.log('before stringify: ', data)
          // data = JSON.stringify(data);
          // console.log('todo data: ', data )
          var dataArray = data;



          for ( var i = 0; i < dataArray.length ; i++) {
            var $toDoList = $('#template').clone()
          	// console.log(dataArray[i].toDo)
	          $toDoList.find('.oneItem').text(dataArray[i].toDo);
	          $toDoList.find('.dateToDo').text(dataArray[i].date);

	          // console.log("dataToDo: ", data)
	          $('#todoTable').append($toDoList);
	          $($toDoList).children('td').children('input').removeClass('hidden');
	          // console.log($toDoList)
          }
          return;

        },
        error: function(err){
          console.error(err);
       }
	})

}

  		  // var elements;
  		  // for ( var i=0; i< dataArray.length ; i++) {
	  		 //  var $toDoList = $('#template').clone()
	     //      // 	console.log(dataArray[i].toDo)
	     //      $toDoList.find('.oneItem').text(dataArray[i].toDo);
	     //      $toDoList.find('.dateToDo').text(dataArray[i].date);
	     //      $($toDoList).children('td').children('input').removeClass('hidden');

	     //      // console.log("dataToDo: ", data)
  		  // 	  elements.append($toDoList);
  		  // 	  console.log(elements)
  		  // 	}

  		  // $('#todoTable').append(elements);