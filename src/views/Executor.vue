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
                                    <td>{{ props.item.sort }}</td>
                                    <td>{{ props.item.appName }}</td>
                                    <td>{{ props.item.title }}</td>
                                    <td>{{ props.item.addressType === 0?'自动注册':'手动录入' }}</td>
                                    <td>{{ props.item.addressList }}</td>
                                    <td>
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
        <v-dialog v-model="removeDialog" max-width="290">
            <v-card>
                <v-card-title class="headline">系统提示！</v-card-title>
                <v-card-text>确定删除该任务 ？</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat="flat"
                           @click="removeDialog = false">
                        取消
                    </v-btn>
                    <v-btn color="green darken-1" flat="flat"
                           @click="_remove">
                        确定
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import { jobGroup } from '../api';

    export default {
        data() {
            return {
                dialogId: undefined,
                removeDialog: false,
                search: '',
                complex: {
                    selected: [],
                    headers: [
                        {
                            text: '排序',
                            value: 'sort'
                        },
                        {
                            text: 'AppName',
                            value: 'appName'
                        },
                        {
                            text: '名称',
                            value: 'title'
                        },
                        {
                            text: '注册方式',
                            value: 'addressType'
                        },
                        {
                            text: 'OnLine 机器地址',
                            value: 'addressList'
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
                const result = await jobGroup.page(
                    { }
                )
                if (result) {
                    this.complex.items = result.records
                }
            },
            _removeDialog: function(id) {
                this.removeDialog = true
                this.dialogId = id;
            },
            _remove: async  function() {
                const result = jobGroup.remove(this.dialogId);
                if (result) {
                    this.removeDialog = false
                    window.getApp.$emit('APP_OPERATE_SUCCESS');
                    this._page()
                }
            }
        }
    };
</script>
