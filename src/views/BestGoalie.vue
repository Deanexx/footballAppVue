<template>
  <table class="table">
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Goals</th>
    </tr>
    <tr v-for="(value, name) in res" :key="name">
      <td>1</td>
      <td>{{ name }}</td>
      <td>{{ value }}</td>
    </tr>
  </table>
</template>

<script>
import { get } from "@/apis/goalieApi.js"

export default {
name: "BestGoalie.vue",
  data(){
    return {
      res: {}
    }
  },
  async created(){
    let { data }  = await get();
    console.log(data);

    this.res = data.all;
  }
}
</script>

<style lang="scss">
@import "@/assets/vars.scss";
@import "@/assets/base.scss";

.table {
  border-collapse: collapse;
  margin: 30px auto 60px;
  font-size: 0.9em;
  width: 80%;
}

th {
  background: $pink;
  color: $dark;
  border: 1px solid $very-dark;
}
td{
  text-align: center;
  padding: 5px;
  border: 1px solid $pink;
}
</style>