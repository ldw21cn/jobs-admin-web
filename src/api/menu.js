const Menu =  [
  {
    title: '仪表盘',
    icon: 'assessment',
    name: 'Dashboard',
  },
  {
    title: '任务管理',
    icon: 'alarm_on',
    name: 'Job',
  },
  {
    title: '调度日志',
    icon: 'bug_report',
    name: 'Log',
  }
];
// reorder menu
Menu.forEach((item) => {
  if (item.items) {
    item.items.sort((x, y) => {
      let textA = x.title.toUpperCase();
      let textB = y.title.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }
});

export default Menu;
