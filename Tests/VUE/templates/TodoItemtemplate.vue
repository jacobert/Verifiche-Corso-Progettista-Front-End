<script type="text/x-template" id="todoitemtemplate">
  <div class="card mb-2 p-2">
    <!-- // Todo shown when we are not in editing mode. -->
    <div class="content" v-show="!isEditing">
      <div class=''>
        <div class="float-left">
         <strong>ID:</strong> {{ todo.id }} <strong>Titolo:</strong> {{ todo.title }}<br />
          <strong>Progetto:</strong> {{ todo.project }} {{todo.done}}
        </div>
      </div>

      <div class="float-right">
        <b-button
          size="sm"
          variant="success"
          class="mr-2"
          v-show="!isEditing && todo.done"
          v-on:click="openTodo(todo)"
          >Completato</b-button
        >
        <b-button
          size="sm"
          variant="primary"
          class="mr-2"
          v-show="!isEditing && !todo.done"
          v-on:click="completeTodo(todo)"
          >Da fare</b-button
        >
        <b-button
          size="sm"
          variant="warning "
          class="mr-2"
          v-on:click="showForm"
          ><b-icon-pencil-fill></b-icon-pencil-fill
        ></b-button>
        <b-button
          size="sm"
          variant="danger"
          class="mr-2"
          v-on:click="deleteTodo(todo)"
          ><b-icon-x-circle></b-icon-x-circle
        ></b-button>
      </div>
    </div>
    <!-- // form is visible when we are in editing mode -->
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
      <b-button variant="primary" type="submit" class="mr-2" v-on:click="hideForm"
        >Aggiorna</b-button
      >
    </b-form>
  </div>
</script>