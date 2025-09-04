import { expect, test } from "bun:test";

const Fmt = {
  string(input: string, format: string): string {
    const formatCharPattern = /[a-zA-Z0-9]/;
    const result: string[] = [];
    let inputIndex = 0;
    for (const formatChar of format.split("")) {
      if (inputIndex >= input.length) {
        break;
      }
      if (formatChar.match(formatCharPattern)) {
        const inputChar = input[inputIndex];
        result.push(inputChar);
        inputIndex += 1;
      } else {
        result.push(formatChar);
      }
    }
    if (inputIndex < input.length) {
      result.push(input.slice(inputIndex));
    }
    return result.join("");
  },
};

test("bic", () => {
  const format = "BBBB CC LL bbb";
  const result = Fmt.string("DEUTDEFF500", format);
  expect(result).toBe("DEUT DE FF 500");
});

test("bic 2", () => {
  const format = "BBBB CC LL bbb";
  const result = Fmt.string("BELADEBE", format);
  expect(result).toBe("BELA DE BE");
});

test("iban", () => {
  const format = "1234 5678 9012 3456 7890 1234 5678 9012 34";
  const result = Fmt.string("DE75512108001245126199", format);
  expect(result).toBe("DE75 5121 0800 1245 1261 99");
});

test("iban 2", () => {
  const format = "1234 5678 9012 3456 7890 1234 5678 9012 34";
  const result = Fmt.string("NO8330001234567", format);
  expect(result).toBe("NO83 3000 1234 567");
});

test("blz", () => {
  const format = "123 123 12";
  const result = Fmt.string("12345678", format);
  expect(result).toBe("123 456 78");
});

test("blz 2", () => {
  const format = "123 123 12";
  const result = Fmt.string("12345", format);
  expect(result).toBe("123 45");
});

test("blz 3", () => {
  const format = "123 123 12";
  const result = Fmt.string("1234567890", format);
  expect(result).toBe("123 456 7890");
});
