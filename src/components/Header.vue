<template>
  <teleport to="body">
    <transition name="slide__up">
      <modalError v-if="error" :text="textError"/>
    </transition>
  </teleport>

  <div class="header">
    <transition name="animate__left">
      <div v-if="!!user" class="header__title"><span><img :style="{width: '50px',  transform: 'scaleX(-1)'}" src="@/assets/imgs/ak47.png" alt="ak47"></span>Soccer<span><img :style="{width: '50px'}" src="@/assets/imgs/ak47.png" alt="ak47"></span></div>
    </transition>


    <transition name="animate__leave" v-on:after-leave="animate=true">
      <div class="content" v-if="!user">
        <div class="header__reg">
          <label for="name" class="header__reg__label">My name is</label>
          <input id="name" class="header__reg__input" v-model="name" type="text">
        </div>
        <div class="header__reg__btn" @click="reg">ok</div>
      </div>
    </transition>

    <transition name="animate__right">
      <div v-if="!!user" class="header__user__name">{{ user.name }}</div>
    </transition>


  </div>
</template>

<script>
import { reg } from "@/apis/pollsApi"
import modalError from "@/components/ModalError.vue"
import {mapActions, mapGetters, mapMutations} from 'vuex'

export default {
  name: "header.js",
  components: {
    modalError
  },
  computed: {
    ...mapGetters("user", ["user"]),
    ...mapGetters("polls", ["all"])
  },
  data(){
    return {
      error: false,
      textError: ''
    }
  },
  methods:{
    ...mapActions("user", ["setUserFromCookie", "getAll"]),
    ...mapMutations("polls", ["addMe"]),
    async reg(){
      let { data } = await reg({ name: this.name });
      if(data){ //if user exists in DB
        this.error = true;
        this.textError = data;
        setTimeout(()=>{
          this.error = false;
        }, 10000)
      }
      this.getAll();
      this.setUserFromCookie();
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/vars.scss";
@import "@/assets/base.scss";

.header{
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 50px;
  width: 100%;
  background: $dark;
  border-color: #1e1e1e;
  box-shadow: 0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12);
  &__title{
    font-family: 'Pacifico', cursive;
    font-size: 25px;
    position: absolute;
    top: 0;
    left: 5%;
    color: $pink;
  }
  &__reg{
    &__input{
      border: 3px solid transparent;
      margin: 0 5px;
      border-radius: 2px;
    }
    &__label{

    }
    &__btn{
      padding: 3px;
      background: lightgreen;
      border-radius: 2px;
      cursor: pointer;
    }
  }
}

.animate__left-enter-active{
  animation: slide__left 0.2s linear;
}

.animate__left-leave-active{
  animation: slide__left .2s reverse;
}

.animate__right-enter-active{
  animation: slide__right 0.2s linear;
}

.animate__right-leave-active{
  animation: slide__right .2s reverse;
}

.animate__leave-enter-active{
  animation: animate__leave .2s linear;
}

.animate__leave-leave-active{
  animation: animate__leave .2s reverse;
}

.slide__up-leave-active{
  animation: slide__down 1s reverse;
}

.slide__up-enter-active{
  animation: slide__down 1s linear;
}

input[type=text]:focus {
  border: 3px solid $pink;
}

.header__user__name{
  color: white;
  font-size: 13px;
  position: absolute;
  top: 20%;
  right: 5%;
  background: $yellow;
  border-radius: 7px;
  padding: 5px;
}

.content{
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>