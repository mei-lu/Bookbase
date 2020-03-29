let count = 0;
let bookGoal = localStorage.getItem('bookGoal') ? localStorage.getItem('bookGoal') : 0;
let name = localStorage.getItem('username') ? localStorage.getItem('username') : "there, set a name";
const sampleArr = [{title: "Sample Book",
author: "Try adding a book!",
date: "2020-03-12",
liked: true}]
let booksArr = localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : sampleArr;
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
        document.getElementById('user-greeting').innerHTML = `Hi ${name}!`
        document.getElementById('goal').innerHTML= `Reading Goal: ${bookGoal} books`

        console.log(booksArr);
    }

    static clearFields(){
        document.getElementById('book-form').reset();
        return false;
    }

    static deleteBook(selection, title){
        const toRemove = selection.parentElement;
        toRemove.classList.remove('fadeIn');
        toRemove.classList.add('animated', 'fadeOut');
        toRemove.classList.add('faster');

        toRemove.addEventListener('animationend', (e) => { toRemove.remove(); });

        count--;
        document.getElementById('count').innerHTML= `Total Read: ${count}`;
        if(bookGoal != 0) document.getElementById('progress').innerHTML= `You're ` + Math.round((count/bookGoal)*100) + `% there!`;

        for (var i = 0; i < booksArr.length; i++){
            if(booksArr[i].title == title){
                booksArr.splice(i, 1);
                    
            }
        }
        localStorage.setItem('books', JSON.stringify(booksArr));
    }

    static addBook(book) {
        count++;
        if(bookGoal != 0) document.getElementById('progress').innerHTML= `You're ` + Math.round((count/bookGoal)*100) + `% there!`;
        document.getElementById('count').innerHTML= `Total Read: ${count}`;
        const container = document.getElementById('container');
        let newCard = document.createElement('div');
        newCard.setAttribute("id", "card");

        //Check if the book is liked, and selects heart icon
        if(book.liked == true){
            newCard.innerHTML = `
            <div id="card-stats"><i id="heart-icon" class="fas fa-heart" ></i><a class="delete-btn" href='#'>x</a></div>
                    <p id="card-title" style="font-size:18px;">${book.title}</p>
                    <p id="card-author" style="font-size:13px;">by ${book.author}</p>
                    <p id="card-date" style="font-size:11px;">Completed | ${book.date}</p>
                </div>`;
            }
            else{
            newCard.innerHTML = `
                <div id="card-stats"><i id="heart-icon" class="far fa-heart"></i><a class="delete-btn" href='#'>x</a></div>
                    <p id="card-title" style="font-size:18px;">${book.title}</p>
                    <p id="card-author" style="font-size:13px;">by ${book.author}</p>
                    <p id="card-date" style="font-size:11px;">Completed | ${book.date}</p>
                </div>`;
            }
        newCard.classList.add('animated', 'fadeIn');
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

/*Set name and reading goals */
document.getElementById('settings-form').addEventListener('submit', (e) => {
    e.preventDefault();

    name = document.getElementById('form-name').value;
    document.getElementById('user-greeting').innerHTML = `Hi ${name}!`
    localStorage.setItem('username', name);

    bookGoal = document.getElementById('form-goal').value;
    localStorage.setItem('bookGoal', bookGoal);
    if(bookGoal != 0){
        document.getElementById('progress').innerHTML= `You're ` + Math.round((count/bookGoal)*100) + `% there!`;
    }
    else{
        document.getElementById('progress').innerHTML= `Set a reading goal!`;
    }

    document.getElementById('goal').innerHTML= `Reading Goal: ${bookGoal}`

});


if(document.getElementById('container')){
    document.getElementById('container').addEventListener('click', (e) =>{
        const title = e.target.parentElement.parentElement.getElementsByTagName('p').namedItem('card-title').textContent;
        const target = e.target;
        if (target.parentElement.id == 'card-stats' && (target.className == 'delete-btn')){
            let selection = target.parentElement;
            UI.deleteBook(selection, title);
        }
    });
}

document.addEventListener('click', (e) => {
    if(e.target && e.target.id == 'heart-icon'){
        const heart = e.target;
        console.log(heart.className)
        if(heart.className == 'fas fa-heart'){
            heart.classList.remove('fas');
            heart.classList.remove('fa-heart');
            heart.classList.add('far');
            heart.classList.add('fa-heart');
        }else{
            heart.classList.remove('far');
            heart.classList.remove('fa-heart');
            heart.classList.add('fas');
            heart.classList.add('fa-heart');
        }
    }
    const title = e.target.parentElement.parentElement.getElementsByTagName('p').namedItem('card-title').textContent;
    for (var i = 0; i < booksArr.length; i++){
        if(booksArr[i].title == title){
            if(booksArr[i].liked == true){
                booksArr[i].liked = false;
            }
            else{
                booksArr[i].liked = true;
            }
                
        }
    }
    localStorage.setItem('books', JSON.stringify(booksArr));

});
