import { MongoClient } from 'mongodb';

export class MongoClientConnection {
  constructor() {
    this.URI = process.env.MONGO_DB_CONNECTION_URL;
    this.client = new MongoClient(this.URI);
    this.connect();
  }
  connect() {
    try {
      this.client.connect().then(() => {
        console.log('connected successfully');
      });
      this.collection = this.client
        .db('tutAR-webApp-db')
        .collection('model-metadata');
    } catch (err) {
      console.log(err);
    } finally {
    }
  }

  async getData() {
    const result = this.collection.find();
    const resArray = await result.toArray();
    return resArray;
  }
  async getFilteredData(Class) {
    const res = await this.collection.find({ Class }).toArray();
    return res;
  }
  async updateData(data) {
    const { name, thumbName, thumb, fileAddr, Subject, Class } = data;

    const res = await this.collection.updateOne(
      { name },
      { $set: { thumbName, thumb, fileAddr, Subject, Class } },
      { upsert: true }
    );
    console.log(res);
  }
  deleteData() {}
}
