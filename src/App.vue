<template>
    <h2 class="header-title">verney UI</h2>
    <Waterfall :list="list" rowKey="id">
        <template #card="{ item, index }">
            <div class="waterfall-card" :key="index">
                <h3>{{ item.title }}</h3>
                <img :src="item.pic" alt="" />
                <p>{{ item.desc }}</p>
            </div>
        </template>
    </Waterfall>

    <button @click="onMore">加载更多</button>
</template>
<script setup lang="ts">
// import {Waterfall} from '../packages'

// import {Waterfall} from 'vue3-verney-ui';
// import "vue3-verney-ui/style";

import { ref } from 'vue';

let list = ref(<any>[]);
async function getData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            let _list = [];
            for (let i = 0; i < 10; i++) {
                let height = Math.floor(Math.random() * 300) + 100;
                let json = {
                    title: '标题' + list.value.length + i,
                    id: `${list.value.length + i}__${+new Date()}`,
                    pic: `https://picsum.photos/200/${height}?random=${i}`,
                    desc: new Array(Math.floor(Math.random() * 10))
                        .fill('这是一段描述')
                        .join(''),
                };
                _list.push(json);
            }
            resolve(_list);
        }, 1000);
    });
}

function onMore() {
    getData().then((res: any) => {
        // console.log(res);
        list.value.push(...(res || []));
    });
}
</script>

<style lang="less" scoped>
.header-title {
    text-align: center;
    margin: 20px;
    font-size: 20px;
}

.waterfall-card {
    display: flex;
    flex-direction: column;
    margin: 10px;
    padding: 6px;
    img {
        width: 100%;
    }
}
</style>
<style lang="less">
.verney-waterfall-item + .verney-waterfall-item {
    border-top: 1px solid #eee;
}
</style>
