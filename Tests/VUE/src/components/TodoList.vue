<template>
  <div>
    <div class="text-center mb-4 mt-4">

      <!--un bottone che riporta un numero indicante il numero di to-do completati, ricavato da un metodo di filter sull'array, condizione soddisfatta nel caso presentino todo chiave=true -->
      <b-button variant="success" class="mr-2">
        Task svolte: 
        <b-badge variant="light"
          >{{
            todos.filter(todo => {
              return todo.done === true;
            }).length
          }}
          <span class="sr-only"></span
        ></b-badge>
      </b-button>

      <!--un bottone che riporta un numero indicante il numero di to-do da svolgere, ricavato da un metodo di filter sull'array, condizione soddisfatta nel caso presentino in todo chiave===false -->

      <b-button variant="secondary">
        Task da fare:
        <b-badge variant="light"
          >{{
            todos.filter(todo => {
              return todo.done === false;
            }).length
          }}
          <span class="sr-only"></span
        ></b-badge>
      </b-button>
    </div>

      <!--Utilizzo il componente nel render: si renderizzeranno n elementi per ogni elemento dell'array todos attraverso un ciclo (direttiva v-for), 
      ad ognuno si assocerà l'iesimo valore della array per todo e per index (direttiva v-bind), e funzioni dichiarate successivamente-->

      <TodoItem 
        v-for="(todo, index) in todos"
        v-bind:todo="todo"
        v-bind:key="index"
        v-on:complete-todo="completeTodo"
        v-on:delete-todo="deleteTodo"
        v-on:open-todo="openTodo"
      />


  </div>
  
</template>

<script>

  // importo i componenti che necessito di utilizzare
  import axios from "axios";
  import TodoItem from "./TodoItem";
  
  export default {
    props: ["todos"],
    components: {
      TodoItem
    },
    data() {
      return {
        show: false
      };
    },
    methods: {
      
      // il seguente metodo mi va ad eliminare un elemento todo dalla mia array, prima individuando l'indice iesimo dell'elemento, poi, attraverso lo splice, viene eliminato un singolo (quindi il mio todo) dalla array
      
      deleteTodo(todo) {
        const todoIndex = this.todos.indexOf(todo);
        this.todos.splice(todoIndex, 1);

        axios
          //in questa chiamata interagisco con il backend per la cancellazione del record

          .post("http://www.onaekoo.com/vue/api/?request=5", todo, {
            headers: {
              "Content-type": "application/x-www-form-urlencoded"
            }
          })
          //.then(r => console.log("r: ", JSON.stringify(r, null, 2)));
      },

      //il seguente metodo imposta la chiave done del mio todo iesimo della array todos a true, comportando una serie di visualizzazioni nel rendering

      completeTodo(todo) {
        const todoIndex = this.todos.indexOf(todo);
        this.todos[todoIndex].done = true;
        axios
          //in questa chiamata interagisco con il backend per l'aggiornamento della chiave done del record
          .post("http://www.onaekoo.com/vue/api/?request=3", todo, {
            headers: {
              "Content-type": "application/x-www-form-urlencoded"
            }
          })
          //.then(r => console.log("r: ", JSON.stringify(r, null, 2)));
      },
      
      //il seguente metodo imposta la chiave done del mio todo iesimo della array todos a true, comportando una serie di visualizzazioni nel rendering
      openTodo(todo) {
        const todoIndex = this.todos.indexOf(todo);
        this.todos[todoIndex].done = false;
        axios

          //in questa chiamata interagisco con il backend per l'aggiornamento della chiave done del record
          .post("http://www.onaekoo.com/vue/api/?request=3", todo, {
            headers: {
              "Content-type": "application/x-www-form-urlencoded"
            }
          })
          //.then(r => console.log("r: ", JSON.stringify(r, null, 2)));
      }
    }
  };
</script>