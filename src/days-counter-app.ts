import { LitElement, html, css, PropertyValueMap } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import './components/line-item.js';

import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';

import { monthsData } from './services/months.js';

// import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/select/select.js';
import '@shoelace-style/shoelace/dist/components/option/option.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';

// Set the base path to the folder you copied Shoelace's assets to
setBasePath('/shoelace');

@customElement('days-counter-app')
export class DaysCounterApp extends LitElement {
  @property({ type: Number }) workingDaysOfMonth = 21;

  @property({ type: Array }) persons = [{}];

  defaultMonthValue: number;

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

  constructor() {
    super();
    const today = new Date();
    let targetMonth: number;
    let targetYear: number;
    if (today.getMonth() === 0) {
      targetYear = today.getFullYear() - 1;
      targetMonth = 11;
    } else {
      targetYear = today.getFullYear();
      targetMonth = today.getMonth() - 1;
    }

    const initialMonth = monthsData
      .map((x, indx) => ({ value: x, position: indx }))
      .find(
        x =>
          x.value.monthIndex === targetMonth && x.value.fullYear === targetYear
      ) || { value: monthsData[0], position: 0 };
    this.workingDaysOfMonth = initialMonth.value.workingDays;
    this.defaultMonthValue = initialMonth.position;
  }

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
          <sl-select
            @sl-change=${this.onMonthChange}
            .value="${String(this.defaultMonthValue)}"
          >
            ${monthsData.map(
              (x, ind) =>
                html`<sl-option .value=${String(ind)}>${x}</sl-option>`
            )}
          </sl-select>
        </div>

        <div>
          ${this.persons.map(
            () =>
              html`<line-item
                workingDaysOfMonth=${this.workingDaysOfMonth}
              ></line-item>`
          )}
        </div>
        <sl-button class="plus" @click=${this.addLine} @keyup=${this.addLine}
          >Add line</sl-button
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
