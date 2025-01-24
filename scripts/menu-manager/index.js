const {Menu} = require("electron");

function createMenu() {
  const menu = Menu.buildFromTemplate([// ... 菜单模板
  ]);
  Menu.setApplicationMenu(menu);
}

module.exports = {createMenu};
