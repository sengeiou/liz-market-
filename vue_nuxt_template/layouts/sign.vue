<template>
  <div class="sign" :style="back">
    <!--标题-->
    <div class="logo">
      <img src="~/assets/market/img/logo.png" alt="logo" width="430" height="200">
    </div>
    <!--表单-->
    <nuxt/>
  </div>
</template>

<script>

import request from "@/utils/request";

export default {

  data() {
    return {
      back: {
        backgroundImage: "url(" + require("../assets/market/img/back.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: '100% 100%'
      }
    }
  }
}

</script>

