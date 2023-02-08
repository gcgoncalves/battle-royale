<template>
  <form>
    <FormInput
      v-model="name" 
      name="name"
      label="Name"
      type="string" 
      placeholder="Choose your name" 
      :maxlength="maxNameLength" 
      :class="{error: form.name.error}"
      @change.prevent="validatePlayer()"
    />
    <FormInput 
      v-model="attack" 
      name="attack" 
      label="Attack Power" 
      type="number" 
      min="0" 
      :class="{error: form.attack.error}"
      @change.prevent="validatePlayer()"
    />
    <FormInput 
      v-model="hp" 
      name="hp" 
      label="Health Points" 
      type="number" 
      min="0" 
      :class="{error: form.hp.error}"
      @change.prevent="validatePlayer()"
    />
    <FormInput 
      v-model="luck" 
      name="luck" 
      label="Luck" 
      type="number" 
      min="0" 
      :class="{error: form.luck.error}"
      @change.prevent="validatePlayer()"
    />
    <p>Avalilable points: <strong>{{ availablePoints }}</strong></p>
    <button @click.prevent="savePlayer" :disabled="saveSuccess && !validatePlayer()">Send</button>
  </form>
</template>

<script>
import axios from 'axios'
import FormInput from './FormInput.vue'

export default {
  name: 'NewPlayerForm',
  components: {
    FormInput,
  },
  data: () => {
    return {
      maxNameLength: 20,
      startingPoints: 100,
      name: '',
      attack: 0,
      hp: 0,
      luck: 0,
      form: {
        name: {
          error: false,
        },
        attack: {
          error: false,
        },
        hp: {
          error: false,
        },
        luck: {
          error: false,
        },
      },
      saveSuccess: true,
    }
  },
  computed: {
    availablePoints() {
      const startingPoints = this.startingPoints 
      const attack = this.attack
      const hp = this.hp
      const luck = this.luck
      return startingPoints - attack - hp - luck
    },
  },
  methods: {
    validatePlayer() {
      if (this.availablePoints < 0) {
        this.form.attack.error = true
        this.form.hp.error = true
        this.form.luck.error = true
        return false
      } else {
        this.form.attack.error = false
        this.form.hp.error = false
        this.form.luck.error = false
      }
      if (this.name.length > this.maxNameLength) {
        this.form.name.error = true
        return false
      } else {
        this.form.name.error = false
      }
      return true
    },
    savePlayer() {
      const requestBody = { 
        name: this.name,
        gold: Math.floor(Math.random() * 21),
        attack: this.attack,
        hp: this.hp,
        luck: this.luck,
      }
      const requestConfig = {
        headers: {
          "Content-Type": "application/json"
        }
      }
      console.log(requestBody)
      if (this.validatePlayer()) {
        axios.post("http://localhost:8080/player", JSON.stringify(requestBody), requestConfig).then(
          response => response.json()
        ).then(() => ( this.saveSuccess = true ))
      }
    },
  }
}
</script>

<style scoped lang="scss">
.error {
  border: 2px solid #D88;
}
</style>