// Model za izradu knjige
class Movie {
    constructor(name,url,rating) {
        this.name = name,
        this.url = url,
        this.rating = rating
    }
}

class UI {
    static displayMovies() {
        let movies = Storage.getMovies()
        if(movies === null || movies.length < 1) {
            document.querySelector('.movieDatabase').style.display = 'none'
        } else {
            document.querySelector('.noMovie').style.display = 'none'
            movies.forEach((item) => {
                let bookItem = document.createElement('li')
                bookItem.innerHTML = `
                    <div>
                        <img src='${item.url}' alt='${item.name}' class='list__img'>
                    </div>
                    <div class='list__description'>
                        <h2 class='list__name'>${item.name}</h2>
                        <p class='list__rating'>${item.rating}/5</p>
                        <button class='delete'>OBRIŠI</button>
                    </div>
                `
                document.querySelector('.movieDatabase__list').appendChild(bookItem)
            })
        }
    }

    static openOverlay() {
        document.querySelector('.overlay').style.display = 'block'
    }

    static createMovie() {
        let name = document.querySelector('.name').value
        let url = document.querySelector('.url').value
        let rating = document.querySelector('.rating').value
        if(name.trim() === '' || url.trim() === '' || rating.trim() === '' || rating < 1 || rating > 5 ) {
            alert('Molimo ispunite sva polja ispravno. Rating od 1 do 5!')
        }
        let newBook = new Movie(name,url,rating)
        return newBook
    }
    
    static removeMovie(e) {
        let deleted = e.target.parentElement.parentElement.lastElementChild.firstElementChild.innerHTML
        e.target.parentElement.parentElement.remove()
        Storage.deleteMovie(deleted)
        }
    }

class Storage {
    static getMovies() {
        let movies;
        if(localStorage.getItem('movies') === null) {
            movies = []
        } else {
            movies = JSON.parse(localStorage.getItem('movies'))
        }
        return movies
    }

    static addMovie(e) {
        let movies = Storage.getMovies()
        let newMovie = UI.createMovie()
        movies.push(newMovie)
        localStorage.setItem('movies',JSON.stringify(movies))
    }

    static deleteMovie(item) {
        let movies = Storage.getMovies()
        
        movies.forEach((i,index) => {
            if(item === i.name) {
                movies.splice(index, 1)
            }
        })
        localStorage.setItem('movies', JSON.stringify(movies))
    }
}

// Event - DOM učitavanje
document.addEventListener('DOMContentLoaded', UI.displayMovies)

// Eventi - otvaranje forme
document.querySelector('.btn').addEventListener('click', UI.openOverlay)
document.querySelector('.btn-newEntry').addEventListener('click', UI.openOverlay)

// Event - kreiranje knjige
document.querySelector('.btn--save').addEventListener('click', Storage.addMovie)

// Event - brisanje knjige
document.querySelector('.movieDatabase__list').addEventListener('click', UI.removeMovie)


















