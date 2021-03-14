<template>
  <div class="card mb-2 p-2">
    <div class="content" v-show="!isEditing">
      <div class="">
        <!--Campo principale del mio elemento todo della lista, va a renderizzare le informazioni salvate dagli altri componenti-->
        <div class="float-left">
          <strong>Data:</strong>
          {{ todo.title }}<br />
          <span>
            <strong>Impegno:</strong> 
            {{ todo.project }}
          </span>
        </div>
      </div>
      
      <div class="float-right">
        <!--Bottone che a seconda della condizione impostata viene visualizzato, presenta un tooltip come promemoria, al click richiama la funzione openTodo, scomparendo e facendo visualizzare il bottone successivo-->
        <b-button
          size="sm"
          variant="success"
          class="mr-2"
          v-show="!isEditing && todo.done"
          v-on:click="openTodo(todo)"
          v-b-tooltip.hover 
          title="Task completata!"
          >Svolto</b-button
        >
        <!--Bottone che a seconda della condizione impostata viene visualizzato, presenta un tooltip come promemoria, al click richiama la funzione completeTodo, scomparendo e facendo visualizzare il bottone precedente-->
        <b-button
          size="sm"
          variant="primary"
          class="mr-2"
          v-show="!isEditing && !todo.done"
          v-on:click="completeTodo(todo)"
          v-b-tooltip.hover 
          title="Clicca se hai completato la task"
          >In corso</b-button
        >

        <!--Bottoni che permetto la modifica e la cancellazione dei dati del todo iesimo attraverso la direttiva (v-on:click) che richiama i metodi showForm e delete(todo)-->
        <b-button
          size="sm"
          variant="warning "
          class="mr-2"
          v-on:click="showForm"
          v-b-tooltip.hover 
          title="Clicca per modificare la task"
          ><b-icon-pencil-fill></b-icon-pencil-fill
        ></b-button>

        <b-button
          size="sm"
          variant="danger"
          class="mr-2"
          v-on:click="deleteTodo(todo)"
          v-b-tooltip.hover 
          title="Cancella la task dalla lista"
          ><b-icon-x-circle></b-icon-x-circle
        ></b-button>
      </div>
    </div>

    <!--Form che viene visualizzato interagendo con il penultimo bottone precedente, permette la modifica dei dati dell'elemento todo iesimo -->
    <b-form inline v-show="isEditing" @submit="hideForm">
      <b-form-input
        id="inline-form-input-name"
        class="mb-2 mr-sm-2 mb-sm-0"
        v-model="todo.title"
      ></b-form-input>

      <b-form-input
        id="inline-form-input-progetto"
        class="mb-2 mr-sm-2 mb-sm-0"
        v-model="todo.project"
      ></b-form-input>

      <b-form-input
        id="inline-form-input-id"
        class="mb-2 mr-sm-2 mb-sm-0"
        v-model="todo.id"
        disabled
      ></b-form-input>
      <b-button
        variant="primary"
        type="submit"
        class="mr-2"
        v-on:click="hideForm"
        >Aggiorna</b-button
      >
    </b-form>
  </div>
</template>

<script>

  import axios from "axios";
  export default {
    props: ["todo"],
    data() {
      return {
        // la condizione di default è settata a false, perciò il form dichiarato nel componente non 'parte' renderizzato
        isEditing: false
      };
    },

    methods: {
      //metodo che avvisa qualora un record sia stato cancellato
      makeToast() {
        this.$bvToast.toast(`Cancellazione andata a buon fine`, {
          variant:"warning",
          solid: true,
        })},
      //metodo richiamato da un bottone nel template, che permette di visualizzare il form
      showForm() {
        this.isEditing = true;
      },
      /*metodo richiamato da un bottone nel form, che corrisponde al submit, registra i valori del todo iesimo aggiornati in una costante sendData, 
      che viene poi passata attraverso una chiamata post al server tramite axios*/
      hideForm() {
        const sendData = {
          title: this.todo.title,
          project: this.todo.project,
          id: this.todo.id
        };
        axios
          .post("http://www.onaekoo.com/vue/api/?request=4", sendData, {
            headers: {
              "Content-type": "application/x-www-form-urlencoded"
            }
          })
          .then(response => {
            console.log(response.data);
          });

        this.isEditing = false;
      },
      //passo attraverso $emit le seguenti funzioni a todoList
      deleteTodo(todo) {
        this.$emit("delete-todo", todo);
        this.makeToast()
      },
      completeTodo(todo) {
        this.$emit("complete-todo", todo);
      },
      openTodo(todo) {
        console.log(todo.id);
        this.$emit("open-todo", todo);
      }
    }
  };
</script>
