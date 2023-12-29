const buttonShortPause = document.querySelector(".app__card-button--curto")
const buttonLongPause = document.querySelector(".app__card-button--longo")
const buttonFocus = document.querySelector(".app__card-button--foco")
const buttons = document.querySelectorAll(".app__card-button")
const musicToggle = document.querySelector("#alternar-musica")
const timerButton = document.querySelector("#start-pause")
const timerButtonContent = document.querySelector("#start-pause").children
const timerScreen = document.querySelector("#timer")
const bannerImage = document.querySelector(".app__image")
const title = document.querySelector(".app__title")
const html = document.querySelector("html")
const music = new Audio("./sons/luna-rise-part-one.mp3")
const beep = new Audio("./sons/beep.mp3")
const start = new Audio("./sons/play.wav")
const pause = new Audio("./sons/pause.mp3")
beep.volume = 0.6
start.volume = 0.6
pause.volume = 0.6
music.volume = 0.6
music.loop = true;

var seconds = 60*25;
var intervalId = null

const changeContext = (context) => {
    html.setAttribute("data-contexto", context)
    bannerImage.setAttribute("src", "./imagens/"+context+".png")
    buttons.forEach((button)=>{
        button.classList.remove("active")
    })
    let activeButton;
    switch (context) {
        case "foco":
            title.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            activeButton = document.querySelector(".app__card-button--foco")
            activeButton.classList.add("active")
            break;
        
        case "descanso-curto":
            title.innerHTML = `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            activeButton = document.querySelector(".app__card-button--curto")
            activeButton.classList.add("active")
            break;

        case "descanso-longo":
            title.innerHTML = `Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            activeButton = document.querySelector(".app__card-button--longo")
            activeButton.classList.add("active")
            break;
    
        default:
            break;
    }
}

const stopTimer = (context) => {
    clearInterval(intervalId)
    intervalId = null
    switch (context){
        case "foco":
            seconds = 60*25
            break
        case "descanso-curto":
            seconds = 60*5
            break
        case "descanso-longo":
            seconds = 60*15
            break
    }
    console.log(seconds)
}

const timer = () => {
    if(seconds <= 0){
        beep.play()
        stopTimer()
        return
    }
    seconds = seconds - 1
    showTimer()
}

const startTimer = () => {
    intervalId = setInterval(timer, 1000)
}

const showTimer = () => {
    timerScreen.innerHTML = `${Math.floor(seconds/60)}:${(seconds%60)/10<1?"0"+seconds%60:seconds%60}`
}

timerButton.addEventListener("click", () => {
    if(intervalId){
        context = document.querySelector("html").getAttribute("data-contexto")
        stopTimer(context)
        pause.play()
        timerButtonContent[1].textContent = "Começar"
        timerButtonContent[0].setAttribute("src", "/imagens/play_arrow.png")
        showTimer()
        return
    }
    startTimer()
    start.play()
    timerButtonContent[1].textContent = "Pausar"
    timerButtonContent[0].setAttribute("src", "/imagens/pause.png")
})

musicToggle.addEventListener("change", () => {
    if(music.paused){
        music.play()
    }else{
        music.pause()
    }
})

buttonShortPause.addEventListener("click", () => {
    changeContext("descanso-curto")
    if(intervalId){
        stopTimer("descanso-curto")
        pause.play()
        timerButtonContent[1].textContent = "Começar"
        timerButtonContent[0].setAttribute("src", "/imagens/play_arrow.png")
    }else{
        seconds = 60*5
    }
    showTimer()
})

buttonLongPause.addEventListener("click", () => {
    changeContext("descanso-longo")
    if(intervalId){
        stopTimer("descanso-longo")
        pause.play()
        timerButtonContent[1].textContent = "Começar"
        timerButtonContent[0].setAttribute("src", "/imagens/play_arrow.png")
    }else{
        seconds = 60*15
    }
    showTimer()
})

buttonFocus.addEventListener("click", () => {
    changeContext("foco")
    if(intervalId){
        stopTimer("foco")
        pause.play()
        timerButtonContent[1].textContent = "Começar"
        timerButtonContent[0].setAttribute("src", "/imagens/play_arrow.png")
    }else{
        seconds = 60*25
    }
    showTimer()
})

showTimer()
changeContext("foco")

