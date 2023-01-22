import { connectDatabase, insertDocument } from "../../helpers/db-util";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid Email Address" });
      return;
    }
    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to Database failed..." });
      return;
    }

    try {
      await insertDocument(client, "newsletter", { email: userEmail });
      res.status(201).json({ message: "Signed Up!" });
    } catch (error) {
      res.status(500).json({ message: "Inserting Data failed..." });
    }
    client.close();
  }
};

export default handler;
