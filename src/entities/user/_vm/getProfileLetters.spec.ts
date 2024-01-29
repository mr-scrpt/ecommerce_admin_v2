import { getProfileLetters } from "./getProfileLetters";

describe("get profile letters", () => {
  test("should split by .", () => {
    const res = getProfileLetters({
      email: "mail.test@gmail.com",
    });

    expect(res).toEqual("MT");
  });

  test("should split by -", () => {
    const res = getProfileLetters({
      email: "ail.test@gmail.com",
      name: "test-name",
    });

    expect(res).toEqual("TN");
  });

  test("should split by _", () => {
    const res = getProfileLetters({
      email: "ail.test@gmail.com",
      name: "test_name",
    });

    expect(res).toEqual("TN");
  });

  test("should split by space", () => {
    const res = getProfileLetters({
      email: "mail.test@gmail.com",
      name: "Test Name",
    });

    expect(res).toEqual("TN");
  });

  test("should return first 2 letters if no separator", () => {
    const res = getProfileLetters({
      email: "mail.test@gmail.com",
      name: "TestName",
    });

    expect(res).toEqual("TE");
  });

  test("should return first 2 letters if no separator email", () => {
    const res = getProfileLetters({
      email: "admin@gmail.com",
    });

    expect(res).toEqual("AD");
  });
  test("should return email if empty username", () => {
    const res = getProfileLetters({
      email: "admin@gmail.com",
      name: "",
    });

    expect(res).toEqual("AD");
  });

  test("should work with short names", () => {
    const res = getProfileLetters({
      email: "admin@gmail.com",
      name: "E",
    });

    expect(res).toEqual("E");
  });
});
