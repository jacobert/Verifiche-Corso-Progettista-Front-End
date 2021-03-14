<template>
  <div id="app" class='m-5'>
    
    <!--Creo un primo div contentente un titolo, che mi accederà alla variabile globale $user, dando un feedback della persona di cui l'applicazione gestirà i dati-->
    <div>
      <h1 class = 'page-header text-center text-primary p-4'>To-do list di {{this.$user}}</h1>
    </div>

    <CreateTodo v-on:create-todo="addTodo" />
    <TodoList v-bind:todos="todos" />

  </div>
</template>


<script>

  //importo una libreria che mi permetta di effettuare e gestire le chiamate asincrone a API di backend
  import axios from "axios";

  //importo i componenti che ho creato, rendendoli disponibili nella parte components e utilizzandoli nella parte di template
  import TodoList from "./components/TodoList.vue";
  import CreateTodo from "./components/CreateTodo.vue";



  export default {
    name: "app",

    components: {
    TodoList,
    CreateTodo
    },
    

    data() {
      return {
        //definisco in data le mie due array, inizialmente vuote, che sarà possibile popolare nell'utilizzo dell'applicazione
        todos: [],
        errors: []
      };
    },
    methods: {
      //il metodo aggiungerà alla mia array un elemento generato dal componente Create-todo  
      addTodo(todo) {
        this.todos.push(todo);
      }
    },
    
    /*attraverso il metodo created posso andare a effettuare una chiamata GET all'indirizzo API specificando l'utente di cui voglio gestire i dati
    popolando l'array todos con i dati provenienti dalla response*/
    created() {
      axios
        .get("http://www.onaekoo.com/vue/api/?request=1&user=" + this.$user)
        .then(response => {
          this.todos = response.data;
          //console.log(response.data); posso verificare il contenuto dell'array
        })

        // funzione di catch per verificare se sono stati incontrati degli errori
        .catch(e => {
          this.errori.push(e); 
        });
    }
  };
</script>
