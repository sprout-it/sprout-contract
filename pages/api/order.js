import { db } from "./firebase";
import { collection, doc, addDoc, setDoc, getDocs } from "firebase/firestore";

async function getOrder() {
  return new Promise(async(resolve, reject) => {
      let order = [];
      const querySnapshot = await getDocs(collection(db, "cities"));
      querySnapshot.forEach((doc) => {
        order.push(doc.data());
      });
      return resolve(order);
  })
}

async function addOrder(req) {
  return new Promise(async(resolve, reject) => {
    const { package } = req.body;
    await addDoc(collection(db, "package"), {
      package,
    });
    return resolve("กรุณารอ AE ติดต่อกลับไปค่ะ");
})
    

}

export default async (req, res) => {
  try {
    const { method } = req;
    switch (method) {
      case "GET":
        const order = await getOrder();
        res.status(200).json(order);
        break;
      case "POST":
        const response = await addOrder(req);
        // Get data from your database
        res.status(200).json({ message: response });
        break;
      case "PUT":
        // Update or create data in your database
        res.status(200).json("PUT");
        break;
      default:
        res.status(200).json("hello world");
    }
  } catch (error) {
    console.log(error);
  }
};
