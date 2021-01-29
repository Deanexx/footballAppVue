<template>
  <div id="footer">
    <div id="nav">
      <router-link active-class="active" :to="{name: 'Main'}">Lets_play?</router-link>
      <router-link active-class="active" :to="{name: 'Vote'}">Vote</router-link>
      <router-link active-class="active" :to="{name: 'tableWeek'}">MVP_week</router-link>
      <router-link active-class="active" :to="{name: 'tableYear'}">MVP_year </router-link>
      <router-link active-class="active" :to="{name: 'BestGoalie'}">Goalies</router-link>
      <router-link active-class="active" :to="{name: 'Rules'}">Rules</router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "Footer.vue",
  computed: {
    ...mapGetters("user", ["user"])
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/vars.scss";

#footer{
  position: fixed;
  bottom: 0;
  left: 0;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  width: 100%;
  background: $dark;
  border-color: #1e1e1e;
  box-shadow: 0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12);
  #nav{
    a{
      margin-left: 10px;
    }
  }
}

a{
  text-decoration: none;
  color: $pink;
  font-size: 13px;
}

.active{
  background: $very-dark;
  padding: 1px 3px;
  border-radius: 2px;
  color: $yellow;
}

.footer__user__name{
  margin-right: 30px;
}
</style>