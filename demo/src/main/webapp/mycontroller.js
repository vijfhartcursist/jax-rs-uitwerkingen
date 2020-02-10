var rootUrl = "http://localhost:9080/data/books";
var currentBook;

$(window).on('load',function(){
$('#bookForm').find('*').prop("disabled", true);
});

$(document).ready(function(){
	showAll();

	$('#btnNew').click(function() {
		$('#bookForm').find('*').prop("disabled", false);
		$('#btnUpdate').prop("disabled", true);
		$('#btnDelete').prop("disabled", true);
		currentBook = {};
		renderDetails(currentBook);
		return false;
	});

	$('#btnSave').click(function() {
		if ($('#isbn').val() != ''){
			addBook();
			$("#isbn").prop("disabled", true);
			$("#btnSave").prop("disabled", true);
			$("#btnUpdate").prop("disabled", false);
			$("#btnDelete").prop("disabled", false);			
			return false;
		} else alert('isbn is mandatory');
	});
	
	$('#btnUpdate').click(function() {
		updateBook();		
		$("#isbn").prop("disabled", true);
		return false;
	});

	$('#btnDelete').click(function() {
		deleteBook();
		currentBook={};
		renderDetails(currentBook);
		$('#bookForm').find('*').prop("disabled", true);
		return false;
	});

	$('#bookList').on('click', 'a', function(e) {
		findById($(this).data('identity'));
		$('#bookForm').find('*').prop("disabled", false);
		$("#btnSave").prop("disabled", true);
		$("#isbn").prop("disabled", true);
		return false;
	});

});

function showAll(){
	$.ajax({
		type: 'GET',
		url: rootUrl,
		dataType: "json",
		success: renderList
	});
}
	
function findById(isbn) {
	$.ajax({
		type: 'GET',
		url: rootUrl + '/' + isbn,
		dataType: "json",
		success: function(data) {
			currentBook = data;
			renderDetails(currentBook);
		}
	});
}

function addBook() {
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: rootUrl,
		dataType: "json",
		data: formToJSON(),
		success: function(data, textStatus, jqXHR) {
			showAll();
		},
		error: function(jqXHR, textStatus, errorThrown) {
			alert('addBook error: ' + textStatus);
		}
	});
}

function updateBook() {
	$.ajax({
		type: 'PUT',
		contentType: 'application/json',
		url: rootUrl + '/' + $('#isbn').val(),
		dataType: "json",
		data: formToJSON(),
		success: function(data, textStatus, jqXHR){
			showAll();	
		},
		error: function(jqXHR, textStatus, errorThrown) {
			alert('updateBook error: ' + textStatus);
		}
	});
}

function deleteBook() {
	$.ajax({
		type: 'DELETE',
		url: rootUrl + '/' + $('#isbn').val(),
		success: function(data, textStatus, jqXHR){
			showAll();
		},
		error: function(jqXHR, textStatus, errorThrown) {
			alert('deleteBook error');
		}
	});
}

function renderList(data) {
	var list = data == null ? [] : (data instanceof Array ? data : [data]);
	
	$('#bookList li').remove();
	$.each(list, function(index, book) { 
		$('#bookList').append('<li><a href="#" data-identity="'+ book.isbn + '">' + book.isbn + '</a>&nbsp;' + book.title + ';' + book.author + '</li>');
	});
}

function renderDetails(book) {
	$('#isbn').val(book.isbn);
	$('#title').val(book.title);
	$('#author').val(book.author);
}
		
function formToJSON() {
	return JSON.stringify({
		"isbn": $('#isbn').val(),
		"title": $('#title').val(),
		"author": $("#author").val(),
	});
}