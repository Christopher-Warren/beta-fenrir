import dbConnect from "../../../utils/dbConnect";
import Stats from "../../../models/Stats";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const stats = await Stats.find(
          {}
        ); /* find all the data in our database */
        res.status(200).json({ success: true, data: stats });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      const checkDB = await Stats.countDocuments({});
      console.log("CHECKING DB... ", checkDB);
      if (checkDB === 0) {
        Stats.create({
          visits: 0,
          charactersCreated: 0,
          battlesWon: 0,
          bossesKilled: 0,
          deaths: 0,
          gameBeaten: 0,
        });
      }

      try {
        const stats = await Stats.findOneAndUpdate(
          { name: "asdaasda" },
          { name: "updated" }
        );
        res.status(201).json({ success: true, data: stats });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT":
      try {
        const stats = await Stats.findOneAndUpdate("60a2d812297a9c4830ef578f", {
          visits: 3,
        });
        res.status(201).json({ success: true, data: stats });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
