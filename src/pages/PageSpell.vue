<template>
  <q-page class="flex ">
     <q-card class="full-width dark">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="login" label="Login" />
          <q-tab name="register" label="Register" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="login">
            <spelling-auturum :tab="tab"></spelling-auturum>
          </q-tab-panel>

          <q-tab-panel name="register">
            <spelling-auturum :tab="tab"></spelling-auturum>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
  </q-page>
</template>

<script>
  export default {
  data () {
    return {
      tab: 'login'
    }
  },
  components: {
    'spelling-auturum' : require('components/SpellumAuturum.vue').default
  }
}
</script>

<style lang="stylus">
.dark {
  background-color:black;
  background-image:
  radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 40px),
  radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 30px),
  radial-gradient(white, rgba(255,255,255,.1) 2px, transparent 40px),
  radial-gradient(rgba(255,255,255,.4), rgba(255,255,255,.1) 2px, transparent 30px);
  background-size: 550px 550px, 350px 350px, 250px 250px, 150px 150px;
  background-position: 0 0, 40px 60px, 130px 270px, 70px 100px;
}
.q-tab--active{
  color: #E7E11D !important;
}
.q-tab--inactive{
  color: white;
}
.q-tab-panel{
  background-color: #5C1D79;
}
</style>
