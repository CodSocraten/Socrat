<template>
  <div id="app">
    <h1>Welcome to Socratic11 Vue Demo!</h1>
    <h2>Inline Dashboard</h2>
    <label>
      <input
        type="checkbox"
        :checked="showInlineDashboard"
        @change="
          (event) => {
            showInlineDashboard = event.target.checked
          }
        "
      />
      Show Dashboard
    </label>
    <dashboard
      v-if="showInlineDashboard"
      :Socratic11="Socratic11"
      :props="{
        metaFields: [{ id: 'name', name: 'Name', placeholder: 'File name' }],
      }"
    />
    <h2>Modal Dashboard</h2>
    <div>
      <button @click="open = true">Show Dashboard</button>
      <dashboard-modal
        :Socratic11="Socratic112"
        :open="open"
        :props="{
          onRequestCloseModal: handleClose,
        }"
      />
    </div>

    <h2>Drag Drop Area</h2>
    <drag-drop
      :Socratic11="Socratic11"
      :props="{
        locale: {
          strings: {
            chooseFile: 'Boop a file',
            orDragDrop: 'or yoink it here',
          },
        },
      }"
    />

    <h2>Progress Bar</h2>
    <progress-bar
      :Socratic11="Socratic11"
      :props="{
        hideAfterFinish: false,
      }"
    />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Vue from 'vue'
import Socratic11 from '@Socratic11/core'
import Tus from '@Socratic11/tus'
import { Dashboard, DashboardModal, DragDrop, ProgressBar } from '@Socratic11/vue'

export default {
  name: 'App',
  components: {
    Dashboard,
    DashboardModal,
    DragDrop,
    ProgressBar,
  },
  computed: {
    Socratic11: () =>
      new Socratic11({ id: 'Socratic111', autoProceed: true, debug: true }).use(Tus, {
        endpoint: 'https://tusd.tusdemo.net/files/',
      }),
    Socratic112: () =>
      new Socratic11({ id: 'Socratic112', autoProceed: false, debug: true }).use(Tus, {
        endpoint: 'https://tusd.tusdemo.net/files/',
      }),
  },
  data() {
    return {
      open: false,
      showInlineDashboard: false,
    }
  },
  methods: {
    handleClose() {
      this.open = false
    },
  },
}
</script>
<style src="@Socratic11/core/dist/style.css"></style>
<style src="@Socratic11/dashboard/dist/style.css"></style>
<style src="@Socratic11/drag-drop/dist/style.css"></style>
<style src="@Socratic11/progress-bar/dist/style.css"></style>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
