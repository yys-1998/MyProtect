const express = require("express");
const bodyParser = require("body-parser");
const app = express()
const db = require("./db2");
const tools = require("./tools");
app.use(bodyParser.json());
app.post("/news", async (req, res) => {
    const dataList = req.body;
    const newsList = { ...dataList, addtime: Date.now() }
    // console.log(req.body)
    const info = await db.insertOne("newsList", newsList);
    if (info) {
        const newsList = await db.find("newsList", {});
        console.log(newsList);
        res.json({
            ok: 1,
            msg: "插入数据成功",
            newsList
        })
    } else {
        res.json({
            ok: 1,
            msg: "插入数据失败"
        })
    }

});
// app.get("/newsList", async (req, res) => {
//     const info = req.params.newsTitle;
//     // console.log(req);
//     const newsList = await db.find("newsList", {})
//     if (newsList) {
//         res.json({
//             ok: 1,
//             msg: "获得数据成功",
//             newsList
//         })
//     } else {
//         res.json({
//             ok: 1,
//             msg: "获得数据失败",
//         })
//     }
// })
app.listen(81, function () {
    console.log("success");
})