const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    from: { type: mongoose.Schema.Types.ObjectId, required: true },
    to: { type: mongoose.Schema.Types.ObjectId, required: true },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["like", "dislike", "pending", "accepted"],
        message: `{VALUE} is not supported`,
      },
    },
  },
  { timestamps: true },
);

const ConnectionRequest = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema,
);

module.exports = ConnectionRequest;
