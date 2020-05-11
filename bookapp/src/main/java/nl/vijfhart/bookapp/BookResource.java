package nl.vijfhart.bookapp;

import javax.ws.rs.Path;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.DELETE;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@Path("/books")
public class BookResource {
	
	private static Map<String, Book> books = new HashMap<>();

	public BookResource() {
	}
	
	@GET
	@Produces({MediaType.APPLICATION_JSON})
	public Collection<Book> findAll()	{
		return books.values();
	}

	@GET
	@Path("{isbn}")
	@Produces({MediaType.APPLICATION_JSON})
	public Book findById(@PathParam("isbn") String isbn) {
		return books.get(isbn);
	}
		
	@POST
	@Produces({MediaType.APPLICATION_JSON})
	@Consumes({MediaType.APPLICATION_JSON})
	public Book create(Book book) {
		String key = book.getIsbn();
		Book b = new Book(book.getIsbn(), book.getTitle(), book.getAuthor());
		books.put(key, b);
		return b;
	}
	
	@PUT
	@Path("{isbn}")
	@Produces({MediaType.APPLICATION_JSON})
	@Consumes({MediaType.APPLICATION_JSON})
	public Book update(Book book) {
		String isbn = book.getIsbn();
		Book b = books.get(isbn);
		b.setTitle(book.getTitle());
		b.setAuthor(book.getAuthor());
		return b;
	}
	
	@DELETE
	@Path("{isbn}")
	@Produces({MediaType.APPLICATION_JSON})
	public void delete(@PathParam("isbn") String isbn) {
		books.remove(isbn);
	}
}
	