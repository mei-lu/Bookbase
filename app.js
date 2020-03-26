let count = 0;
let booksArr = localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : [];
localStorage.setItem('books', JSON.stringify(booksArr));


//Book object
class Book{
    constructor(title, author, liked) {
        this.title = title;
        this.author = author;
        this.liked = liked;
    }
}

//Handles adding and displaying the books to form
class UI {
    static displayBooks() {

        const books = booksArr;

        books.forEach((book) => UI.addBook(book));
    }

    static addBook(book) {
        count++;
        document.getElementById('count').innerHTML= `Total Read: ${count}`;
        const list = document.getElementById('book-list');

        const row = document.createElement('tr');

        //Check if the book is liked, and selects heart icon
        if(book.liked == true){
        row.innerHTML = `
        <td id ="book-title">${book.title}</td>
        <td id ="book-author">${book.author}</td>
        <td><i class="fas fa-heart"></i></td>
        <td><a href="#" class="delete-btn">x</a></td>
        `;
        }
        else{
        row.innerHTML = `
        <td id="book-title">${book.title}</td>
        <td id ="book-author">${book.author}</td>
        <td><i class="far fa-heart"></i></td>
        <td><a href="#" class="delete-btn">x</a></td>
        `;
        }

        list.appendChild(row);
    }

    static clearFields(){
        document.getElementById('book-form').reset();
        return false;
    }

    static deleteBook(selection, title){
        if(selection.classList.contains('delete-btn')){
            selection.parentElement.parentElement.remove();
            count--;
            document.getElementById('count').innerHTML= `Total Read: ${count}`;
            for (var i = 0; i < booksArr.length; i++){
                if(booksArr[i].title == title){
                    booksArr.splice(i, 1);
                }
            }
            localStorage.setItem('books', JSON.stringify(booksArr));
        }
    }
}

document.getElementById('book-form').addEventListener('submit', (e) => {
e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const liked = document.getElementById('like').checked;

    let newBook = new Book(title, author, liked);
    console.log(newBook);

    booksArr.push(newBook);
    localStorage.setItem('books', JSON.stringify(booksArr));


    UI.addBook(newBook);
    UI.clearFields();
});

document.addEventListener('DOMContentLoaded', UI.displayBooks);

document.getElementById('book-list').addEventListener('click', (e) => {
    const row = e.target.closest('tr');
    const title = row.firstElementChild.textContent;
    UI.deleteBook(e.target, title);
});