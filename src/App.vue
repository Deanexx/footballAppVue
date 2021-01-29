<template>
    <Header/>
    <router-view />
    <Footer/>

</template>

<script>
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"

export default {
  components: {
    Footer,
    Header
  }
}

</script>

<style lang="scss">
  body{
    margin: 0;
    padding: 0;
    color: #fff;
    background: #121212;
    font-family: 'Coda Caption', sans-serif;
  }
</style>
