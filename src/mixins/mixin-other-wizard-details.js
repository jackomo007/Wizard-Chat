export default {
  computed: {
    otherWizardDetails() {
      if(this.$store.state.store.wizards[this.$route.params.otherWizardId]) {
        return this.$store.state.store.wizards[this.$route.params.otherWizardId]
      }
      return {}
    }
  }
}
