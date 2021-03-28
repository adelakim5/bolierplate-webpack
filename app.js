const webpack = require("webpack");
const middleware = require("webpack-dev-middleware");
const webpackConfig = require("./webpack.config.js");
const compiler = webpack(webpackConfig);
const express = require("express");
// const path = require("path");
const port = 9000;
const app = express();

app.get("/", (req, res, next) => {
  next(); // response를 보내지 않고, 다음에 해당하는게 있다면 그 다음으로 넘어가는 기능, 여기서는 middleware가 되는 것
});
// 요청을 보낼 때 여기에 들어오고 나가는지 확인하려면 디버깅을 해야하는데, 이게 없으면 콘솔 넣을 구간없이 넘어가버리니까 확인이 어려움
// 없어도 돌아가긴 하는데, 디버깅을 위해 좋음

app.use(
  middleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true },
  })
);

app.use(express.static(__dirname));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
