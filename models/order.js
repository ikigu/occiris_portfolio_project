const db = require("../data/database");
const { ObjectId } = require("mongodb");
const orderDetails = require("../utils/order.creation.details");

class Order {
  constructor(req, order, id, captions, transcript) {
    if (req) {
      this.client = {
        id: new ObjectId(req.session.user.id),
        name: orderDetails.nameToUse(req),
        email: orderDetails.emailToUse(req),
      };
    }

    if (order) {
      this.name = order.name;
      this.type = order.type;
      this.cost = order.cost;
      this.date = { placed: new Date(), completed: null };
      this.status = "in-progress";
      this.time = order.time;
      this.youtube = order.youtube;
    }

    if (id) {
      this.id = new ObjectId(id);
    }

    if (captions || transcript) {
      this.files = { captions: captions, transcript: transcript };
    }
  }

  async save() {
    const order = {
      client: this.client,
      name: this.name,
      type: this.type,
      cost: this.cost,
      date: this.date,
      status: this.status,
      time: this.time,
      youtube: this.youtube,
    };
    const result = await db.getDb().collection("orders").insertOne(order);
    return result;
  }

  async markAsComplete() {
    const result = await db
      .getDb()
      .collection("orders")
      .findOneAndUpdate(
        { _id: this.id },
        {
          $set: {
            files: this.files,
            "date.completed": new Date(),
            status: "completed",
          },
        }
      );

    return result;
  }

  static async findAll() {
    const result = await db.getDb().collection("orders").find().toArray();
    return result;
  }

  async findSingleClientOrders() {
    const result = await db
      .getDb()
      .collection("orders")
      .find({ "client.id": this.client.id })
      .toArray();
    return result;
  }

  async findSingleOrder() {
    const result = await db
      .getDb()
      .collection("orders")
      .find({ _id: this.id })
      .toArray();
    return result;
  }
}

module.exports = Order;
