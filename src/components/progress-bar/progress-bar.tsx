import {
	Component,
	Event,
	type EventEmitter,
	Host,
	h,
	State,
	Watch,
} from "@stencil/core";

@Component({
	tag: "progress-bar",
	styleUrl: "progress-bar.css",
	shadow: true,
})
export class ProgressBar {
	@State() progress: number = 0;
	private progressInterval?: number;

	@Event() progressMax: EventEmitter<void>;

	@Watch("progress")
	onProgressChange(newProgress: number) {
		if (newProgress >= 100) {
			this.progressMax.emit();
			console.log("progress max");
			clearInterval(this.progressInterval);
		}
	}

	componentDidLoad() {
		this.progressInterval = window.setInterval(() => {
			this.progress += 1;
		}, 100);
	}

	disconnectedCallback() {
		if (this.progressInterval) {
			clearInterval(this.progressInterval);
		}
	}

	render() {
		return (
			<Host
				data-value={this.progress}
				data-state={this.progress <= 100 ? "running" : "finished"}
			>
				<div class="progress-bar">
					<div
						class="progress-bar-fill"
						style={{ width: `${this.progress}%` }}
					></div>
				</div>
			</Host>
		);
	}
}
