import { newE2EPage } from "@stencil/core/testing";

describe("number-counter", () => {
	it("renders", async () => {
		const page = await newE2EPage();
		await page.setContent("<number-counter></number-counter>");

		const element = await page.find("number-counter");
		expect(element).toHaveClass("hydrated");
	});

	it("increments the count", async () => {
		const page = await newE2EPage();
		await page.setContent("<number-counter></number-counter>");

		const element = await page.find("number-counter");
		expect(element).toHaveClass("hydrated");

		const button = await page.find(
			"number-counter >>> button[data-testid='increment']",
		);
		await button.click();
		await page.waitForChanges();

		const count = await page.find("number-counter >>> p[data-testid='count']");
		expect(count.textContent).toBe("1");
	});

	it("decrements the count", async () => {
		const page = await newE2EPage();
		await page.setContent("<number-counter></number-counter>");

		const element = await page.find("number-counter");
		expect(element).toHaveClass("hydrated");

		const button = await page.find(
			"number-counter >>> button[data-testid='decrement']",
		);

		await button.click();
		await page.waitForChanges();

		const count = await page.find("number-counter >>> p[data-testid='count']");
		expect(count.textContent).toBe("-1");
	});

	it("resets the count", async () => {
		const page = await newE2EPage();
		await page.setContent("<number-counter></number-counter>");

		const element = await page.find("number-counter");
		expect(element).toHaveClass("hydrated");

		const button = await page.find(
			"number-counter >>> button[data-testid='reset']",
		);
		await button.click();
		await page.waitForChanges();

		const count = await page.find("number-counter >>> p[data-testid='count']");
		expect(count.textContent).toBe("0");
	});
});
