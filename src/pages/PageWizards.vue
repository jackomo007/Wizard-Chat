<template>
  <q-page class="flex stars">
    <q-list class="full-width q-pa-md" separator>
      <q-item
        v-for="(wizard, key) in wizards"
        :key="key"
        :to="'/conference-room/' + key"
        class="q-my-sm gray"
        clickable
        v-ripple
      >
        <q-item-section avatar>
          <q-avatar color="primary" text-color="yellow">
            {{ wizard.name.charAt(0) }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ wizard.name }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <i
            :style="wizard.online ? 'color: yellow;' : 'color: aqua;'"
            :class="wizard.online ? 'fa fa-sun-o' : 'fa fa-moon-o'"
            aria-hidden="true"
            style="font-size: 40px;"
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
  .stars
  background-color: black
  background-image:
    radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 40px),
    radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 30px),
    radial-gradient(white, rgba(255,255,255,.1) 2px, transparent 40px),
    radial-gradient(rgba(255,255,255,.4), rgba(255,255,255,.1) 2px, transparent 30px)
  background-size: 550px 550px, 350px 350px, 250px 250px, 150px 150px
  background-position: 0 0, 40px 60px, 130px 270px, 70px 100px
  background-attachment: fixed // <-- Parallax effect
  animation: starsMove 60s linear infinite
  min-height: 100vh

@keyframes starsMove
  from
    background-position: 0 0, 40px 60px, 130px 270px, 70px 100px
  to
    background-position: 1000px 1000px, 1040px 1060px, 1130px 1270px, 1070px 1100px

.gray
  background-color: rgba(108, 4, 108, 0.7) // más semitransparente
  backdrop-filter: blur(3px) // desenfoque suave para elegancia
  border-radius: 10px
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.2)
  transition: transform 0.3s ease, box-shadow 0.3s ease
  &:hover
    transform: scale(1.02)
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.4)

.q-item-label
  font-size: 18px
  font-weight: 500
  color: white
</style>
