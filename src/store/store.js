import Vue from 'vue'
import { firebaseAuth, firebaseDb } from 'boot/firebase'

let messagesRef

const state ={
  wizardDetails: {},
  wizards: {},
  messages: {}
}
const mutations = {
  setWizardDetails(state, payload){
    state.wizardDetails = payload
  },
  addWizard(state, payload){
    Vue.set(state.wizards, payload.wizardId, payload.wizardDetails)
  },
  updateWizard(state, payload){
    Object.assign(state.wizards[payload.wizardId], payload.wizardDetails)
  },
  addMessage(state, payload){
    Vue.set(state.messages, payload.messageId, payload.messageDetails)
  },
  clearMessages(state){
    state.messages = {}
  }
}
const actions = {
	createWizard({}, payload) {
		firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
		.then( response => {
			let wizardId = firebaseAuth.currentUser.uid
			firebaseDb.ref('users/'+wizardId).set({
				name: payload.name,
				email: payload.email,
				online: true
			})
		})
		.catch(error => {
			console.log('Spell wrong! ', error.message)
		})
	},
	invoqueWizard({}, payload) {
		firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
		.then(response => {
			console.log(response)
		})
		.catch(error => {
			console.log('Spell wrong! ', error.message)
		})
  },
  expellusWizard(){
    firebaseAuth.signOut()
  },
  handleInvocation({ commit, dispatch, state }) {
		firebaseAuth.onAuthStateChanged( wizard => {
      if (wizard) {
        let wizardId = firebaseAuth.currentUser.uid
        firebaseDb.ref('users/'+wizardId).once('value', snapshot => {
          let wizardInfo = snapshot.val()
          commit('setWizardDetails', {
            name: wizardInfo.name,
            email: wizardInfo.email,
            wizardId: wizardId
          })
        })
        dispatch('firebaseUpdateWizard', {
          wizardId: wizardId,
          updates: {
            online: true
          }
        })
        dispatch('firebaseInvocateWizards')
        this.$router.push('/')
      }else{
        dispatch('firebaseUpdateWizard', {
          wizardId: state.wizardDetails.wizardId,
          updates: {
            online: false
          }
        })
        commit('setWizardDetails', {})
        this.$router.replace('/spell-auth')
      }
    });
  },
  firebaseUpdateWizard({}, payload) {
    if (payload.wizardId) {
      firebaseDb.ref('users/' + payload.wizardId).update(payload.updates)
    }
  },
  firebaseInvocateWizards({commit}) {
    firebaseDb.ref('users').on('child_added', snapshot => {
      let wizardDetails = snapshot.val()
      let wizardId = snapshot.key
      commit('addWizard', {
        wizardId,
        wizardDetails
      })
    })
    firebaseDb.ref('users').on('child_changed', snapshot => {
      let wizardDetails = snapshot.val()
      let wizardId = snapshot.key
      commit('updateWizard', {
        wizardId,
        wizardDetails
      })
    })
  },
  firebaseGetMessages({commit, state}, otherWizardId) {
    let wizardId = state.wizardDetails.wizardId
    messagesRef = firebaseDb.ref('conference-room/' + wizardId + '/' + otherWizardId)
    messagesRef.on('child_added', snapshot => {
      let messageDetails = snapshot.val()
      let messageId = snapshot.key
      commit('addMessage', {
        messageId,
        messageDetails
      })
    })
  },
  firebaseStopGettingMessages({ commit }){
    if(messagesRef){
      messagesRef.off('child_added')
      commit('clearMessages')
    }
  },
  firebaseSendMessage({}, payload) {
    firebaseDb.ref('conference-room/' + state.wizardDetails.wizardId + '/' + payload.otherWizardId).
    push(payload.newMessage)

    payload.newMessage.from="them"
    firebaseDb.ref('conference-room/' + payload.otherWizardId + '/' + state.wizardDetails.wizardId).
    push(payload.newMessage)
  }
}
const getters = {
  wizards: state => {
    let wizardsFiltered = {}
    Object.keys(state.wizards).forEach(key => {
      if (key !== state.wizardDetails.wizardId) {
        wizardsFiltered[key] = state.wizards[key]
      }
    })
    return wizardsFiltered
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
