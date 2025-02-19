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
  try {
  if (typeof id !== "number" || id < 1 || id > 10) {
    throw new Error("Invalid ID")
  };

  const dbName = await central(id);

  const dbs = {db1, db2, db3};

  const [basicInfo, vaultInfo] = await Promise.all([
    dbs[dbName](id),
    vault(id),
  ]);

  // const dbs = {
  //   db1: db1,
  //   db2: db2,
  //   db3: db3,
  // };
  // try {
  //   const dbName = await central(id);

  //   const basicInfoPromise = dbs[dbName](id);

  //   const vaultInfoPromise = vault(id);

  //   const [basicInfo, vaultInfo] = await Promise.all([basicInfoPromise, vaultInfoPromise]);

    return {
      id,
      name: vaultInfo.name,
      username: basicInfo.username,
      email: vaultInfo.email,
      address: vaultInfo.address,
      phone: vaultInfo.phone,
      website: basicInfo.website,
      company: basicInfo.company,
    };
  } catch (error) {
    return Promise.reject(new Error(`Error fetching: ${error.message}`))
  }
}

getUserData(3)
.then(user => console.log("User Data (ID 3):", user))
.catch(error => console.error("Error:", error.message));

getUserData(11)
.then(user => console.log("User Data (ID 11):", user))
.catch(error => console.error("Error:", error.message));

getUserData("not a number")
.then(user => console.log("User Data:", user))
.catch(error => console.error("Error:", error.message));