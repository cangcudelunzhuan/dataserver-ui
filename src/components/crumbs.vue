<template id="">
  <div class="crumbsbox">
    <span v-for="(item, i) in crumbidArr"
    :class="{sectionTitle:i>0}">{{breadcrumbData.keyPath | matchbreadcrumb(i)}}</span>
  </div>
</template>
<script type="text/javascript">
  export default {
    props: ['data'],
    computed: {
      breadcrumbData () {
        return this.data
      },
      crumbidArr () {
        let keyPath = this.data.keyPath
        return keyPath.split('-')
      }
    }
  }
</script>
<style media="screen">
  .crumbsbox{
    background: #f6f6f6;
    color: #606266;
    font-weight: 400;
    font-size: 14px;
    text-align: left;
    padding: 15px 22px;
    line-height: 14px;
    position: fixed;
    top: 50px;
    left: 12.5%;
    width:100%;
    z-index: 99;
    opacity: 0;
  }
  .showcrumbs .crumbsbox{
    opacity: 1
  }
  .sectionTitle{
    margin-left: 15px;
    color: #8e8e8f;
    position: relative;
  }
  .sectionTitle::before{
    position: absolute;
    content:'>';
    top: 0px;
    left: -12px;
    color: #989292;
    font-family: sans-serif;
  }
</style>
