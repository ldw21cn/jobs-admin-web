export default [
  {
    name: 'APP_LOGIN_SUCCESS',
    callback: function (e) {
      this.$router.push({ path: 'dashboard' });
    }
  },
  {
    name: 'APP_LOGOUT',
    callback: function (e) {
      this.snackbar = {
        show: true,
        color: 'green',
        text: '成功退出 ！'
      };
      this.$router.replace({ path: '/login' });
    }
  },
  {
    name: 'APP_JOB_START',
    callback: function (e) {
      this.snackbar = {
        show: true,
        color: 'green',
        text: '任务启动成功 ！'
      };
    }
  },
  {
    name: 'APP_JOB_STOP',
    callback: function (e) {
      this.snackbar = {
        show: true,
        color: 'green',
        text: '任务停止完成 ！'
      };
    }
  },
  {
    name: 'APP_OPERATE_SUCCESS',
    callback: function (e) {
      this.snackbar = {
        show: true,
        color: 'green',
        text: '操作成功 ！'
      };
    }
  },

];
