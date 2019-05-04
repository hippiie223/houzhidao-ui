<template>
    <div id="app">
        <Head></Head>
        <router-view/>
    </div>
</template>

<script>
import Head from "component/Header";
export default {
    components: {
        Head
    }
};
</script>

<style lang="stylus">
html, body {
    margin: 0;
    padding: 0;
    font-family: PingFang SC;
}

.pop {
    min-width: 100px !important;
}

.icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>
