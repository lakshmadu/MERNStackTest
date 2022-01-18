import mongoose from "mongoose";

export default async function databaseSetup() {
    const DB_URL: string | undefined = process.env.MONGOOSE_URI;

    if (DB_URL) {
        await mongoose.connect(DB_URL).then(() => {
            console.log('Successfully connect with DB');
        }).catch((err) => {
            console.log(`Failed connect with DB : ${err}`);
        });
    }
}
