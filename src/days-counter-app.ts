import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import './components/line-item.js';


@customElement('days-counter-app')
export class DaysCounterApp extends LitElement {
  @property({ type: Number }) workingDaysOfMonth = 21;

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

  render() {
    return html`
      <main>
        <h1>Counting workdays</h1>
        <div><line-item workingDaysOfMonth=${this.workingDaysOfMonth} ></div>

        <div>Total Working Days: ${this.workingDaysOfMonth}</div>

      </main>

      <p class="app-footer">
        🚽 Made with love by
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
