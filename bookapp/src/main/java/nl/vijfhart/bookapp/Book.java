package nl.vijfhart.bookapp;

import javax.xml.bind.annotation.XmlRootElement;


@XmlRootElement
public class Book {
	
	private String isbn;
	private String title;
	private String author;
	
	public Book() {
	}
	
	public Book(String isbn, String title, String author) {
		this.isbn = isbn;
		this.title = title;
		this.author = author;
	}
	
	public String getIsbn() {
		return isbn;
	}
	
	public void setIsbn(String isbn) {
		this.isbn = isbn;
	}
	
	public String getTitle() {
		return title;
	}
	
	public void setTitle(String title) {
		this.title = title;
	}

	public String getAuthor() {
		return author;
	}
	
	public void setAuthor(String author) {
		this.author = author;
	}	
	
	@Override
	public boolean equals(Object other) {
		if (other instanceof Book){
			Book book = (Book)other;
			if (this.isbn.equals(book.getIsbn())){
					return true;
			}
		}
		return false;
	}
	
	@Override
	public int hashCode(){
		return isbn.hashCode();
	}
}