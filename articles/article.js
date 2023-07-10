const book_img = document.querySelector('.img img');
const author_h2 = document.querySelector('.author h2');
const h3 = document.querySelector('h3');
const content_h3 = document.querySelector('.content h3');
const p = document.querySelector('p');

book_img.src = localStorage.getItem("img");
book_img.alt = localStorage.getItem("title");
author_h2.textContent = localStorage.getItem("authors");
h3.textContent = localStorage.getItem("publish");
content_h3.textContent = localStorage.getItem("title");
p.textContent = localStorage.getItem("description");


async function coll(ms){
    try {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=Flowers&maxResults=8&key=AIzaSyCx7DxIZrQhsk6OhZiGY2rlA6e3oO2fekw`);
        const {items} = await res.json();

        const loadeer = document.querySelector('.loadeer');
        setTimeout(()=> {
            loadeer.style.display = 'none';
            drow(items);
        }, ms);

    }  
    catch(err) {
        throw new Error(err)
    }
}


const books = document.querySelector('.books');
function drow(arr){

    for(let i = 0; i < arr.length; i++){

        const random = Math.floor( Math.random() * arr.length );
        arr.length = 4;

       const {title, authors, publisher, publishedDate, description} =  arr[i].volumeInfo;
        const {thumbnail} =  arr[i].volumeInfo.imageLinks;

        if(publisher !== undefined && description !== undefined){
            const book = `
                <div class="borderBlock" onclick="eachCall(this)">
                    <div class="bookBlock">
                        <div class="image">
                            <img src="${thumbnail}" alt="image">
                        </div>
                        <div class="bookContent">
                            <h3>${title}</h3>
                            <h4>By ${authors}</h4>
                            <span>${publisher}&nbsp;&nbsp; ${publishedDate}</span>
                            <p>${description}</p>
                        </div>
                    </div>
                </div>
            `;
            books.innerHTML += book;
        }
        

           
    }
    
}

function eachCall(el){
    const img2 = el.childNodes[1].childNodes[1].childNodes[1].src;
    const title = el.childNodes[1].childNodes[3].childNodes[1].textContent;
    const authors = el.childNodes[1].childNodes[3].childNodes[3].textContent;
    const publish = el.childNodes[1].childNodes[3].childNodes[5].textContent;
    const description = el.childNodes[1].childNodes[3].childNodes[7].textContent;

    book_img.src = img2;
    book_img.alt = title;
    author_h2.textContent = authors;
    h3.textContent = publish;
    content_h3.textContent = title;
    p.textContent = description;
    
}

coll(1000);