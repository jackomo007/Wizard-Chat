<template>
  <div class="fullscreen bg-lost text-white text-center q-pa-md flex flex-center">
    <div>
      <div class="text-h2" style="opacity:.4">
        It seems that you are lost... Go back on your footsteps.
      </div>

      <q-btn
        v-go-back.single
        class="q-mt-xl"
        color="purple"
        text-color="yellow"
        unelevated
        label="Activate Trinus"
        no-caps
      />
    </div>
  </div>
</template>

<script >
export default {
  name: 'Error404'
}
</script>

<style lang="stylus">
  .bg-lost{
    background-image: url('/lost.jpg');
    background-repeat: round;
  }
</style>
