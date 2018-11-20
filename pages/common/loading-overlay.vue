<template>
  <v-layout row justify-center>
    <v-dialog v-model="value" persistent content content-class="centered-dialog">
      <v-container fill-height>
        <v-layout column justify-center align-center>
          <AtomSpinner :animation-duration="1500" :size="64" :color="progressColor" />
        </v-layout>
      </v-container>
    </v-dialog>
  </v-layout>
</template>
<script>
  import 'epic-spinners/dist/lib/epic-spinners.min.css'
  import {AtomSpinner} from 'epic-spinners/dist/lib/epic-spinners.min.js'

  export default {
    name: "Loading",
    components: {
      AtomSpinner
    },
    data: function() {
      return {}
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      progressColor: {
        type: String,
        default: '#FFFFFF'
      },
    },
  }
</script>

<style>
  .dialog.centered-dialog,
  .v-dialog.centered-dialog
  {
    box-shadow: none;
    border-radius: 6px;
    width: auto;
    color: whitesmoke;
  }
</style>
