//@codekit-prepend('vendor/json2.js')
////@codekit-prepend('vendor/underscore.js')
//@codekit-prepend('vendor/jquery/jquery.js')
//@codekit-prepend('vendor/angular/angular.js')
//@codekit-prepend('vendor/angular/angular-route.js')
//@codekit-prepend('vendor/bootstrap/bootstrap.js')
//@codekit-prepend('vendor/bootstrap/summernote.js')
//@codekit-prepend('vendor/jquery/chosen.jquery.js')



var app = angular.module('app', ['ngRoute']);


app.factory('NotesService', function(){

	var notes = [
		{ id: 1, pageId:1, title: 'Note Title', body: '<p>This is a <strong>note</strong>. Love it</p>' },
		{ id: 1, pageId:2, title: 'Note Title', body: '<p>This is a <strong>note</strong>. Love it</p>' },
		{ id: 1, pageId:1, title: 'Note Title', body: '<p>This is a <strong>note</strong>. Love it</p>' },
		{ id: 1, pageId:3, title: 'Note Title', body: '<p>This is a <strong>note</strong>. Love it</p>' },
		{ id: 1, pageId:2, title: 'Note Title', body: '<p>This is a <strong>note</strong>. Love it</p>' },
		{ id: 1, pageId:1, title: 'Note Title', body: '<p>This is a <strong>note</strong>. Love it</p>' }
	];

});


app.factory('PagesService', function(){
	var pages = [
		{ id: 1, title: 'My Cool Page' },
		{ id: 2, title: 'Another Cool Page' },
		{ id: 3, title: 'Thrid Page' }
	];

	var getPages = function(){
		return pages;
	}

	var getPage = function(id){
		//use underscore to return a filtered page list here
	}
});


app.config(function($routeProvider){
	$routeProvider
		.when('/', {
			controller: 'HomeCtrl',
			templateUrl: 'views/notes-home.html'
		})
		.when('/:pageId', {
			controller: 'PageCtrl',
			templateUrl: 'views/notes-page.html'
		})
		.when('/:noteId', {
			controller: 'NoteCtrl',
			templateUrl: 'views/view-note.html'
		})
		.when('/note', {
			controller: 'NewNoteCtrl',
			templateUrl: 'views/add-note-html'
		})
		.otherwise({
			redirectTo: '/'
		});
});



app.controller('HomeCtrl', function($scope, PagesService, NotesService){

});


app.controller('PageCtrl', function($scope){

});


app.controller('NoteCtrl', function($scope){

});


app.controller('NewNoteCtrl', function($scope){

});



//this directive bootstraps the wysiwyg component of the app
app.directive('wysiwyg', function(){

	//bind our actions and set up our plugins
	var linker = function(scope, element, attrs){
		//find the summernote div
		var summernote = element.find('.summernote')
		//and init it with properties we want
		summernote.summernote({
		  toolbar: [
		    //[groupname, [button list]]
		    ['style', ['bold', 'italic', 'underline']],
		    ['font', ['strikethrough']],
		    ['para', ['ul', 'ol']]
		  ]
		});

		//when we click the button add the note, empty the string
		element.find('.btn').on('click', function(){
			scope.addNote(summernote.code());
			summernote.code('').focus();
		});

	}



	var controller = function($scope){
		$scope.addNote = function(note){
			alert(note);
		}
	}


	return{
		restrict: 'E',
		link: linker,
		controller: controller,
		templateUrl: 'views/wysiwyg-template.html'
	}

});