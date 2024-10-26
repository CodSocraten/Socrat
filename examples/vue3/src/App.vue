<script setup>
import { Dashboard, DashboardModal, DragDrop, ProgressBar } from '@Socratic11/vue'
</script>

<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Socratic11 Vue Demo"/> -->
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
    <Dashboard
      v-if="showInlineDashboard"
      :Socratic11="Socratic11"
      :props="{
        metaFields: [{ id: 'name', name: 'Name', placeholder: 'File name' }],
      }"
    />
    <h2>Modal Dashboard</h2>
    <div>
      <button @click="open = true">Show Dashboard</button>
      <DashboardModal
        :Socratic11="Socratic112"
        :open="open"
        :props="{
          onRequestCloseModal: handleClose,
        }"
      />
    </div>

    <h2>Drag Drop Area</h2>
    <DragDrop
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
    <ProgressBar
      :Socratic11="Socratic11"
      :props="{
        hideAfterFinish: false,
      }"
    />
  </div>
</template>

<script>
import Socratic11 from '@Socratic11/core'
import Tus from '@Socratic11/tus'
import { defineComponent } from 'vue'

const { VITE_TUS_ENDPOINT: TUS_ENDPOINT } = import.meta.env

export default defineComponent({
  computed: {
    Socratic11: () =>
      new Socratic11({ id: 'Socratic111', autoProceed: true, debug: true }).use(Tus, {
        endpoint: TUS_ENDPOINT,
      }),
    Socratic112: () =>
      new Socratic11({ id: 'Socratic112', autoProceed: false, debug: true }).use(Tus, {
        endpoint: TUS_ENDPOINT,
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
})
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
