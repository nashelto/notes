//@codekit-prepend('vendor/json2.js')
////@codekit-prepend('vendor/underscore.js')
//@codekit-prepend('vendor/jquery/jquery.js')
//@codekit-prepend('vendor/angular/angular.js')
//@codekit-prepend('vendor/angular/angular-route.js')
//@codekit-prepend('vendor/angular/angular-sanitize.js')
//@codekit-prepend('vendor/bootstrap/bootstrap.js')
//@codekit-prepend('vendor/bootstrap/summernote.js')
//@codekit-prepend('vendor/jquery/chosen.jquery.js')



var app = angular.module('app', ['ngRoute', 'ngSanitize']);


app.factory('NotesService', function(){

	var notes = [
		{ id: 1, pageId:1, title: 'Note 1', body: '<p>This is a <strong>note 1</strong>. Love it</p>' },
		{ id: 2, pageId:2, title: 'Note 2', body: '<p>This is a <strong>note 2</strong>. Love it</p>' },
		{ id: 3, pageId:1, title: 'Note 3', body: '<p>This is a <strong>note 3</strong>. Love it</p>' },
		{ id: 4, pageId:3, title: 'Note 4', body: '<p>This is a <strong>note 4</strong>. Love it</p>' },
		{ id: 5, pageId:2, title: 'Note 5', body: '<p>This is a <strong>note 5</strong>. Love it</p>' },
		{ id: 6, pageId:1, title: 'Note 6', body: '<p>This is a <strong>note 6</strong>. Love it</p>' }
	];


	/**
	 * This function simply returns our array of note Objects
	 * @return {array} an array of note objects to be returned
	 */
	var getNotes = function(){
		return notes;
	};


	/**
	 * This function takes a note id, finds that note in our list of notes
	 * creates a copy of it, updates it's id and pushes it into our list of notes
	 * @param  {integer} noteId the id property of the note object in our collection
	 * @return {undefined} Notheing is returned frmo this method
	 */
	var duplicateNote = function(noteId){
		var newNote = _.filter(notes, function(note){ return noteId == note.id });
		newNote = angular.copy(newNote[0]);
		newNote.id = notes.length + 1;
		notes.push(newNote);
	}

	/**
	 * This function destroys a note with the id given
	 * @param  {integer} noteId the id property of the note to delete
	 * @return {undefined} this funciton doesn't return anything
	 */
	var deleteNote = function(noteId){
		notes = _.filter(notes, function(note){ return noteId != note.id });
	}


	return {
		getNotes: getNotes,
		duplicateNote: duplicateNote,
		deleteNote: deleteNote
	};

});




app.factory('PagesService', function(){
	var pages = [
		{ id: 1, title: 'My Cool Page', body: '<p>Here are notes about blah blah blah...yeah</p>' },
		{ id: 2, title: 'Another Cool Page', body: '<p>Here are notes about blah blah blah...yeah</p>' },
		{ id: 3, title: 'Thrid Page', body: '<p>Here are notes about blah blah blah...yeah</p>' }
	];

	var getPages = function(){
		return pages;
	}


	return {
		getPages: getPages
	}

});




//our route provider
app.config(['$routeProvider', function($routeProvider){
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
}]);








app.controller('HomeCtrl', ['$scope', 'PagesService', 'NotesService', function($scope, PagesService, NotesService){
	$scope.pages = PagesService.getPages();
	$scope.notes = NotesService.getNotes();
	$scope.duplicateNote = function(noteId){
		NotesService.duplicateNote(noteId);
	}
	$scope.deleteNote = function(noteId){
		NotesService.deleteNote(noteId);
	}
}]);


app.controller('PageCtrl', ['$scope', function($scope){
	
}]);


app.controller('NoteCtrl', ['$scope', function($scope){
	
}]);


app.controller('NewNoteCtrl', ['$scope', function($scope){
	
}]);






//this directive bootstraps the wysiwyg component of the app
app.directive('wysiwyg', [function(){

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

}]);