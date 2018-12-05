import Vue from 'vue'
import store from '@/store'
export default (keyPath, n) => {
    let idarr = keyPath.split('-')
    let navdata = store.getters.navData
    if (!idarr||!navdata) {
      return
    }
    let Name = []
    getName(navdata, idarr[0])
    function getName (arrs, ids) {
        arrs.map((item, i) => {
          if (item.id === ids) {
            Name.push(item.title)
            let index = idarr.indexOf(ids)
            if (index < idarr.length && item.children) {
              getName(item.children, idarr[index+1])
            }
          }
        })
    }
    let an = n || 0
    return Name[an]
}
