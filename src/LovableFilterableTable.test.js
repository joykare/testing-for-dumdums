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

  let wrapper;

  describe("when given empty [items]", () => {
    const items = [];

    beforeEach(() => {
      wrapper = shallow(
        <LoveableFilterbleTable items={items} schema={tableSchema} />
      );
    });

    it("should still render search box", () => {
      expect(wrapper.find("input").exists()).toBe(true);
    });

    it("should have no table rows", () => {
      expect(wrapper.find("tbody > tr").exists()).toBe(false);
    });
  });
})