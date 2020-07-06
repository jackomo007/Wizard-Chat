<template>
  <q-page class="flex stars">
    <q-list class="full-width" separator>
      <q-item
        v-for="(wizard, key) in wizards"
        :key="key"
        :to="'/conference-room/' + key"
        class="q-my-sm gray"
        clickable v-ripple>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="yellow">
            {{ wizard.name.charAt(0) }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label style="color:white">{{ wizard.name }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <i
          v-bind:style=" wizard.online === true ? 'color: yellow;' : 'color: aqua;' "
          v-bind:class="wizard.online === true ? 'fa fa-sun-o' : 'fa fa-moon-o'"
          aria-hidden="true"
          style="font-size:40px;"
          ></i>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters('store', ['wizards'])
    }
  }
</script>

<style type="stylus">
  .stars{
    background-color:black;
    background-image:
    radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 40px),
    radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 30px),
    radial-gradient(white, rgba(255,255,255,.1) 2px, transparent 40px),
    radial-gradient(rgba(255,255,255,.4), rgba(255,255,255,.1) 2px, transparent 30px);
    background-size: 550px 550px, 350px 350px, 250px 250px, 150px 150px;
    background-position: 0 0, 40px 60px, 130px 270px, 70px 100px;
  }
  .gray{
    background-color: rgb(108, 4, 108);
    opacity: 0.7;
  }
</style>
