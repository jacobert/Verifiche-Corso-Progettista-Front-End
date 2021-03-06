// Dichiaro la lista che contiene i miei oggetti (corrispondenti alle ricette)

var listaRicette = [
    {
        title: 'SPUMA DI FORMAGGIO LIGHT',
        ingredienti: ['Montasio Light 100g', 'Crescenza Light 70g', 'Asiago Light 100g', 'Formaggio Spalmabile Light 30g', 'Sale q.b.', 'Pepe q.b'],
        procedimento: ['Lasciar riposare fuori dal frigo per 2 ore i formaggi', 'Tagliarli a cubetti fini', 'Inserire nel minipimer', 'Frullare per 3 minuti', 'Aggiungere sale e pepe', 'Spalmare su crostini'],
        immagine: './assets/img/4.jpg',
        difficoltà: '1'
       
    },
    {
        title: 'MEDAGLIONI DI MAIALE CON ASIAGO',
        ingredienti: ['Fettine 400g', 'Formaggio Asiago Light 300g', 'Burro 30g', 'Salvia q.b', 'Sale q.b.', 'Pepe q.b'],
        procedimento: ['Mettere il burro a rosolare in padella', 'Condire con sale e pepe la carne', 'Aggiungere la carne', 'A 10 min di cottura tagliare il formaggio a cubetti e aggiungerlo', 'Mettere la salvia e chiudere il coperchio', 'Tirare via dopo 5 minuti'],
        immagine: './assets/img/1.jpg',
        difficoltà: '2'
       
    },
    {
        title: 'CREPES AL MONTASIO',
        ingredienti: ['Uova 4', 'Formaggio Montasio Light 100g', 'Burro 30g', 'Panna 20ml', 'Sale q.b.', 'Pepe q.b'],
        procedimento: ['Mettere il burro a rosolare in padella', 'Sbattere le uova con la panna e condire con sale e pepe', 'Versare le uova', 'Dopo 3 minuti girare', 'Tirare via dopo 5 minuti', 'Aggiugere il formaggio e il burro di arachidi'],
        immagine: './assets/img/2.jpg',
        difficoltà: '3'
       
    },
    {
        title: 'RISO ALLE VERDURE E CRESCENZA',
        ingredienti: ['Riso 250g', 'Crescenza Light 70g', 'Burro 30g', 'Zucchine 2', 'Sale q.b.', 'Pepe q.b'],
        procedimento: ['Bollire il riso in pentola per 15 minuti', 'Scolare il riso', 'Tagliare a listarelle le zucchine e girarle nel burro', 'Unire il formaggio alle zucchine', 'Unire il sugo al riso', 'Impiattare'],
        immagine: './assets/img/3.jpg',
        difficoltà: '4'
       
    }
    
    
]

//creo una funzione nella quale per prima cosa si iteri una array data in ingresso, sulla base delle informazioni presenti costruirò degli elementi HTML e successivamente li aggancerò al DOM

function creaElementi(ricette){
    console.log('Chiamo le ricette al login')
    var sezione = document.getElementById('contenitore')
    
    console.log('Ispeziono',ricette)
    for (var i = 0; i < ricette.length; i++) {
        ricetta = ricette[i];
        console.log('ispeziono', ricetta)

        var mainDiv = document.createElement('div');
        mainDiv.className='col'

        var secondDiv = document.createElement('div');
        secondDiv.className='card mb-2 shadow-sm'
        
        var divTitolo = document.createElement('div');
        divTitolo.className = 'card-header'
        
        var titoloRicetta = document.createElement('h4');
        titoloRicetta.className = 'my-0 fw-normal '
        titoloRicetta.innerHTML = ricetta.title
        
        sezione.appendChild(mainDiv);
        mainDiv.appendChild(secondDiv);
        secondDiv.appendChild(divTitolo);
        divTitolo.appendChild(titoloRicetta);

        var insideDiv = document.createElement('div');
        insideDiv.className='card-body'

        var diffic = document.createElement('h4')
        diffic.className = 'card-title pricing-card-title pt-2 pb-2 text-warning';

        diffic.innerHTML = 'Difficoltà '+ricetta.difficoltà+'/5'

        var divIngredienti = document.createElement('div');
        divIngredienti.className='card mb-2 shadow-sm'

        var titoloIngredienti = document.createElement('h4');
        titoloIngredienti.innerHTML = 'Ingredienti';
        titoloIngredienti.className = 'card-title pricing-card-title mt-2';

        var primaLista = document.createElement('ul');
        primaLista.className = 'list-unstyled mt-3 mb-4';
        // un ciclo all'interno del ciclo, che mi permette di gestire un'array e renderizzarla
        for (var j = 0; j < ricetta.ingredienti.length; j++) {
            ingrediente=ricetta.ingredienti[j]
            //console.log('ispeziono', ingrediente)

            var punto =  document.createElement('li');
            punto.innerHTML = ingrediente
            primaLista.appendChild(punto)
          }   
          
          
        var divStep = document.createElement('div');
        divStep.className='card mb-2 shadow-sm'

        var titoloStep = document.createElement('h4');
        titoloStep.innerHTML = 'Procedimento';
        titoloStep.className = 'card-title pricing-card-title mt-2';

        var secondaLista = document.createElement('ul');
        secondaLista.className = 'list-unstyled mt-3 mb-4'
        for (var k = 0; k < ricetta.procedimento.length; k++) {
            step=ricetta.procedimento[k]
            //console.log('ispeziono', step)
            var punto =  document.createElement('li');
            punto.innerHTML = step
            secondaLista.appendChild(punto)
        }
        
        var immagine = document.createElement('img')
        immagine.src = ricetta.immagine
        immagine.alt= ricetta.title
        immagine.style.width= '100%'
        immagine.className= 'rounded maxAlt'

        

        secondDiv.appendChild(insideDiv);
        insideDiv.appendChild(diffic)
        insideDiv.appendChild(divIngredienti)
        insideDiv.appendChild(divStep)

        divIngredienti.appendChild(titoloIngredienti)
        divIngredienti.appendChild(primaLista)
        divStep.appendChild(titoloStep)

        divStep.appendChild(secondaLista)
        insideDiv.appendChild(immagine)
        console.log('Sono alla fine di una iterazione')
    };

}


//chiamo la funzione
creaElementi(listaRicette);



