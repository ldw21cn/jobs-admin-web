<template>
    <div id="pageTable">
        <v-container grid-list-xl fluid>
            <v-layout row wrap>
                <v-flex lg12>
                    <v-card>
                        <v-toolbar card color="white">
                            <v-text-field
                                    flat
                                    solo
                                    prepend-icon="search"
                                    placeholder="输入关键字"
                                    v-model="search"
                                    hide-details
                                    class="hidden-sm-and-down"
                            ></v-text-field>
                            <v-btn icon>
                                <v-icon>filter_list</v-icon>
                            </v-btn>
                            <v-btn depressed outline icon fab dark color="pink" small>
                                <v-icon>delete</v-icon>
                            </v-btn>
                        </v-toolbar>
                        <v-divider></v-divider>
                        <v-card-text class="pa-0">
                            <v-data-table
                                    :headers="headers"
                                    :search="search"
                                    :items="desserts"
                                    :pagination.sync="pagination"
                                    :total-items="totalDesserts"
                                    :loading="loading"
                                    :rows-per-page-items="[10,25,50,100]"
                                    class="elevation-1"
                                    item-key="id"
                                    select-all
                                    v-model="selected"
                            >
                                <template slot="items" slot-scope="props">
                                    <td>
                                        <v-checkbox
                                                primary
                                                hide-details
                                                v-model="props.selected"
                                        ></v-checkbox>
                                    </td>
                                    <td>{{ props.item.jobId }}</td>
                                    <td>{{ $dateformat(props.item.triggerTime) }}</td>
                                    <td>{{ props.item.triggerCode }}</td>
                                    <td>{{ props.item.triggerMsg?'查看':'-' }}</td>
                                    <!--                                    <td>{{ props.item.triggerMsg }}</td>-->
                                    <td>{{ $dateformat(props.item.handleTime) }}</td>
                                    <td>{{ props.item.handleCode }}</td>
                                    <td>{{ props.item.handleMsg }}</td>
                                </template>
                            </v-data-table>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import {jobLog} from '../api';

    export default {
        data: () => ({
            search: '',
            totalDesserts: 0,
            desserts: [],
            loading: true,
            pagination: {},
            selected: [],
            headers: [
                {
                    text: '任务 ID',
                    value: 'jobId'
                },
                {
                    text: '调度时间',
                    value: 'triggerTime'
                },
                {
                    text: '调度结果',
                    value: 'triggerCode'
                },
                {
                    text: '调度备注',
                    value: 'triggerMsg'
                },
                {
                    text: '执行时间',
                    value: 'handleTime'
                },
                {
                    text: '执行结果',
                    value: 'handleCode'
                },
                {
                    text: '执行备注',
                    value: 'handleMsg'
                }
            ]
        }),
        watch: {
            pagination: {
                handler() {
                    this._page()
                },
                deep: true
            }
        },
        // mounted() {
        //     this._page()
        // },
        methods: {
            _page: async function () {
                const {sortBy, descending, page, rowsPerPage} = this.pagination
                console.log('-----sortBy----', sortBy)
                console.log('-----descending----', descending)
                console.log('-----pagination----', this.pagination)
                this.loading = true
                const data = await jobLog.page({params: {page: page, rows: rowsPerPage}})
                this.desserts = data.records
                this.totalDesserts = data.total
                this.loading = false

            },
        }
    }
    ;
</script>
