import React from 'react';
import { shallow, configure } from "enzyme";

import App from "../pages/Home/index";


configure({adapter: new Adapter()});
describe("With Enzyme", () => {
  it('App render correctly', () => {
    const app = shallow(<App />);
    expect(app.find("p").text()).toEqual("a");
  });
});