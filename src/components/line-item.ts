import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { nameGenerator } from '../services/fictional-names.js';

@customElement('line-item')
export class LineItem extends LitElement {
  @property({ type: Number }) workingDaysOfMonth = 21;

  @property({ type: Number }) daysOff = 0;

  static styles = css`
    :host {
      min-height: 100vh;
    }
    .calculus {
      display: flex;
    }
    .result {
      text-align: right;
    }
  `;

  onChange(ev: Event) {
    this.daysOff = parseFloat((ev.target as HTMLInputElement).value);
  }

  render() {
    return html`
      <div class="calculus">
        <sl-input
          type="text"
          name="lineName"
          placeholder=${nameGenerator.generate().getName()}
          pill
        ></sl-input>
        <sl-input
          pill
          type="number"
          step="0.5"
          .value="${String(this.daysOff)}"
          @input=${this.onChange}
        ></sl-input>
      </div>

      <div class="result">
        Result: ${this.workingDaysOfMonth - this.daysOff} Working Days
      </div>
    `;
  }
}
