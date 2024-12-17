import inquirer from "inquirer";

export function generatePassword(length, useUpper, useLower, useNumbers, useSymbols) {
  const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*";

  let validChars = "";
  if (useUpper) validChars += upperCase;
  if (useLower) validChars += lowerCase;
  if (useNumbers) validChars += numbers;
  if (useSymbols) validChars += symbols;

  if (!validChars) {
    console.error("Bạn phải chọn ít nhất một tùy chọn để tạo mật khẩu!");
    process.exit(1);
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * validChars.length);
    password += validChars[randomIndex];
  }
  return password;
}

export async function Option() {
  const answers = await inquirer.prompt([
    {
      name: "length",
      type: "input",
      message: "Độ dài mật khẩu bạn muốn là bao nhiêu?",
      validate: (input) => {
        const parsed = parseInt(input, 10);
        return parsed > 0 ? true : "Độ dài phải là số lớn hơn 0!";
      },
    },
    {
      name: "options",
      type: "checkbox",
      message: "Chọn các tùy chọn bao gồm:",
      choices: [
        { name: "Chữ in hoa (A-Z)", value: "upper" },
        { name: "Chữ thường (a-z)", value: "lower" },
        { name: "Số (0-9)", value: "numbers" },
        { name: "Ký tự đặc biệt (!@#$%^&*)", value: "symbols" },
      ],
    },
  ]);

  const length = parseInt(answers.length, 10);
  const useUpper = answers.options.includes("upper");
  const useLower = answers.options.includes("lower");
  const useNumbers = answers.options.includes("numbers");
  const useSymbols = answers.options.includes("symbols");

  const password = generatePassword(length, useUpper, useLower, useNumbers, useSymbols);
  console.log(`\nMật khẩu của bạn: ${password}`);
  // return password;
}
