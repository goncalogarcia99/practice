// String Interpolation
const str: string = "world";
console.log(`hello ${str}`);

// Promises
new Promise<string>((resolve, reject) => {
  setTimeout(() => {
    resolve("done");
  }, 1000);
});
function func(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    reject(); // Same as "throw undefined"
  });
}
(async () => {
  try {
    await func();
  } catch (err: unknown) {
    console.log(`e: ${err}`); // err: undefined
  }
})();

// const of
const arr: number[] = [1, 2, 3];
for (const num of arr) {
  console.log(num);
}

// break, continue
for (let i = 0; i < 10; i++) {
  if (i === 2) {
    continue; // Skip the rest of the loop
  }
  if (i === 5) {
    break; // Exit the loop
  }
  console.log(i); // 0, 1, 3, 4
}

// Destructuring
const obj = { x: 1, y: 2 };
const { x, y } = obj;
console.log(x, y); // 1 2

// Array.sort(), Array.push()
const numbers: number[] = [3, 1, 4];
numbers.sort(); // [1, 3, 4]
numbers.push(2); // [1, 3, 4, 2]
const words: string[] = ["banana", "apple", "cherry"];
words.sort(); // ["apple", "banana", "cherry"]
words.push("date"); // ["apple", "banana", "cherry", "date"]

// /, %
console.log(10 / 3); // 3.3333333333333335
console.log(10 % 3); // 1

// Spread operator (…)
const arr1: number[] = [1, 2];
const arr2: number[] = [3, 4];
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4]
