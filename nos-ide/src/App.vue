<template>
  <v-app >
    <v-main class="white rounded-lg">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
  
};
</script>

<style lang="scss">
.v-main, .v-main__wrap, html, body{
  overflow: hidden !important;
}
</style>
