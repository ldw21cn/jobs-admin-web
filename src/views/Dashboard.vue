<template>
    <div id="pageDashboard">
        <v-container grid-list-xl fluid>
            <v-layout row wrap>
                <!-- mini statistic start -->
                <v-flex lg4 sm8 xs16>
                    <mini-statistic
                            icon="hourglass_full"
                            :title="runTaskNum"
                            sub-title="调度中心运行的任务数量"
                            color="light-blue"
                    >
                    </mini-statistic>
                </v-flex>
                <v-flex lg4 sm8 xs16>
                    <mini-statistic
                            icon="alarm_on"
                            :title="triggeredNum"
                            sub-title="调度中心触发的调度次数"
                            color="cyan"
                    >
                    </mini-statistic>
                </v-flex>
                <v-flex lg4 sm8 xs16>
                    <mini-statistic
                            icon="dns"
                            :title="onlineExecutorNum"
                            sub-title="调度中心在线的执行器机器数量"
                            color="teal"
                    >
                    </mini-statistic>
                </v-flex>
                <!-- mini statistic  end -->
                <v-flex lg8 sm12 xs12>
                    <v-widget title="日期分布图" content-bg="white">
                        <v-btn icon slot="widget-header-action">
                            <v-icon class="text--secondary">refresh</v-icon>
                        </v-btn>
                        <div slot="widget-content">
                            <ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>
                        </div>
                    </v-widget>
                </v-flex>
                <v-flex lg4 sm12 xs12>
                    <v-widget title="成功比例图" content-bg="white">
                        <v-btn icon slot="widget-header-action">
                            <v-icon class="text--secondary">refresh</v-icon>
                        </v-btn>
                        <div slot="widget-content">
                            <ve-pie :data="successRatio"></ve-pie>
                        </div>
                    </v-widget>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>
<script>
    import MiniStatistic from '@/components/widgets/statistic/MiniStatistic';
    import VWidget from '@/components/VWidget';
    import Material from 'vuetify/es5/util/colors';
    import {jobStatistics} from '../api';

    export default {
        components: {
            VWidget,
            MiniStatistic
        },
        data: () => ({
            runTaskNum: '0',
            triggeredNum: '0',
            onlineExecutorNum: '0',
            chartSettings: {
                showLine: ['成功']
            },
            chartData: {
                columns: ['日期', '执行', '成功', '失败'],
                rows: [
                    { '日期': '1/1', '执行': 1393, '成功': 1093, '失败': 12 },
                    { '日期': '1/2', '执行': 3530, '成功': 3230, '失败': 26 },
                    { '日期': '1/3', '执行': 2923, '成功': 2623, '失败': 76 },
                    { '日期': '1/4', '执行': 1723, '成功': 1423, '失败': 49 },
                    { '日期': '1/5', '执行': 3792, '成功': 3492, '失败': 323 },
                    { '日期': '1/6', '执行': 4593, '成功': 4293, '失败': 78 }
                ]
            },
            successRatio: {},
            color: Material
        }),
        computed: {
            siteTrafficData() {
                return API.getMonthVisit
            }
        },
        mounted() {
            this._getImportantNum()
            this._getSuccessRatio()
        },
        methods: {
            _getImportantNum: async function () {
                const data = await jobStatistics.getImportantNum()
                this.runTaskNum = data.runTaskNum + ''
                this.triggeredNum = data.triggeredNum + ''
                this.onlineExecutorNum = data.onlineExecutorNum + ''
            },
            _getSuccessRatio: async function () {
                const data = await jobStatistics.getSuccessRatio()
                this.successRatio = {
                    columns: ['name', 'value'],
                    rows: [
                        { 'name': '成功', 'value': data.successful },
                        { 'name': '进行中', 'value': data.inProgress },
                        { 'name': '失败', 'value': data.failed }
                    ]
                }
            }
        }
    };
</script>
