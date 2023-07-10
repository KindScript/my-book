const logo = document.querySelector('.logo');
logo.addEventListener('click', e => {
    e.preventDefault();
    location.reload();
});

async function coll(ms){
    try {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=Flowers&maxResults=8&key=AIzaSyCx7DxIZrQhsk6OhZiGY2rlA6e3oO2fekw`);
        const {items} = await res.json();

        const loadeer = document.querySelector('.loadeer');
        setTimeout(()=> {
            loadeer.style.display = 'none';
            drow(all(items));
        }, ms);

        const allBooks = document.querySelector('.allBooks');
        allBooks.addEventListener('click', ()=> {
            all(items);
        });

        const searchBtn = document.querySelector('.search button');
        searchBtn.addEventListener('click', ()=> {
            search(items);
        });

        (function enter(){
            document.addEventListener('keydown', e => {
                if(e.key === 'Enter'){
                    search(items);
                }
            });
        })()
        
    }  
    catch(err) {
        throw new Error(err)
    }
}


function drow(content){
    return content;
}


const books = document.querySelector('.books');
let h2;

function all(arr){

    const section = document.querySelector('section');
    section.style.backgroundColor = "#fff";

    h2 = !arr ? '<h2>No Data</h2>' : '<h2>Books</h2>'
    books.innerHTML = h2;

    arr.filter(cont => cont.volumeInfo.description !== undefined).filter(cont => cont.volumeInfo.publisher !== undefined).map( cont =>  {
        const {title, authors, publisher, publishedDate, description} = cont.volumeInfo;
        const {thumbnail} = cont.volumeInfo.imageLinks;
        

        const book = `
                <div class="borderBlock">
                    <div class="bookBlock">
                        <div class="image">
                            <img src="${thumbnail}" alt="image">
                        </div>
                        <div class="content">
                            <h3>${title}</h3>
                            <h4>By ${authors}</h4>
                            <span>${publisher}&nbsp;&nbsp; ${publishedDate}</span>
                            <p>${description}</p>
                        </div>
                    </div>
                    <a href="./articles/article.html" onclick="goTo(this)">Go to</a>
                </div>
            `;
            

            books.innerHTML += book;
            activeBook();
    });
}

function search(arr){
    h2 = '<h2>Finded</h2>';
    books.innerHTML = h2;

    const input = document.querySelector('input');
    
    arr.filter(cont => cont.volumeInfo.title.includes( input.value.trim() )).map( cont =>  {
        const {title, authors, publisher, publishedDate, description} = cont.volumeInfo;
        const {thumbnail} = cont.volumeInfo.imageLinks;

        const book = `
                <div class="borderBlock">
                    <div class="bookBlock">
                        <div class="image">
                            <img src="${thumbnail}" alt="image">
                        </div>
                        <div class="content">
                            <h3>${title}</h3>
                            <h4>By ${authors}</h4>
                            <span>${publisher}&nbsp;&nbsp; ${publishedDate}</span>
                            <p>${description}</p>
                        </div>
                    </div>
                    <a href="./articles/article.html" onclick="goTo(this)">Go to</a>
                </div>
            `;

            books.innerHTML += book; 
            input.value = '';
            activeBook();
    });
}


function activeBook(){
    const borderBlocks = document.querySelectorAll('.borderBlock');
    const section = document.querySelector('section');

    borderBlocks.forEach(borderBlock => {
        borderBlock.addEventListener('click', ()=> {
            clearActiveClasses();
            
            borderBlock.classList.add('active_borderBlock');
            borderBlock.childNodes[1].classList.add('active_bookBlock')
            borderBlock.childNodes[3].style.opacity = '1';
            borderBlock.childNodes[3].style.transform = 'translate(150%, 100%)';

            section.style.backgroundColor = "#F5F6F8";
        });
    });

    function clearActiveClasses(){
        borderBlocks.forEach((borderBlock) => {
            borderBlock.classList.remove('active_borderBlock');
            borderBlock.childNodes[1].classList.remove('active_bookBlock');
            borderBlock.childNodes[3].style.opacity = '0';
        });
      }
}

function goTo(el){
   
    const img = el.parentElement.childNodes[1].childNodes[1].childNodes[1].src;
    const title = el.parentElement.childNodes[1].childNodes[3].childNodes[1].textContent;
    const authors = el.parentElement.childNodes[1].childNodes[3].childNodes[3].textContent;
    const publish = el.parentElement.childNodes[1].childNodes[3].childNodes[5].textContent;
    const description = el.parentElement.childNodes[1].childNodes[3].childNodes[7].textContent;

    localStorage.setItem("img", img);
    localStorage.setItem("title", title);
    localStorage.setItem("authors", authors);
    localStorage.setItem("publish", publish);
    localStorage.setItem("description", description);

}

coll(1000);

