function setupAudio() {
    // Найди коллекцию с треками
    let trackNodes = document.querySelectorAll(`.track`); 
    console.log(trackNodes)
    for (let i = 0; i < trackNodes.length; i++) { 
        // Один элемент
        let node = trackNodes[i];   
        // Тег аудио внутри этого элемента
        let pause = node.querySelector('.pause');
        let play = node.querySelector('.play');
        let timeNode = node.querySelector('.time');
        let audio = node.querySelector(`.audio`); 
        let bar = node.querySelector('.progress-bar')
        let isPlaying = false;
        node.addEventListener(`click`, function () {
            // Если трек сейчас играет...
            if (isPlaying) {
                isPlaying = false;
                // Поставить на паузу
                audio.pause();
                pause.classList.add('d-none');
                play.classList.remove('d-none');
            // Если трек сейчас не играет...
            } else {
                isPlaying = true;
                // Включить проигрывание
                audio.play();
                pause.classList.remove('d-none');
                play.classList.add('d-none');
                updateProgress()

            }
    function updateProgress() {
        let time = getTime(audio.currentTime)
        let pro = prozentTime(audio.currentTime)
        if(timeNode.innerHTML != time){
            timeNode.innerHTML = time;
        }
        
        bar.style.width = pro + '%';

        if (isPlaying) {
                requestAnimationFrame(updateProgress);


        }
    function prozentTime(time){
        currentTime = Math.floor(time);
        all = audio.duration;
        proz = currentTime / all
        return proz
    }
}        
}); 
    }
}
function timenode(){
    let i = 0;
    function run() {
        node.innerHTML = i;
        i++;
        requestAnimationFrame(run);
    }
    run();
    }

function getTime(time){
    currentTime = Math.floor(time);
    minutes = Math.floor(currentTime / 60);
    seconds = Math.floor(currentTime % 60);
    if (minutes < 10){
        minutes = '0' + minutes;
    };
    if (seconds < 10){
        seconds = '0' + seconds;
    };
    return `${minutes}:${seconds}`

}




function getAlbum(){
    let container = document.querySelector(`.album`);

    let search = new URLSearchParams(window.location.search);

    let i = search.get(`i`);
    let album = albums[i];
    if (!album){
        container.innerHTML = `<p class= "fs-5 text-center"> Не играйся с url</p>`
        setTimeout(() => {
            window.location.pathname = 'index.html'
        },5000);
        
    }else{
        container.innerHTML = `<div class="card mb-3">
            <div class="row ">
            <div class="col-4">
            <img src="${album.img}" class="card-img-top" alt="">
            </div>
            <div class="col-8">
            <h4>Лилипуты</h4>
            <p>${album.description}</p>
            <p><small>Было выпущено в свет в ${album.year} году</small></p>
            </div>
            </div>
            </div>`
        renderPlay(album)
        setupAudio()
    }
}








function renderPlay(album){
    let playlist = document.querySelector(`.playlist`);

    let tracc = album.tracs;

    for (let i = 0; i<tracc.length;i++){
        let trac = tracc[i]
        playlist.innerHTML += `<li class="list-group-item d-flex track align-items-center">
                
                <audio class="audio" src=${trac.src}></audio>
                <button class="border-none button_music play me-3"><img src="assets/icon1.png" alt="" width="30px" ></button>
                <button class="border-none button_music pause d-none me-3"><img src="assets/icon2.png" alt="" width="30px" ></button>
                <div class="">
                <div>${trac.name}</div>
                <div class="text-secondary">${trac.author}</div>
            </div>
                <div class="w-100 me-3 ms-3">
                    <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: 0%"></div>
                    </div>
                </div>
                <div class="ms-auto time">${trac.time}</div>
            </li>`
    }
}
getAlbum()
