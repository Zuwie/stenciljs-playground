import { Component, Fragment, h, Prop, State } from "@stencil/core";

@Component({
	tag: "number-counter",
	styleUrl: "number-counter.css",
	shadow: true,
})
export class NumberCounter {
	@Prop() initialCount: number = 0;
	@State() count: number = this.initialCount;

	increment() {
		this.count++;
	}

	decrement() {
		this.count--;
	}

	reset() {
		this.count = 0;
	}

	render() {
		return (
			<Fragment>
				<div class="button-group">
					<button
						type="button"
						data-testid="increment"
						onClick={() => this.increment()}
					>
						Increment
					</button>
					<button
						type="button"
						data-testid="decrement"
						onClick={() => this.decrement()}
					>
						Decrement
					</button>

					<button
						type="button"
						data-testid="reset"
						onClick={() => this.reset()}
					>
						Reset
					</button>
				</div>

				<p data-testid="count">{this.count}</p>
			</Fragment>
		);
	}
}
