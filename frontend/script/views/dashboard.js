import abstractView from "./abstractView.js";

export default class extends abstractView {
  constructor(params) {
    super(params);
    this.setTitle("Dashboard");
  }

  async getHtml() {
    return `
      <p>Hello abstract</p>
    `;
  }
}
