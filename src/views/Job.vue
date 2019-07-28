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
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-btn depressed outline icon fab dark color="primary" small v-on="on">
                                        <v-icon>add</v-icon>
                                    </v-btn>
                                </template>
                                <span>新增</span>
                            </v-tooltip>
                        </v-toolbar>
                        <v-divider></v-divider>
                        <v-card-text class="pa-0">
                            <v-data-table
                                    :headers="complex.headers"
                                    :search="search"
                                    :items="complex.items"
                                    :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
                                    class="elevation-1"
                                    item-key="name"
                                    select-all
                                    v-model="complex.selected"
                            >
                                <template slot="items" slot-scope="props">
                                    <td>
                                        <v-checkbox
                                                primary
                                                hide-details
                                                v-model="props.selected"
                                        ></v-checkbox>
                                    </td>
                                    <td>{{ props.item.id }}</td>
                                    <td>{{ props.item.app }}</td>
                                    <td>{{ props.item.author }}</td>
                                    <td>{{ props.item.cron }}</td>
                                    <td>{{ props.item.param }}</td>
                                    <td>{{ props.item.remark }}</td>
                                    <td>{{ props.item.failRetryCount }}</td>
                                    <td>{{ props.item.handler }}</td>
                                    <td>{{ $dateformat(props.item.lastTime) }}</td>
                                    <td>{{ $dateformat(props.item.nextTime) }}</td>
                                    <td>{{ $dateformat(props.item.updateTime) }}</td>
                                    <td v-if="props.item.status === 0">
                                        <v-chip color="red" text-color="white">停止</v-chip>
                                    </td>
                                    <td v-else>
                                        <v-chip color="green" text-color="white">运行</v-chip>
                                    </td>
                                    <td>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on }">
                                                <v-btn @click="_executeDialog(props.item.id)" depressed outline icon fab dark color="success" small v-on="on">
                                                    <v-icon>done_all</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>执行</span>
                                        </v-tooltip>
                                        <v-tooltip v-if="props.item.triggerStatus === 0" bottom>
                                            <template v-slot:activator="{ on }">
                                                <v-btn @click="_dialog(props.item.id, true)" depressed outline icon fab dark color="primary" small v-on="on">
                                                    <v-icon>alarm_on</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>启动</span>
                                        </v-tooltip>
                                        <v-tooltip v-else bottom>
                                            <template v-slot:activator="{ on }">
                                                <v-btn @click="_dialog(props.item.id, false)" depressed outline icon fab dark color="black" small v-on="on">
                                                    <v-icon>alarm_on</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>停止</span>
                                        </v-tooltip>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on }">
                                                <v-btn depressed outline icon fab dark color="teal" small v-on="on">
                                                    <v-icon>bug_report</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>日志</span>
                                        </v-tooltip>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on }">
                                                <v-btn depressed outline icon fab dark color="warning" small v-on="on">
                                                    <v-icon>edit</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>编辑</span>
                                        </v-tooltip>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on }">
                                                <v-btn @click="_removeDialog(props.item.id)" depressed outline icon fab dark color="pink" small v-on="on">
                                                    <v-icon>delete</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>删除</span>
                                        </v-tooltip>
                                    </td>
                                </template>
                            </v-data-table>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
        <v-dialog v-model="executeDialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">执行</span>
                </v-card-title>
                <v-card-text>
                    <v-textarea id="param" outline name="param" rows="7" label="任务参数"></v-textarea>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="executeDialog = false">取消</v-btn>
                    <v-btn color="blue darken-1" flat @click="_execute">确定</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialog" max-width="290">
            <v-card>
                <v-card-title class="headline">系统提示！</v-card-title>
                <v-card-text>{{dialogStart?'确定启动 ？':'确定停止 ？'}}</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat="flat"
                            @click="dialog = false">
                        取消
                    </v-btn>
                    <v-btn color="blue darken-1" flat="flat"
                            @click="_start">
                        确定
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="removeDialog" max-width="290">
            <v-card>
                <v-card-title class="headline">系统提示！</v-card-title>
                <v-card-text>确定删除该任务 ？</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat="flat"
                            @click="removeDialog = false">
                        取消
                    </v-btn>
                    <v-btn color="blue darken-1" flat="flat"
                            @click="_remove">
                        确定
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import { jobsInfo } from '../api';

    export default {
        data() {
            return {
                dialogId: undefined,
                dialogStart: true,
                dialog: false,
                executeDialog: false,
                removeDialog: false,
                search: '',
                complex: {
                    selected: [],
                    headers: [
                        {
                            text: '任务 ID',
                            value: 'id'
                        },
                        {
                            text: 'app',
                            value: 'app'
                        },
                        {
                            text: '作者',
                            value: 'author'
                        },
                        {
                            text: 'cron',
                            value: 'cron'
                        },
                        {
                            text: '参数',
                            value: 'param'
                        },
                        {
                            text: '备注',
                            value: 'remark'
                        },
                        {
                            text: '失败次数',
                            value: 'failRetryCount'
                        },
                        {
                            text: '处理器',
                            value: 'handler'
                        },
                        {
                            text: '最后一次执行时间',
                            value: 'lastTime'
                        },
                        {
                            text: '下次执行时间',
                            value: 'nextTime'
                        },
                        {
                            text: '更新时间',
                            value: 'updateTime'
                        },
                        {
                            text: '执行状态',
                            value: 'status'
                        },
                        {
                            text: '操作',
                            value: ''
                        },
                    ],
                    items: []
                }
            };
        },
        mounted() {
            this._page()
        },
        methods: {
            _page: async function() {
                const result = await jobsInfo.page(
                    { }
                )
                if (result) {
                    this.complex.items = result.records
                }
            },
            _dialog: function(id, start) {
                this.dialogStart = start
                this.dialog = true
                this.dialogId = id
            },
            _success(tip) {
                window.getApp.$emit(tip? tip: 'APP_OPERATE_SUCCESS');
                this._page()
            },
            _start: async function() {
                var result;
                if (this.dialogStart) {
                    result = await jobsInfo.start(this.dialogId)
                } else {
                    result = await jobsInfo.stop(this.dialogId)
                }
                if (result) {
                    this.dialog = false
                    this._success(this.dialogStart ? 'APP_JOB_START' : 'APP_JOB_STOP')
                }
            },
            _executeDialog: function(id) {
                this.executeDialog = true
                this.dialogId = id;
            },
            _execute: async function() {
                const param = document.getElementById("param").value
                const result = jobsInfo.execute(this.dialogId, param);
                if (result) {
                    this.executeDialog = false
                    this._success()
                }
            },
            _removeDialog: function(id) {
                this.removeDialog = true
                this.dialogId = id;
            },
            _remove: async function() {
                const result = jobsInfo.remove(this.dialogId);
                if (result) {
                    this.removeDialog = false
                    this._success()
                }
            }
        }
    };
</script>
