let origine = new Request("https://raw.githack.com/jacobert/Verifiche-Corso-Progettista-Front-End/main/Tests/JAVASCRIPT-Project-Work/assets/js/film.json")

fetch(origine)
.then(function(risposta){
    if (risposta.ok) {
        return risposta.json();
    }
    else {
        let gestioneKo = document.getElementById("sezionePrincipale")
        gestioneKo.innerHTML= `</br> Errore nel caricamento della risorse online, visualizza la console per le specifiche`
        gestioneKo.classList.add('ko');
        console.log(`Ho riscontrato un problema nel processo di fetch ${risposta.status}`);
        
    }
})
.then(datiFilmJSON => {
    let datiFilm = datiFilmJSON;
    costruisciSezione()
//creo gli elementi dinamici del menu e le sezioni dove si inseriranno i riquadri dei film
    function costruisciSezione() {
        let menuNav = document.querySelector('ul')
        let sezionePrincipale = document.getElementById('sezionePrincipale');

        for (let numeroSezioni of datiFilm.database) {

            let btnMenu = document.createElement('li');

            btnMenu.innerHTML=`<button>${numeroSezioni.sezione}</button>`;
            menuNav.append(btnMenu)


            let divSez = document.createElement('div');
            divSez.className = "sezioni";
            divSez.id=numeroSezioni.sezione;


            
            function clickMe(){

// gestisco il disabled dei bottoni al click
                let listaBottoni = document.getElementsByTagName('button');
                for (attributo of listaBottoni)
                    {attributo.disabled = false}

                sezionePrincipale.firstElementChild.remove();
                
                sezionePrincipale.append(divSez);
                divSez.innerHTML="";
                
                
                for (let numeroFilm of numeroSezioni.lista) {
                    let divFilm = document.createElement('div');

                    divFilm.className = "film";
                    divFilm.innerHTML= `<h3>${numeroFilm.titolo}</h3><img src="${numeroFilm.copertina}" alt="${numeroFilm.titolo}">`;
                    divSez.append(divFilm);
                    divFilm.addEventListener('click', creaPopUp);
               
                }
                btnMenu.firstElementChild.disabled = true;
            }
        btnMenu.firstElementChild.addEventListener('click', clickMe);  
        }
    }
    function creaPopUp (evento) {
// creo gli elementi del mio popup
        let contieniPopUp = document.createElement('section');
        contieniPopUp.id = "mainDiv";
        let boxLeft  = document.createElement('div');
        boxLeft.id = ('boxLeft');
        let boxRight  = document.createElement('div');
        boxRight.id = ('boxRight');

        let bloccaTutto = document.createElement('div');
        bloccaTutto.id = "disableBackground";
        
        let titoloFilm = document.createElement('h2');
        let registaFilm = document.createElement('p');
        let durata = document.createElement('p');
        let giudizio = document.createElement('p');
        let trama = document.createElement('p');
        let recensione = document.createElement ('p')
        let approvazione = document.createElement ('img')
        let chiudiScheda = document.createElement('button')
        chiudiScheda.addEventListener('click', rimuoviPopUp);

        chiudiScheda.innerHTML = "INDIETRO";
        let menuNav = document.querySelector('nav');
        menuNav.append(bloccaTutto);
        contieniPopUp.append(boxLeft,boxRight);
        boxLeft.append(titoloFilm,registaFilm, durata, approvazione,  giudizio, chiudiScheda);
        boxRight.append(trama,recensione);
        menuNav.after(contieniPopUp);

// ciclo che va a riempire gli elementi creati incrociando i dati JSON 
        for (let sezioneCorrente of datiFilm.database) {
            if (evento.currentTarget.parentElement.id === sezioneCorrente.sezione) {
                for (let filmCorrente of sezioneCorrente.lista) {
                    if (evento.currentTarget.querySelector('h3').innerHTML === filmCorrente.titolo) {
                        titoloFilm.innerHTML = filmCorrente.titolo;
                        registaFilm.innerHTML = filmCorrente.autore;
                        durata.innerHTML = filmCorrente.durata;
                        trama.innerHTML = filmCorrente.trama;
                        recensione.innerHTML = filmCorrente.recensione;
                        if (filmCorrente.approvazione === true) {
                            approvazione.src="assets/img/star.png"
                            giudizio.innerHTML = "Film approvato!"

                        }
                        else {
                            approvazione.src="assets/img/wanted.png"
                            giudizio.innerHTML = "Film bocciato!"

                        }
                    }
                }
            }
        };
   
    };

    //funzione che gestisce la rimozione del PopUp e del background di sfondo che disabilita
    function rimuoviPopUp(mainDivCorrente) {
        mainDivCorrente = document.querySelector('nav').nextElementSibling;
        mainDivCorrente.remove();
        document.getElementById('disableBackground').remove();
    };

})
.catch(errore => {
    console.log(`Ho riscontrato un errore ${errore}`)
})

