import { newSpecPage } from "@stencil/core/testing";
import { ProgressBar } from "../progress-bar";

describe("progress-bar", () => {
	it("renders", async () => {
		const page = await newSpecPage({
			components: [ProgressBar],
			html: `<progress-bar></progress-bar>`,
		});
		expect(page.root).toEqualHtml(`
      <progress-bar data-value="0" data-state="running">
        <mock:shadow-root>
          <div class="progress-bar">
            <div class="progress-bar-fill" style="width: 0%;"></div>
          </div>
        </mock:shadow-root>
      </progress-bar>
    `);
	});
});
