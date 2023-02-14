
let container = document.querySelector(`.albums`);


for (let i = 0; i<albums.length;i++){
    let album = albums[i];
    container.innerHTML += `<a href="album.html?i=${i}" class="col text-decoration-none text-black mt-3">
              <div class="card " style="width: 18rem;">
                <img src="${album.img}" class="card-img-top " alt="..." height="350">
                <div class="card-body">
                  <p class="card-text">${album.title}</p>      
                </div>
              </div>
          </a>`
}
