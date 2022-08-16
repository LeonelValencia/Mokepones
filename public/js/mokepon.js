const sectionSeleccionarAtaque=document.getElementById('seleccionar-ataque')
const sectionReiniciar=document.getElementById('reiniciar')
const botonMascotaJugador=document.getElementById('boton-mascota')
const botonReiniciar=document.getElementById('boton-reiniciar')

const sectionSeleccionarMascota=document.getElementById('seleccionar-mascota')
const spanMascotaJugador=document.getElementById('mascota-jugador')

const spanMascotaEnemigo=document.getElementById('mascota-enemigo')

const spanVidasJugador=document.getElementById('vidas-jugador')
const spanVidasEnemigo=document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const sectionAtaqueDelJugador = document.getElementById('ataque-del-jugador')
const sectionAtaqueDelEnemigo = document.getElementById('ataque-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedor-tarjetas')
const contenedorBotonesAtaques = document.getElementById('contenedor-botones-ataques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let jugadorId = null
let enemigoId = null
let mokepones = []
let mokeponesEnemigo = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let inputLangostelvis
let inputPydos
let inputTucapalma
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego
let botonAgua
let botonTierra
let botones =[]
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador=3
let vidasEnemigo=3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './assets/mokemap.webp'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 350

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800
mapa.width = anchoDelMapa 
mapa.height = alturaQueBuscamos

class Mokepon{
    constructor(nombre, foto, vida, tipo, fotoMapa, id=null){
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.tipo = tipo
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.webp', 5, 'agua','./assets/hipodoge.webp')

let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.webp', 5, 'tierra','./assets/capipepo.webp')

let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.webp', 5, 'fuego','./assets/ratigueya.webp')

let langostelvis = new Mokepon('Langostelvis', './assets/mokepons_mokepon_langostelvis_attack.webp', 5, 'aguaFuego','./assets/langostelvis.png')

let pydos = new Mokepon('Pydos', './assets/mokepons_mokepon_pydos_attack.webp', 5, 'tierraFuego','./assets/pydos.png')

let tucapalma = new Mokepon('Tucapalma', './assets/mokepons_mokepon_tucapalma_attack.webp', 5, 'aguaTierra','./assets/tucapalma.png')

const HIPODOGE_ATAQUES = [
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌱', id: 'boton-tierra'}
]
hipodoge.ataques.push(...HIPODOGE_ATAQUES)

const CAPIPEPO_ATAQUES = [
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
]
capipepo.ataques.push(...CAPIPEPO_ATAQUES)

const RATIGUEYA_ATAQUES = [
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🌱', id: 'boton-tierra'}
]
ratigueya.ataques.push(...RATIGUEYA_ATAQUES)

const LANGOSTELVIS_ATAQUES = [
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🌱', id: 'boton-tierra'}
]
langostelvis.ataques.push(...LANGOSTELVIS_ATAQUES)

const PYDOS_ATAQUES = [
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '💧', id: 'boton-agua'}
]
pydos.ataques.push(...PYDOS_ATAQUES)

const TUCAPALMA_ATAQUES = [
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🔥', id: 'boton-fuego'}
]
tucapalma.ataques.push(...TUCAPALMA_ATAQUES)

mokepones.push(hipodoge,capipepo,ratigueya,langostelvis,pydos,tucapalma)

function iniciarJuego(){
    sectionSeleccionarAtaque.style.display = 'none' 
    sectionVerMapa.style.display = 'none'   
    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id="${mokepon.nombre}">
        <label class="tarjetMokepon" for="${mokepon.nombre}">
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt="${mokepon.nombre}">
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones

        inputHipodoge=document.getElementById('Hipodoge')
        inputCapipepo=document.getElementById('Capipepo')
        inputRatigueya=document.getElementById('Ratigueya')
        inputLangostelvis = document.getElementById('Langostelvis')
        inputPydos = document.getElementById('Pydos')
        inputTucapalma = document.getElementById('Tucapalma')
    })
    sectionReiniciar.style.display = 'none'

    botonMascotaJugador.addEventListener('click',seleccionarMascotaJugador)
    botonReiniciar.addEventListener('click', reiniciarJuego)

    unirseAlJuego()
}

function unirseAlJuego() {
    fetch("http://192.168.0.15:8080/unirse")
        .then(function (res){
            if (res.ok) {
                res.text()
                    .then(function (respuesta){
                        console.log(respuesta);
                        jugadorId= respuesta
                    })
            }
        })
}

function seleccionarMascotaJugador(){
    if(inputHipodoge.checked){
        spanMascotaJugador.innerHTML= inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    }
    else if(inputCapipepo.checked){
        spanMascotaJugador.innerHTML= inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    }else if(inputRatigueya.checked){
        spanMascotaJugador.innerHTML= inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    }else if(inputLangostelvis.checked){
        spanMascotaJugador.innerHTML= inputLangostelvis.id
        mascotaJugador = inputLangostelvis.id
    }else if(inputPydos.checked){
        spanMascotaJugador.innerHTML= inputPydos.id
        mascotaJugador = inputPydos.id
    }else if(inputTucapalma.checked){
        spanMascotaJugador.innerHTML= inputTucapalma.id
        mascotaJugador = inputTucapalma.id
    }else{
        alert('Selecciona una mascota')
        return
    }
    sectionSeleccionarMascota.style.display = 'none'  

    seleccionarMokepon(mascotaJugador)
    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
}

function seleccionarMokepon(mascotaJugador) {
    fetch(`http://192.168.0.15:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function extraerAtaques(mascotaJugador) {
    let ataques
    for(let i = 0; i<mokepones.length; i++){
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque)=> {
        ataquesMokepon = `
        <button class="boton-de-ataque BAtaque" id="${ataque.id}">${ataque.nombre}</button
        `

        contenedorBotonesAtaques.innerHTML += ataquesMokepon
    })

    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')
    botones = document.querySelectorAll('.BAtaque')
}

function secuenciaAtaque() {
    botones.forEach((boton)=> {
        boton.addEventListener('click', (e)=>{
            if (e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            } else if(e.target.textContent === '💧'){
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            } else{
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            }
            if (ataqueJugador.length === 5) {
                enviarAtaques()
            }
        })
    })
}

function enviarAtaques() {
    fetch(`http://192.168.0.15:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
   fetch(`http://192.168.0.15:8080/mokepon/${enemigoId}/ataques`) 
    .then(function(res){
        if(res.ok){
            res.json()
                .then(function({ataques}){
                    if (ataques.length === 5) {
                        ataqueEnemigo = ataques
                        combate()
                    }
                })
        }
    })
}

function seleccionarMascotaEnemigo(enemigo){
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo(){
    let ataqueAleatorio=aleatorio(0,ataquesMokeponEnemigo.length-1)
    let ataque = ataquesMokeponEnemigo[ataqueAleatorio].nombre
    ataquesMokeponEnemigo.splice(ataqueAleatorio, 1)
    if (ataque == "🔥") {
        ataqueEnemigo.push("FUEGO");
    } else if (ataque == "💧") {
        ataqueEnemigo.push("AGUA");
    } else {
        ataqueEnemigo.push("TIERRA");
    }

    iniciarPelea()
}

function iniciarPelea(){
    if (ataqueJugador.length === 5) {
        combate()
    }
}

function indexAmbosOponentes(jugador,enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
    clearInterval(intervalo)

    for (let i = 0; i < ataqueJugador.length; i++) {
        if (ataqueJugador[i] === ataqueEnemigo[i]) {
            indexAmbosOponentes(i,i)
            crearMensaje("Empate 😐")
        }else if (ataqueJugador[i] =='FUEGO' && ataqueEnemigo[i] == 'TIERRA') {
            indexAmbosOponentes(i,i)
            crearMensaje("GANASTE!!! 🎉")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }else if (ataqueJugador[i] =='AGUA' && ataqueEnemigo[i] =='FUEGO') {
            indexAmbosOponentes(i,i)
            crearMensaje("GANASTE!!! 🎉")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }else if (ataqueJugador[i] =='TIERRA' && ataqueEnemigo[i] =='AGUA') {
            indexAmbosOponentes(i,i)
            crearMensaje("GANASTE!!! 🎉")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }else{
            indexAmbosOponentes(i,i)
            crearMensaje("PERDISTE 😢")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }
    revisarVidas()
}
function revisarVidas() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("Esto fue un empate!!😐")
    }else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("FELICITACIONES!! Ganaste😉")
    }else {
        crearMensajeFinal("Lo siento!! Perdiste😢")
    }
}
function crearMensaje(resultado){
    let nuevoAtaqueDelJugador=document.createElement('p')
    let nuevoAtaqueDelEnemigo=document.createElement('p')

    sectionMensajes.innerHTML=resultado
    nuevoAtaqueDelJugador.innerHTML= indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML= indexAtaqueEnemigo

    sectionAtaqueDelJugador.appendChild(nuevoAtaqueDelJugador)
    sectionAtaqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal){    
    sectionMensajes.innerHTML= resultadoFinal
    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min,max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

function pintarCanvas() {
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    lienzo.clearRect(0,0,mapa.width,mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)
    mokeponesEnemigo.forEach(function(mokepon){
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })
}

function enviarPosicion(x,y) {
    fetch(`http://192.168.0.15:8080/mokepon/${jugadorId}/posicion`,{
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
        .then(function (res){
            if (res.ok) {
                res.json()
                    .then(function ({enemigos}){
                        mokeponesEnemigo = enemigos.map(function(enemigo){
                            let mokeponEnemigo = null
                            const mokeponNombre = enemigo.mokepon.nombre || ""
                            if (mokeponNombre === "Hipodoge") {
                                mokeponEnemigo = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.webp', 5, 'agua','./assets/hipodoge.webp', enemigo.id)
                            }else if (mokeponNombre === "Capipepo") {
                                mokeponEnemigo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.webp', 5, 'tierra','./assets/capipepo.webp', enemigo.id)
                            }else if (mokeponNombre === "Ratigueya") {
                                mokeponEnemigo = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.webp', 5, 'fuego','./assets/ratigueya.webp', enemigo.id)
                            }else if (mokeponNombre === "Langostelvis") {
                                mokeponEnemigo = new Mokepon('Langostelvis', './assets/mokepons_mokepon_langostelvis_attack.webp', 5, 'aguaFuego','./assets/langostelvis.png', enemigo.id)   
                            } else if (mokeponNombre === "Pydos") {
                                mokeponEnemigo = new Mokepon('Pydos', './assets/mokepons_mokepon_pydos_attack.webp', 5, 'tierraFuego','./assets/pydos.png', enemigo.id)
                            }else if (mokeponNombre === "Tucapalma"){
                                mokeponEnemigo = new Mokepon('Tucapalma', './assets/mokepons_mokepon_tucapalma_attack.webp', 5, 'aguaTierra','./assets/tucapalma.png', enemigo.id)
                            }
                            mokeponEnemigo.x = enemigo.x || 0
                            mokeponEnemigo.y = enemigo.y || 0
                            
                            return mokeponEnemigo
                        })
                    })
            }
        })
}

function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
}
function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5
}
function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
}
function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5
}
function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break
        default:
            break
    }
}

function iniciarMapa() {
    mascotaJugadorObjeto = obtenerObjetoMascota()
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota() {
    for(let i = 0; i<mokepones.length; i++){
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        }
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y +10
    const abajoEnemigo = enemigo.y + enemigo.alto -10
    const derechaEnemigo = enemigo.x + enemigo.ancho -10
    const izquierdaEnemigo = enemigo.x +10

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x

    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
        ) {
        return
    }
    detenerMovimiento()
    clearInterval(intervalo)
    console.log("se detecto una colision");

    enemigoId = enemigo.id
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
}
window.addEventListener('load',iniciarJuego)