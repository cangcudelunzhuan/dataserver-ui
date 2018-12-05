<template>
  <div class="hello" :style="{height: heights+'px'}">
    <h1 class="hellomesbox">{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '欢迎进入数据服务系统'
    }
  },
  // inject:['reload'],
  mounted () {
    // console.log('...')
    // this.reload()
  },
  computed: {
    heights () {
      return this.$store.getters.contentH - 102
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello{
  display: table;
  width: 100%;
}
.hellomesbox{
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
</style>
