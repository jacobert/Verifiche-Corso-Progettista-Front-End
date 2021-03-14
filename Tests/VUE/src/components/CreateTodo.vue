<template>
  <div>

    <!--Primo bottone per l'inserimento di nuove task, al click (direttiva v-on) richiama la funzione openForm -->
    <div class="text-center mt-5">
      <button class="btn btn-info btn-primary  btn-lg" 
       v-on:click="openForm"
       v-show="!isCreating"
       v-b-tooltip.hover 
       title="Attraverso il bottone sarà possibile inserire nuovi promemoria">
        Aggiungi
      </button>

      <!--Segue un form in cui, attraverso la direttiva v-model si modificano i valori di data(). Al submit del form questi vengono spediti al server -->
      <b-form inline v-show="isCreating" @submit="sendForm">
        <b-form-input
          id="inline-form-input-name"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="Data"
          v-model="titleText"
          type="text"
          ref="title"
          defaultValue=""
        ></b-form-input>

        <b-form-input
          id="inline-form-input-progetto"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="Progetto"
          v-model="projectText"
          type="text"
          ref="project"
          defaultValue=""
        ></b-form-input>

        <b-button variant="primary" type="submit" class="mr-2">Salva</b-button>
        <b-button variant="primary" v-on:click="closeForm">Chiudi</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      //setto i valori iniziali, che modificherò attraverso l'interazione nel form (inserimento dati) e con il click dei bottoni del componente
      titleText: "",
      projectText: "",
      isCreating: false
    };
  },
  methods: {
    //Toast che mi verifica il buon esito dell'interazione con il server, viene chiamato dalla funzione sendForm
    makeToast(toaster) {
      this.$bvToast.toast(`Inserimento andato a buon fine, il server ha risposto: ${toaster}`, {
        title: "Messaggio dal server",
        variant:"success",
        solid: true
      });
    },

    //a seconda che prema il pulsante di apertura (Aggiungi) o di chiusura (Salva) viene mostrato o meno il campo di inserimento
    openForm() {
      this.isCreating = true;
    },
    closeForm() {
      this.isCreating = false;
    },
    //funzione sendForm, mi verifica prima se i campi siano completi (cioè l'array abbia una lunghezza maggiore di 0), poi assegno i value raccolti nel form e li passo con una chiamata post al server
    sendForm() {
      if (this.titleText.length > 0 && this.projectText.length > 0) {
        const sendData = {
          titleText: this.titleText,
          projectText: this.projectText,
          done: "false"
        };
        axios
          // chiamata post per invio ed inserimento dei dati nel database
          .post(
            "http://www.onaekoo.com/vue/api/?request=2&user=" + this.$user,
            sendData,
            {
              headers: {
                "Content-type": "application/x-www-form-urlencoded"
              }
            }
          )
          .then(response => {
            console.log(response.data);
            this.makeToast(response.data);

            //refresh della pagina per vedere i dati aggiornati
            window.setTimeout(function() {
              location.reload();
            }, 1000);
          });
        //passo attraverso $emit l'oggetto create-todo a App.Vue
        const title = this.titleText;
        const project = this.projectText;
        this.$emit("create-todo", {
          title,
          project,
          done: false
        });

        //al termine di tutto, resetto i campi al valore iniziale
        this.titleText = "";
        this.projectText = "";
        this.isCreating = false;
      }
    },
    // la funzione di submit del form
    submit: function() {
      this.form.submit();
    }
  }
};
</script>
