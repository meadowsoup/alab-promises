// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

// central: database identifies which database the users are stored within
const val = await central(5);
console.log(val); // returns-> db1

// db1, db2. db3: databases contain the user's basic information, including username, website, and company.
const val2 = await db1(4)
console.log(val2);

// val: The personal data for each user is contained within the vault database since its access and usage is restricted by law.
const val3 = await vault(8);
console.log(val3);




async function getUserData(id) {
  if (typeof id !== "number") throw new Error("Invalid Input -- Not a Number");

  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3,
  };
  try {
    const dbName = await central(id);

    const basicInfoPromise = dbs[dbName](id);

    const vaultInfoPromise = vault(id);

    const [basicInfo, vaultInfo] = await Promise.all([basicInfoPromise, vaultInfoPromise]);
  } catch (error) {
    console.log(error)
    error.message = "NO!"
  }
}

getUserData(11)