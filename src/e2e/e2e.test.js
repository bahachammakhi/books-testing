import puppeteer from "puppeteer";
import BookListPage from "./pages/BookListPage";
import axios from "axios";

const appUrlBase = "http://localhost:3000";

let browser;
let page;
// beforeEach(() => {
//   const books = [
//     { name: "Refactoring", id: 1, description: "Refactoring" },
//     {
//       name: "Domain-driven design",
//       id: 2,
//       description: "Domain-driven design",
//     },
//     {
//       name: "Building Micro-service",
//       id: 3,
//       description: "Building Micro-service",
//     },
//   ];
//   return books.map((item) =>
//     axios.post("http://localhost:8080/books", item, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//   );
// });
beforeAll(async () => {
  browser = await puppeteer.launch({});
  page = await browser.newPage();
});

describe("Bookish", () => {
  test("Heading", async () => {
    await page.goto(`${appUrlBase}/`);
    const lp = new BookListPage(page);
    const heading = await lp.getHeading();
    expect(heading).toEqual("Bookish");
  });

  test("Book List", async () => {
    await page.goto(`${appUrlBase}/`);
    const listPage = new BookListPage(page);
    const books = await listPage.getBooks();

    expect(books.length).toEqual(3);
    expect(books[0]).toEqual("Refactoring");
    expect(books[1]).toEqual("Domain-driven design");
    expect(books[2]).toEqual("Building Micro-service");
  });
});

test("Goto Book detail page", async () => {
  await page.goto(`${appUrlBase}`);
  await page.waitForSelector("a.view-detail");
  const links = await page.evaluate(() => {
    return [...document.querySelectorAll("a.view-detail")].map((el) =>
      el.getAttribute("href")
    );
  });
  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle2" }),
    page.goto(`${appUrlBase}${links[0]}`),
  ]);

  const url = await page.evaluate("location.href");
  expect(url).toEqual(`${appUrlBase}/books/1`);

  await page.waitForSelector(".description");
  const result = await page.evaluate(() => {
    return document.querySelector(".description").innerText;
  });
  expect(result).toEqual("Refactoring");
});

test("Show books wich name contains keyword", async () => {
  await page.goto(`${appUrlBase}/`);

  page.waitForSelector("input.search");
  page.type("input.search", "design");
  // console.log("value", document.querySelector("input.search").value);
  // await page.screenshot({path:'search-for-design.png'})
  await page.waitForSelector(".book .title");

  const books = await page.evaluate(() => {
    return [...document.querySelectorAll(".book .title")].map(
      (el) => el.innerText
    );
  });

  expect(books.length).toEqual(1);
  expect(books[0]).toEqual("Domain-driven design");
});
// afterEach(() => {
//   return axios
//     .delete("http://localhost:8080/books?_cleanup=true")
//     .catch((err) => err);
// });

afterAll(() => {
  browser.close();
});
