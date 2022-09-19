import mongoose from "mongoose";
import "dotenv/config";

function mongoDBConnection(URL?: string): void {
  const dbURL: string = URL || process.env.DB_URI || "mongodb://localhost:27017";
  mongoose.connect(dbURL, (err) => {
    if (err) {
      console.error(err);
    }
  })
};

export default mongoDBConnection;
