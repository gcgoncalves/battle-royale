<template>
  <div>
    <label :for="name">{{ label }}:</label>
    <input 
      :value="modelValue" 
      :id="name"
      :type="type" 
      :placeholder="placeholder" 
      :maxlength="maxNameLength" 
      :max="max"
      :min="min"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: 'FormInput',
  props: {
    modelValue: {
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'string',
    },
    maxlength: {
      type: Number,
      required: false,
    },
    min: {
      type: Number,
      required: false,
    },
    max: {
      type: Number,
      required: false,
    }
  },
}
</script>

<style lang="scss" scoped>
label {
  display: block;
}
</style>