<template>
  <q-page ref="invocation" class="invocation flex column">
    <q-banner v-if="!otherWizardDetails.online" style="font-size: large;font-family: Vivaldi;color:gold" inline-actions class="text-center bg-purple">
      It is like nobody here...
    </q-banner>
    <div
      :class="{'invisible' : !showMessages }"
      class="q-pa-md column col pergamin justify-end">
      <q-chat-message
        style="font-size: large;font-family: Vivaldi;color: #bd0404;"
        v-for="(msg, key) in messages"
        :key="key"
        :name="msg.from === 'me' ? wizardDetails.name : otherWizardDetails.name"
        :text="[msg.text]"
        :sent="msg.from === 'me' ? true : false"
      />
    </div>
     <q-footer elevated>
        <q-toolbar>
          <q-form @submit="activateSpell" class="full-width">
            <q-input
              v-model="message"
              ref="message"
              outlined
              rounded
              bg-color="white"
              label="Dissedium"
              dense
            >
              <template v-slot:before>
                <q-avatar v-if="message === ''">
                  <img src="wizard.png">
                </q-avatar>
              </template>
              <template v-slot:after>
                <q-btn
                  color="yellow"
                  v-if="message !== ''"
                  round
                  flat
                  icon="send"
                />
              </template>
            </q-input>
          </q-form>
        </q-toolbar>
      </q-footer>
  </q-page>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import mixinOtherWizardDetails from 'src/mixins/mixin-other-wizard-details.js'

  export default {
    mixins: [mixinOtherWizardDetails],
    data () {
      return {
        message: '',
        showMessages: false
      }
    },
    computed: {
      ...mapState('store', ['messages', 'wizardDetails'])
    },
    methods: {
      ...mapActions('store', [
        'firebaseGetMessages',
        'firebaseStopGettingMessages',
        'firebaseSendMessage'
        ]),
      activateSpell() {
        this.firebaseSendMessage({
          newMessage: {
            text: this.message,
            from: 'me'
          },
          otherWizardId: this.$route.params.otherWizardId
        });
        this.clearMessage()
      },
      clearMessage() {
        this.message = ''
        this.$refs.message.focus()
      },
      scrollToBottom(){
        let invocation = this.$refs.invocation.$el
        setTimeout(() => {
          window.scrollTo(0, invocation.scrollHeight)
        }, 20)
      }
    },
    watch: {
      messages: function(val) {
        if(Object.keys(val).length) {
          this.scrollToBottom()
          setTimeout(() => {
            this.showMessages = true
          })
        }
      }
    },
    mounted() {
      this.firebaseGetMessages(this.$route.params.otherWizardId)
    },
    destroyed() {
      this.firebaseStopGettingMessages()
    }
  }
</script>

<style>
  .pergamin {
    background-image: url('/msg.jpg');
    opacity: .8;
  }
  .q-message-name{
    font-size: larger;
    font-weight: bold;
  }
  .q-message-text{
    background: transparent;
    font-weight: bold;
  }
  .q-banner{
    top: 50px;
    z-index: 2;
    opacity: 0.5;
  }
</style>
