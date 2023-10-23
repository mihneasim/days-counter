import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { nameGenerator } from '../services/fictional-names';

@customElement('line-item')
export class LineItem extends LitElement {
  @property({ type: Number }) workingDaysOfMonth = 21;

  @property({ type: Number }) daysOff = 0;

  static styles = css`
    :host {
      min-height: 100vh;
    }
  `;

  onChange(ev: Event) {
    this.daysOff = parseFloat((ev.target as HTMLInputElement).value);
  }

  render() {
    return html`
      <input
        type="text"
        name="lineName"
        placeholder=${nameGenerator.generate().getName()}
      />
      <input
        type="number"
        step="0.5"
        .value="${this.daysOff}"
        @input=${this.onChange}
      />
      Result: ${this.workingDaysOfMonth - this.daysOff} Working Days
    `;
  }
}
