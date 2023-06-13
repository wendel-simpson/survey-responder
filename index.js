const puppeteer = require("puppeteer");

async function answerModernSingleChoice(responsePage, row) {
  await responsePage.waitForSelector('div[role="radio"]');
  const choices = await responsePage.$$('div[role="radio"]');
  await choices[row].click();
}

async function answerModernLongAnswer(responsePage, text) {
  await responsePage.waitForSelector('textarea[data-testid="inputfield"]');
  await responsePage.type('textarea[data-testid="inputfield"]', text);
}

async function clickModernNextPage(responsePage) {
  await Promise.all([
    responsePage.waitForSelector("#Next"),
    responsePage.click("#Next"),
    responsePage.waitForSelector("h1"),
  ]);
}

async function fillSurvey() {
  // Launch Puppeteer
  const browser = await puppeteer.launch();

  const memberId = "beabe2b7-9035-4098-82be-a98a0158293c"; // replace this with your member id
  const liveLink = `https://riverdale.van.sit1.vcilabs.com/c/a/5q1ZEkJdLkDK1av87hJj9?_i=${memberId}}`;

  try {
    const respondingPage = await browser.newPage();

    console.log("Going to the survey link...", respondingPage, liveLink);

    await respondingPage.goto(liveLink);
    await respondingPage.bringToFront();

    respondingPage;

    await answerModernSingleChoice(respondingPage, 0); // answer the first question with the first choice
    await answerModernSingleChoice(respondingPage, 2); // answer the second question with the first choice
    await answerModernLongAnswer(respondingPage, "This is a long answer :)"); // answer the third question with a long answer

    await clickModernNextPage(respondingPage); // click the next page button

    respondingPage.close();

    console.log("Done answering the survey!");
  } catch (error) {
    console.error("Error occurred:", error);
  } finally {
    // Close the browser
    await browser.close();
  }
}

fillSurvey();
