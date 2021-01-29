<template>
  <div class="home">
    <h2 class="home__title">Saturday, 8am</h2>

        <div class="home__buttons">
          <div class="button__go" :class="{active: isInList, btn__disabled: !user}" @click="reg">
            {{ loading ? "..." : "I'm going" }}
          </div>
          <div class="button__noGo" :class="{btn__disabled: !isInList}" @click="reset">
            {{ loading ? "..." : "Reset me" }}
          </div>
        </div>

    <div class="home__additional__players">
      <label for="home__select">I'm bringing with me</label>
      <select class="home__select__inner" :disabled="isInList" name="number" id="home__select" v-model="additionalPlayers">
        <option value="0" :disabled="isInList">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <span>players</span>
    </div>

    <div class="home__list">
      <div class="home__list__title">So far going <span>{{ amountPlayers }}</span> footballers </div>
      <ol v-if="activeInnerPoll.length !== 0" class="home__list__inner">
        <li v-for="(item, i) in activeInnerPoll" :key="i">
          {{ playerNameById(item._id) }} <sup>{{ item.additionalPlayers ? "+" + item.additionalPlayers : '' }}</sup>
        </li>
      </ol>
    </div>

    <div class="button__signOut" :class="{btn__disabled: !user}" @click="logOut">
      {{ loading ? "..." : "Sign out" }}
    </div>

    <div class="home__map">
    </div>




  </div>
</template>

<script>
// @ is an alias to /src
import { regForGame, reset } from "@/apis/pollsApi"
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
  },
  data(){
    return {
      loading: false,
      additionalPlayers: 0
    }
  },
  computed: {
    ...mapGetters("user", ['user', 'allUsers', 'playerNameById']),
    ...mapGetters("polls", ['amountPlayers', "isInList", "activeInnerPoll"])
  },
  methods: {
    ...mapActions("polls", ["all", "addMeAction"]),
    ...mapActions("user", ["signOut"]),
    async reg(){
      if(!this.user) return;
      this.loading = true;
      await regForGame({additionalPlayers: this.additionalPlayers});
      await this.all();
      this.loading = false;
    },
    async reset(){
      if(!this.isInList || !this.user) return;
      this.loading = true;
      await reset();
      await this.all();
      this.loading = false;
    },
    async logOut(){
      this.loading = true;
      await this.signOut();
      this.loading = false;
    },
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/vars.scss";
@import "@/assets/base.scss";

#name{
  margin-left: 10px;
}

.home{
  display: flex;
  flex-direction: column;
  &__select{
    &__inner{
      margin: 0 5px;
      background: #41210c;
      color: white;
      option{
        color: white;
      }
    }
  }
  &__title{
    text-align: center;
  }
  &__reg{
    @include center;
  }
  &__buttons{
    @include center;
    height: 65px;
  }
  &__additional__players{
    @include center;
    margin: 15px 0;
  }
  &__list{
    text-align: center;
    background: $pink;
    &__title{
      margin: 10px;
      color: $very-dark;
      span{
        color: $dark;
      }
    }
    &__inner{
      border-radius: 5px;
      margin: 10px 5px;
      background: $dark;
    }
  }
}



.button__go{
  @include btn($pink);
  border-radius: 20px 8px 8px 20px;
}

.button__noGo{
  @include btn($yellow);
  border-radius: 8px 20px 20px 8px;
}

.button__signOut{
  @include btn($red);
  width: 130px;
  margin: 10px auto 60px;
  text-align: center;
  border-radius: 20px 20px 20px 20px;
}

.active{
  min-height: 60px;
  color: lighten($pink, 50%);
  border-color:  lighten($pink, 50%);

}

.btn__disabled{
  background: #757575 !important;
  border-color: darken(#757575, 30%) !important;
  color: darken(#757575, 30%) !important;
}

ol{
  columns: 3;
  li{
    font-family: 'Catamaran', sans-serif;
    font-size: 15px;
    padding: 3px;
    sup{
      color: $red;
    }
  }
}


</style>