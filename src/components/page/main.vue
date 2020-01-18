<template>
    <div></div>
</template>
<script>
import { login,info } from '../../api/index'
export default {
    created () {
        let that = this
        info().then(res => {
        if ( res.data.parentId === 0) {  
            that.$router.push('/adminIndex')
        } else {
            that.$router.push('/userIndex')
        }
    })
    }
}
</script>