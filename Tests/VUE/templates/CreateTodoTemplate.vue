<template>
  <div>
    <div class="text-center mt-5">
      <button class="btn btn-dark" v-on:click="openForm" v-show="!isCreating">
        Aggiungi
      </button>

      <b-form inline v-show="isCreating">
        <b-form-input
          id="inline-form-input-name"
          class="mb-2 mr-sm-2 mb-sm-0" 
          placeholder="Titolo"
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

        <b-button variant="primary" class="mr-2" v-on:click="sendForm"
          >Salva</b-button
        >
        <b-button variant="primary" v-on:click="closeForm">Chiudi</b-button>
      </b-form>
    </div>
  </div>
</template>

