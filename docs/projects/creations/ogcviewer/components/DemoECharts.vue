<template>
    <div class="card">
        <div id="chart" />
    </div>
</template>

<script setup>
import * as echarts from 'echarts';
import {onMounted} from "vue";

onMounted(() => {
    var chartDom = document.getElementById('chart');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
        title: {
            text: 'Referer of a Website',
            subtext: 'Fake Data',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: '65%',
                data: [
                    { value: 1048, name: 'Search Engine' },
                    { value: 735, name: 'Direct' },
                    { value: 580, name: 'Email' },
                    { value: 484, name: 'Union Ads' },
                    { value: 300, name: 'Video Ads' }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    option && myChart.setOption(option);
})
</script>

<style scoped>
.card {
    display: flex;
    justify-content: center;
}

#chart {
    width: 100%;
    height: 400px;
}
</style>