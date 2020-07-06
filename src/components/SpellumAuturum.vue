<template>
  <form @submit="activeSpell">
    <q-input v-if="tab === 'register'" class="q-mb-md" outlined v-model="formData.name" label="Name" />
    <q-input class="q-mb-md" type="email" outlined v-model="formData.email" label="Owl Address" />
    <q-input class="q-mb-md" type="password" outlined v-model="formData.password" label="Spell Word" />
    <div class="row">
      <q-space />
      <q-btn
        v-if="formData.email !== '' && formData.password !== ''"
        @click="activeSpell"
        color="black"
        :label="tab"
      />
    </div>
  </form>
</template>

<script>
  import {mapActions } from 'vuex'
  export default {
    props: ['tab'],
    data() {
      return {
        formData: {
          name: '',
          email: '',
          password: ''
        }
      }
    },
    methods: {
      ...mapActions('store', [
        'createWizard',
        'invoqueWizard'
      ]),
      activeSpell() {
        if(this.tab === 'login') {
          this.invoqueWizard(this.formData)
        } else {
          this.createWizard(this.formData)
        }
      }
    }
  }
</script>

<style lang="stylus">
.q-input{
  background-color: #f3ec1c
}
</style>
