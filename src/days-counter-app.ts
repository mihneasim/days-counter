import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import './components/line-item.js';
import { monthsData } from './services/months.js';

import '@shoelace-style/shoelace/dist/themes/light.css' assert { type: 'css' };
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/rating/rating.js';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';

// Set the base path to the folder you copied Shoelace's assets to
setBasePath('/shoelace');

// <sl-button>, <sl-icon>, <sl-input>, and <sl-rating> are ready to use!

@customElement('days-counter-app')
export class DaysCounterApp extends LitElement {
  @property({ type: Number }) workingDaysOfMonth = 21;

  @property({ type: Array }) persons = [{}];

  static styles = css`
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: calc(10px + 2vmin);
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      background-color: var(--days-counter-app-background-color);
    }

    main {
      flex-grow: 1;
    }

    .app-footer {
      font-size: calc(12px + 0.5vmin);
      align-items: center;
    }

    .app-footer a {
      margin-left: 5px;
    }
  `;

  onMonthChange(ev: Event) {
    this.workingDaysOfMonth =
      monthsData[
        parseInt((ev.target as HTMLInputElement).value, 10)
      ].workingDays;
  }

  addLine() {
    this.persons = [...this.persons, {}];
  }

  render() {
    return html`
      <main>
        <h1>Counting workdays</h1>

        <div>
          <select @change=${this.onMonthChange}>
            ${monthsData.map(
              (x, ind) => html`<option .value=${String(ind)}>${x}</option>`
            )}
          </select>
        </div>

        <div>
          ${this.persons.map(
            () =>
              html`<line-item
                workingDaysOfMonth=${this.workingDaysOfMonth}
              ></line-item>`
          )}
        </div>
        <span class="plus" @click=${this.addLine} @keyup=${this.addLine}
          >Add line</span
        >
      </main>

      <p class="app-footer">
        <sl-icon name="7-square"></sl-icon>

        🦔 Created using
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/open-wc"
          >open-wc</a
        >.
      </p>
    `;
  }
}
