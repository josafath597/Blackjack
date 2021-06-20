(() => {
    'use strict';
    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'K', 'Q'];

    //let puntosJugador =0,
      //  puntosComputadora = 0;
    let puntosJugadores = [];

    
    // Referencias del Html
    const btnPedir   = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo   = document.querySelector('#btnNuevo'),
          marcador   = document.querySelectorAll('small'),
          divCartasJugadores     = document.querySelectorAll('.divCartas');
    /**************************************************************************/
    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        puntosJugadores = [];
        for(let i = 0; i < numJugadores; i++){
            puntosJugadores.push(0);
        }
        marcador.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');
        btnPedir.disabled = false;
        btnDetener.disabled = false;
        
    }
    
          //Esta Funcion crea un nuevo deck
    const crearDeck = () => {
        deck=[];
        for(let i = 2; i <= 10; i++ ) {
            for (let tipo of tipos) 
            {
                deck.push (i + tipo);
            }
        }
        for(let especial of especiales)
            {
                for (let tipo of tipos)
                {
                    deck.push (especial + tipo );
                }
            }
        return _.shuffle (deck);
    }

    //Esta funcion me permite pedir una carta

    const pedirCarta = () => {
         //deck.length === 0 ? alert('No hay cartas en el deck') : deck.pop;
        if(deck.length === 0){
            throw'No hay cartas en el deck';
        }
        return deck.pop();
    }

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length-1);
        return (isNaN(valor)) ?
               (valor === 'A') ? 11 : 10 
               : valor * 1;
    }
    //Turno 0=  primer jugador  y el ultimo sera la computadora
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        marcador[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno ) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    }

    const determinarGanador = () =>{

        const [puntosMinimos, puntosComputadora] = puntosJugadores;
        setTimeout(() =>{

            if(puntosComputadora === puntosMinimos){
                alert('Nadie Gana');
            }else if(puntosMinimos >21) {
                alert('¡Computadora Gana!');
            }else if(puntosComputadora > 21){
                alert('Jugador Gana');
            }else {
                alert('Computadora Gana')
            }

        }, 100);

        
    }
    // Evento de la computadora
    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora =0;
        do{
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length-1);
            crearCarta(carta, puntosJugadores.length-1);
            
        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
        determinarGanador();
    };






    //Eventos

    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();

        const puntosJugador = acumularPuntos(carta, 0);
        
        crearCarta(carta,0);
        //<img class="carta" src="assets/cartas/2C.png">

        if(  puntosJugador > 21){
            console.warn('Lo siento mucho, perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
        else if ( puntosJugador === 21) {
            console.warn('21, Genial!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    });

    btnNuevo.addEventListener('click', () => {
        inicializarJuego();
        
    });

    return {
        nuevoJuego: inicializarJuego
    }
})();