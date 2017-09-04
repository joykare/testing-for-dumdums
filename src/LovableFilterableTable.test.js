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

  describe("when given items", () => {
    const items = [
      { id: 1, name: "Bitcoin" },
      { id: 2, name: "Ethereum" },
      { id: 3, name: "Zcash" }
    ];

    beforeEach(() => {
      wrapper = shallow(
        <LoveableFilterbleTable items={items} schema={tableSchema} />
      );
    });

    it("should render tr elements", () => {
      expect(wrapper.find("tbody > tr").exists()).toBe(true);
    });

    it("should render the approriate number of tr elements", () => {
      expect(wrapper.find("tbody > tr").length).toBe(3);
    });

    it("should include the title of each item", () => {
      items.forEach(item => {
        expect(
          wrapper.containsMatchingElement(
            <td>
              {item.name}
            </td>
          )
        ).toBe(true);
      })
    });
  })
})