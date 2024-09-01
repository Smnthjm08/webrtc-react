// Objects
const user1 = {
  name: "Smnthjm08",
  age: 21,
  gender: "male",
};

// 1. greet user
function greetUser(user) {
  const greet = `Hello ${user.name}, ${user.age}.`;
  console.log(greet);
}
greetUser(user1);

// 2. greet based on gender
function greet(user) {
  let greetBy = "Others";
  if (user.gender === "male") {
    greetBy = "Mr.";
  } else if (user.gender === "female") {
    greetBy = "Mrs.";
  }
  const greetMessage = `Hi ${greetBy} ${user.name}, your age is ${user.age}.`;
  console.log(greetMessage);
}
greet(user1);

// 3. tell user if they are allowed to vote
function checkEligibility(user) {
  if (user.age >= 18) {
    console.log(`Hi ${user.name}, you are eligible to vote.`);
  } else {
    console.log(`Hi ${user.name}, you are not eligible to vote.`);
  }
}
checkEligibility(user1);

// Arrays

// 1. Returns a new array with only even values
let array1 = [1, 2, 3, 4, 5, 6, 7, 8];

function evenArray(arr) {
  const newArray = arr.filter((item) => item % 2 === 0);
  console.log(newArray);
}
evenArray(array1);

// Complex Objects
const users = [
  {
    name: "Harkirat",
    age: 21,
  },
  {
    name: "Raman",
    age: 22,
  },
];

// Filter 18+
function filterUsers(arr) {
  const filtered = arr.filter((item) => item.age > 18);
  console.log(filtered);
}
filterUsers(users);

// Objects in Objects
const user2 = [
  {
    firstName: "Harkirat",
    age: 19,
    gender: "male",
    address: {
      city: "Delhi",
      country: "India",
      address: "1122 DLF",
    },
  },
];

function checkAgeGender(arr) {
  const filtered = arr.filter(
    (item) => item.age > 18 && item.gender === "male"
  );
  console.log(filtered);
}
checkAgeGender(user2);
