const Razorpay = require("razorpay");
const teacherM = require("../modals/teacher");
var studentM = require("../modals/user");
const payment = require("../modals/payment");
const crypto = require("crypto");
const Payment = require("../modals/payment");

// Instantiating Razorpay
var instance = new Razorpay({
  key_id: process.env.key_id,
  key_secret: process.env.key_secret,
});

exports.studentHome = async (req, res) => {
  const teacher = await teacherM.find().select(["-password", "-_id"]);
  return res.status(200).json({ status: "success", data: teacher });
  console.log(teacher);
};

// Information related to payment
exports.studentPayment = async (req, res) => {
  try {
    // console.log(req.params, req.body);

    var options = {
      amount: 50000, // amount in the smallest currency unit
      currency: "INR",
      receipt: "order_rcptid_11",
    };

    instance.orders.create(options, function (err, order) {
      //   console.log(order);
      res.status(200).json({ orderID: order });
    });
  } catch (error) {}
};

// Verify that payment done is legit or not
exports.paymentVerify = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);

    const shasum = crypto.createHmac("sha256", "slZdnySnaQh9hYfoGCJXawcl");
    shasum.update(`${data["orderID"]}|${data["razorpay_payment_id"]}`);
    const digest = shasum.digest("hex");

    console.log(digest !== data["razorpay_signature"]);
    if (digest !== data["razorpay_signature"])
      return res.status(400).json({ msg: "Transaction not legit!" });

    // THE PAYMENT IS LEGIT & VERIFIED

    // Update student's paid field here...
    const teacher = await teacherM.find({ Tid: data["Tid"] });
    console.log(req.params);
    if (teacher) {
      const addPay = await Payment.create({
        orderID: data["razorpay_order_id"],
        paymentID: data["razorpay_payment_id"],
        teacherID: data["Tid"],
      });
    }

    res.status(200).json({
      status: "success",
      orderId: data["razorpay_order_id"],
      paymentId: data["razorpay_payment_id"],
    });
  } catch (error) {
    res.status(500).json({ status: "failed", message: "Something went wrong" });
  }
};
