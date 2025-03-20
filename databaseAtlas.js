const { MongoClient } = require("mongodb");

const url =
  "mongodb+srv://rahulkar:Jmfr6a6syqEbgdHQ@namastenode.temrj.mongodb.net/";

const client = new MongoClient(url);

const dbName = "University";

async function main() {
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("students");

  let data = {
    firstname: "Udayan",
    lastname: "Kar",
    age: 56,
    phone: 8887666,
  };

  //insert
  const insertResult = await collection.insertMany([data]);
  console.log("Inserted documents =>", insertResult);

  //read
  const findResult = await collection.find({}).toArray();
  console.log("Found documents =>", findResult);

  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
