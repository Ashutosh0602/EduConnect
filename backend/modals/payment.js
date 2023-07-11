const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
  orderID: {
    type: String,
  },
  paymentID: {
    type: String,
  },
  teacherID: {
    type: String,
  },
  Date: {
    type: Date,
    default: Date.now(),
  },
});

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
