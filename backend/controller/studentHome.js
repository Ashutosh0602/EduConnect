const Razorpay = require("razorpay");
const teacherM = require("../modals/teacher");
var studentM = require("../modals/user");

// Instantiating Razorpay
var instance = new Razorpay({
  key_id: "rzp_test_aNYoQ5FgTfdEnR",
  key_secret: "slZdnySnaQh9hYfoGCJXawcl",
});

exports.studentHome = async (req, res) => {
  const teacher = await teacherM.find().select(["-password", "-_id"]);
  return res.status(200).json({ status: "success", data: teacher });
  console.log(teacher);
};

exports.studentPayment = async (req, res) => {
  try {
    console.log(req.params, req.body);

    var options = {
      amount: 50000, // amount in the smallest currency unit
      currency: "INR",
      receipt: "order_rcptid_11",
    };
    // var {
    //   validatePaymentVerification,
    //   validateWebhookSignature,
    // } = require("./dist/utils/razorpay-utils");
    // validatePaymentVerification(
    //   { order_id: razorpayOrderId, payment_id: razorpayPaymentId },
    //   signature,
    //   secret
    // );

    instance.orders.create(options, function (err, order) {
      //   console.log(order);
      res.status(200).json({ orderID: order });
    });
  } catch (error) {}
};

exports.paymentVerify = async (req, res) => {
  try {
    console.log(req.body);
  } catch (error) {}
};
