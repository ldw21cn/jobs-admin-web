<template>
    <v-app id="login" class="primary">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4 lg4>
                        <v-card class="elevation-1 pa-3">
                            <v-card-text>
                                <div class="layout column align-center">
                                    <img src="/static/m.png" alt="Vue Material Admin" width="120" height="120">
                                    <h1 class="flex my-4 primary--text">Jobs Admin</h1>
                                </div>
                                <v-form>
                                    <v-text-field append-icon="person" name="username" :label="login.username"
                                                  type="text"></v-text-field>
                                    <v-text-field append-icon="lock" name="password" :label="login.password"
                                                  id="password" type="password"></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-switch :label="login.remember" v-model="remember"></v-switch>
                                <v-spacer></v-spacer>
                                <v-btn block color="primary" @click="toLogin" :loading="loading">{{login.button}}
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        data: () => ({
            loading: false,
            remember: false,
            login: {
                button: '登 录',
                remember: '记住密码',
                username: '用户名',
                password: '登录密码'
            }
        }),

        methods: {
            toLogin() {
                this.loading = true;
                setTimeout(() => {
                    this.$router.push('/dashboard');
                }, 1000);
            }
        }

    };
</script>
<style scoped lang="css">
    #login {
        height: 50%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        content: "";
        z-index: 0;
    }
</style>
