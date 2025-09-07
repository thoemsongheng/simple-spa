import abstractView from "../abstractView.js";

export default class extends abstractView {
  constructor(params) {
    super(params);
    this.setTitle("Home");
  }

  async getHtml() {
    const response = await fetch("/static/render/Home/index.html");
    return await response.text();
  }
}
