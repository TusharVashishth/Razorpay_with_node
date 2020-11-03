const express = require("express")
const app = express()
const path = require("path")
const Razorpay = require("razorpay")
const config = require("./config")

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

const instance = new Razorpay({
  key_id: config.key_id,
  key_secret: config.key_secret,
})

app.get("/", (req, res) => {
  var options = {
    amount: 50000, // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
  }
  instance.orders.create(options, function (err, order) {
    // console.log(order)
    res.render("index.ejs", { order: order })
  })
})

const PORT = 5000 || process.env.PORT
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))
