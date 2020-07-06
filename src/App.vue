<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    methods: {
      ...mapActions('store', ['handleInvocation'])
    },
    mounted() {
      this.handleInvocation()
    }
  }
</script>
