let API = "http://localhost:8001/books"

let inpName = document.querySelector("#inpName");
let inpAuthor = document.querySelector("#inpAuthor");
let inpImg = document.querySelector("#inpImg");
let inpPrice = document.querySelector("#inpPrice");
let btnAdd = document.querySelector("#btnAdd");
let sectionBooks = document.querySelector("#sectionBooks");
let collapseThree = document.querySelector("#bcollapseThree");
btnAdd.addEventListener("click", () => {
    if(
        !inpName.value.trim() || 
        !inpAuthor.value.trim() || 
        !inpImg.value.trim() || 
        !inpPrice.value.trim()
    ){
        alert("Заполните все поля");
        return;
    }
    let newBook= {
        bookName: inpName.value,
        bookAuthor: inpAuthor.value,
        bookImg: inpImg.value,
        bookPrice: inpPrice.value
    }
    createBook(newBook)
    readBooks();
})
// !==================CREATE===============
function createBook (book){
    fetch(API, {
        method: "POST",
        headers:{
            "Content-type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(book),
    });
    inpName.value = "";
    inpAuthor.value = "";
    inpImg.value = "";
    inpPrice.value = "";
    btnOpenForm.classList.toggle("show");
}
// !=============READ=============
async function readBooks(){
    const res = await fetch(API);
    const data = await res.json();
    sectionBooks.innerHTML = "";
    console.log(data);
    data.forEach((elem) => {
        console.log(elem.bookAuthor)
        sectionBooks.innerHTML += `
        <div class="card m-4 cardBook" style="width:18rem">
        <img style= "height:280px" src="${elem.bookImg}" alt="${elem.bookName}">
        <div class="card-body">
            <h5 class="card-title">${elem.bookName}</h5>
            <p class="card-text">${elem.bookAuthor}</p>
            <span>${elem.bookPrice}</span>
        </div>
    </div>
    `    
    });
}
readBooks()