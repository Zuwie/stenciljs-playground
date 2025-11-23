import { newSpecPage } from "@stencil/core/testing";
import { NumberCounter } from "../number-counter";

describe("number-counter", () => {
	it("renders", async () => {
		const page = await newSpecPage({
			components: [NumberCounter],
			html: `<number-counter></number-counter>`,
		});
		expect(page.root).toEqualHtml(`
      <number-counter>
        <mock:shadow-root>
          <div class="button-group">
            <button data-testid="increment" type="button">Increment</button>
            <button data-testid="decrement" type="button">Decrement</button>
            <button data-testid="reset" type="button">Reset</button>
          </div>
          <p data-testid="count">0</p>
        </mock:shadow-root>
      </number-counter>
    `);
	});
});
