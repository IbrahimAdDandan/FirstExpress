<template>
  <div id="app">
      <!--<progressbar progval= 80></progressbar>-->
      <br/><br/>
      <datepicker></datepicker>
      <!--<progress></progress>-->
  </div>
</template>

<script>
import Datepicker from '@/components/Datepicker'
// import Progressbar from '@/components/ProgressBar'
export default {
  name: 'app',
  components: {
    Datepicker
    // Progressbar
  },
  data () {
    return {
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  height: 500px;
}

body {
    font-family: 'Helvetica Neue Light', Helvetica, sans-serif;
}
</style>
