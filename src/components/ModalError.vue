<template>
  <div class="modal">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: "modalError.vue",
  props: {
    text: String
  }
}
</script>

<style scoped>
  .modal{
    width: 150px;
    border-radius: 5px;
    background: #ff1744;
    color: white;
    position: absolute;
    top: 10%;
    right: 1%;
    padding: 5px;
  }
</style>