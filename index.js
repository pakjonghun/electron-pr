//commonJS 왜냐하면 노드 환경 이므로
const electron = require("electron");
const { app } = electron;

app.on("ready", () => {
  console.log("ready for start");
});
