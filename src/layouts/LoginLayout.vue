<template>
  <div class="hello">
    <div class="container">
      <i>XANH NGỌC LỤC BẢO</i>
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
i {
  position: absolute;
  top: 100px;
  color: white;
  font-size: 50px;
  font-weight: bold;
  text-shadow: 0 0 33px black;
}
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
  background-image: linear-gradient(to bottom right, #648455, #5a9e98);
}
</style>