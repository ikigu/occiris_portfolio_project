const db = require("../data/database");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");

class User {
  constructor(
    email,
    password,
    firstName,
    lastName,
    businessName,
    vatId,
    id,
    passwordResetToken
  ) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;

    if (businessName) {
      this.businessName = businessName;
    }

    if (vatId) {
      this.vatId = vatId;
    }

    if (id) {
      this.id = new ObjectId(id);
    }

    if (passwordResetToken) {
      this.passwordResetToken = passwordResetToken;
    }
  }

  // Create Functions

  async save() {
    const newUser = {
      email: this.email,
      password: await bcrypt.hash(this.password, 12),
      firstName: this.firstName,
      lastName: this.lastName,
      businessName: this.businessName,
      vatId: this.vatId,
    };
    const result = await db.getDb().collection("users").insertOne(newUser);
    return result;
  }

  // Password Functions

  async setPasswordResetToken() {
    const result = await db
      .getDb()
      .collection("users")
      .updateOne(
        { email: this.email },
        { $set: { pwdResetToken: this.passwordResetToken } }
      );
    return result;
  }

  // User hasn't logged-in (They forgot password)

  async changePasswordWithToken() {
    const result = await db
      .getDb()
      .collection("users")
      .updateOne(
        { pwdResetToken: this.passwordResetToken },
        {
          $set: {
            password: await bcrypt.hash(this.password, 12),
            pwdResetToken: null,
          },
        }
      );
    return result;
  }

  // Logged-in user

  async changePasswordWithId() {
    const result = await db
      .getDb()
      .collection("users")
      .updateOne(
        { _id: this.id },
        { $set: { password: await bcrypt.hash(this.password, 12) } }
      );
    return result;
  }

  async hasMatchingPassword(hashedPassword) {
    return bcrypt.compare(this.password, hashedPassword);
  }

  // Read Functions

  async find() {
    const existingUser = await db
      .getDb()
      .collection("users")
      .findOne({ email: this.email });
    return existingUser;
  }

  static async findAll() {
    const users = await db.getDb().collection("users").find().toArray();
    return users;
  }

  // Delete Functions

  async delete() {
    const result = await db
      .getDb()
      .collection("users")
      .deleteOne({ _id: this.id });
    return result;
  }
}

module.exports = User;
