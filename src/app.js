let count = 0;
let booksArr = localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : [];
localStorage.setItem('books', JSON.stringify(booksArr));

//Book object
class Book{
    constructor(title, author, date, liked) {
        this.title = title;
        this.author = author;
        this.date = date;
        this.liked = liked;
    }
}

//Handles adding and displaying the books to form
class UI {
    static displayBooks() {

        const books = booksArr;

        books.forEach((book) => UI.addBook(book));
    }

    static clearFields(){
        document.getElementById('book-form').reset();
        return false;
    }

    static deleteBook(selection, title){
            selection.remove();
            count--;
            document.getElementById('count').innerHTML= `Total Read: ${count}`;
            for (var i = 0; i < booksArr.length; i++){
                if(booksArr[i].title == title){
                    booksArr.splice(i, 1);
                    
                }
            }
            localStorage.setItem('books', JSON.stringify(booksArr));
    }

    static addBook(book) {
        count++;
        document.getElementById('count').innerHTML= `Total Read: ${count}`;
        const container = document.getElementById('container');
        let newCard = document.createElement('div');
        newCard.setAttribute("id", "card");

        //Check if the book is liked, and selects heart icon
        if(book.liked == true){
            newCard.innerHTML = `
            <div id="card-stats"><i class="fas fa-heart" ></i><a class="delete-btn" href='#'>x</a></div>
                <p id="card-title">${book.title}</p>
                <p id="card-author">${book.author}</p>
                <p id="card-date">${book.date}</p>
            </div>`;
            }
            else{
            newCard.innerHTML = `
            <div id="card-stats"><i class="far fa-heart"></i><a class="delete-btn" href='#'>x</a></div>
                <p id="card-title">${book.title}</p>
                <p id="card-author">${book.author}</p>
                <p id="card-date">${book.date}</p>
            </div>`;
            }
        container.appendChild(newCard);
    }
}

document.addEventListener('DOMContentLoaded', UI.displayBooks);

document.getElementById('book-form').addEventListener('submit', (e) => {
e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const date = document.getElementById('date').value;
    const liked = document.getElementById('like').checked;

    let newBook = new Book(title, author, date, liked);

    booksArr.push(newBook);
    localStorage.setItem('books', JSON.stringify(booksArr));


    UI.addBook(newBook);
    UI.clearFields();
});

if(document.getElementById('container')){
    document.getElementById('container').addEventListener('click', (e) =>{
        const title = e.target.parentElement.parentElement.getElementsByTagName('p').namedItem('card-title').textContent;
        const selection = e.target.parentElement.parentElement;
        console.log(selection);
        console.log(title);
        if (selection != document.getElementById('container') && selection != document.getElementsByTagName("body")[0] && selection != document.getElementsByTagName("html")[0]){
        UI.deleteBook(selection, title);
        }
    });
}