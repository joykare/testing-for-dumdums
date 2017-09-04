import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import LoveableFilterbleTable from "./LovableFilterableTable";
import { tableSchema } from "./App";

describe("LovableFilterableTable", () => {
  it("renders without crashing <smoke test>", () => {
    const items = [];
    const div = document.createElement("div");
    ReactDOM.render(
      <LoveableFilterbleTable
        items={items}
        schema={tableSchema}
      />,
    div);
  });

  it("should still render search box", () => {
    const items = [];
    const wrapper = shallow(
      <LoveableFilterbleTable items={items} schema={tableSchema} />
    );
    expect(wrapper.find("input").exists()).toBe(true);
  })
})