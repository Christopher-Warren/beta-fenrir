import dbConnect from "../../../../utils/dbConnect";
import Stats from "../../../../models/Stats";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const stats = await Stats.findById("60a2d812297a9c4830ef578f");

        const updatedStats = await Stats.findOneAndUpdate(
          "60a2d812297a9c4830ef578f",
          {
            bossesKilled: stats.bossesKilled + 1,
          }
        );
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
