import mongoose from "mongoose";
import app from "./app.js";

const PORT = 8800;

mongoose.set("strictQuery", true);

mongoose
	.connect(
		`mongodb+srv://tahyirr:${process.env.DATABASE_PASSWORD}@apps.eztjz4a.mongodb.net/fiver`,
		{
			autoIndex: true,
			autoCreate: true,
			dbName: "fiver",
		}
	)
	.then((con) => {
		console.log(con.connection.readyState);
	});

app.listen(PORT, () => {
	console.log(`Listening to server on port ${PORT}`);
});
