<template>
  <div class="hello">
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginLayout"
}
</script>

<style scoped>
.container {
  height: 100vh;
  overflow: auto;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0093e9;
  background-image: linear-gradient(160deg,#353031,#f4a7bb);
}
</style>