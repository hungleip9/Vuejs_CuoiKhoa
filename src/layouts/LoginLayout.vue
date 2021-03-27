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
  background-image: url('https://softbuzz.net/wp-content/uploads/2019/10/1001-hinh-Background-dep-cho-Powerpoint-2019-softbuzz-50.jpg');
}
</style>