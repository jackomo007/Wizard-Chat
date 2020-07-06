<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
          <img v-if="!$route.fullPath.includes('conference-room')" width="50vw" height="50vw" src="wizard.png" />
          <q-btn  class="absolute-left" v-if="$route.fullPath.includes('conference-room')" v-go-back.single icon="arrow_back" flat dense></q-btn>
        <q-toolbar-title class="absolute-center title">
          {{title}}
        </q-toolbar-title>
        <q-btn
          v-if="!wizardDetails.wizardId"
          to="/spell-auth"
          class="absolute-right q-pr-sm classic"
          icon="shield"
          no-caps
          flat
          dense
          label="Aditum"
        />
        <q-btn
          v-else
          @click="expellusWizard"
          class="absolute-right q-pr-sm classic shield-gold"
          icon="local_police"
          no-caps
          flat
          dense
          :label="wizardDetails.name"
          title="Dispello"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import mixinOtherWizardDetails from 'src/mixins/mixin-other-wizard-details.js'

  export default {
    mixins: [mixinOtherWizardDetails],
    computed: {
      ...mapState('store', ['wizardDetails']),
      title() {
        let currentPath = this.$route.fullPath
        if(currentPath === '/') return 'Wizard Chat'
        else if(currentPath.includes('/conference-room')) return this.otherWizardDetails.name
        else if(currentPath === '/spell-auth') return 'Spell Access'
      }
    },
    methods: {
      ...mapActions('store', ['expellusWizard'])
    }
  }
</script>

<style>
  .title{
    font-size: large;
    font-family: Vivaldi;
    color: yellow;
  }
  .classic{
    color:silver;
    font-size: large;
    font-family: Vivaldi;
  }
  .shield-gold.q-btn--dense .on-left {
    color: yellow;
  }
  .shield-gold span.block {
    color: #930393;
  }
</style>
