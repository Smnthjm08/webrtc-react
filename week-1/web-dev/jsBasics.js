//functions

// 1. sum of 2 numbers
function sum(num1, num2) {
  const sum = num1 + num2;
  console.log("The sum is " + sum);
}
sum(2, 5);

//2. canVote
function canVote(age) {
  if (age >= 18) {
    console.log("You eligible to vote!");
  } else {
    console.log("Please grow-up! xD");
  }
}
canVote(18);

//3. odd/even
function checkEven(num) {
  if (num % 2 !== 0) {
    console.log("Odd Number!");
  } else {
    console.log("Even Number");
  }
}
checkEven(17);

//4. find sum for n range
function sum(num) {
  let result = 0;
  for (let i = 1; i <= num; i++) {
    result += i;
  }
  console.log(result);
}
sum(24);
