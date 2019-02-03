<template>
  <li>{{ todo.text }} {{ todo.done ? "済": "" }}</li>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  }
};
</script>