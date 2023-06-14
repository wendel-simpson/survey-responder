import { chromium } from "playwright";
import { dataProd, dataDev } from "./data/data.js";

const data = [...dataProd];

async function fillSurvey() {
  for (const [index, row] of data.entries()) {
    const liveLink = `https://showcase-sandbox-en.alidainsights.com/c/a/6Zq8GZt8bu5Cpvvg89mRDI?_i=${row.memberId}`;
    const browser = await chromium.launch({ headless: false });

    // Create a new browser context
    const context = await browser.newContext();

    // Create a new page
    const page = await context.newPage();

    await page.goto(liveLink);

    await page.waitForLoadState();

    // Location
    await page.getByRole("radio", { name: row.Location, exact: true }).click();

    // Gender
    await page.getByRole("radio", { name: row.Gender, exact: true }).click();

    // Age
    await page.getByRole("radio", { name: row.Age, exact: true }).click();

    // Height
    await page.getByRole("radio", { name: row.Height, exact: true }).click();

    // Size
    await page.getByRole("radio", { name: row.Size, exact: true }).click();

    // Clothing Style
    await page
      .getByRole("radio", { name: row["Clothing Style"], exact: true })
      .click();

    // Number of Items Purchased
    await page.getByPlaceholder("Number").click();
    await page
      .getByPlaceholder("Number")
      .fill(row["Number of Items Purchased"]);

    // Variety and Selection of Sizes (NPS)
    await page
      .getByRole("group", {
        name: "* How likely are you to recommend T-AI-lored?",
      })
      .getByRole("button", {
        name: row["Likelihood to Recommend"],
        exact: true,
      })
      .click();

    // Satisfaction (NPS)
    await page
      .getByRole("group", {
        name: "* How satisfied are you with your experience?",
      })
      .getByRole("button", { name: row.Satisfaction, exact: true })
      .click();

    // Overall Experience (NPS)
    await page
      .getByRole("group", {
        name: "* How would you rate our variety of selection and sizes?",
      })
      .getByRole("button", {
        name: row["Variety and Selection of Sizes"],
        exact: true,
      })
      .click();

    // Long Answer
    await page.getByPlaceholder("Your response").click();
    await page
      .getByPlaceholder("Your response")
      .fill(row["Overall Experience"]);

    // tab to enable the submit button
    await page.keyboard.press("Tab");

    // Select and click the submit button
    const submitButton = await page.$(`button[type="submit"]`);

    await submitButton.click();

    console.log(
      `Done answering the survey for memberId: ${
        row.memberId
      }, this is survey number ${index + 1}`
    );

    await context.close();
    await browser.close();
  }
}

fillSurvey();
