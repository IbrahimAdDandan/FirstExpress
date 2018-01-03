<template>
<div>
  <div class="progress-bar">
      <div class="progress" :style="progressValue">
          <span>{{ prog }} % </span>
      </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    progval: {
      type: Number,
      default: 50
    }
  },
  data () {
    return {
      prog: this.progval
    }
  },
  computed: {
    progressValue () {
      return {
        width: this.prog + '%'
      }
    }
  }
}
</script>

<style>
.progress-bar {
    margin-left: 500px;
    margin-top: 150px;
    height: 10px;
    width: 250px;
    background-color: #f5f5f5;
    border-radius: 4px;
    overflow: hidden;
    font-size: 8px;
}
.progress {
    background-color: #4cd9ff;
    height: 100%;
    background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
    animation: progress-bar-stripes 2s linear infinite;
    background-size: 40px 40px;
    transition: width 0.6s ease;
}
@keyframes progress-bar-stripes {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 40px 0;
  }
}
</style>

