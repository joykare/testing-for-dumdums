import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import fs from "fs";
import path from "path";
import serailizer from "jest-serializer-enzyme";
import LoveableFilterbleTable from "../LovableFilterableTable";
import { tableSchema } from "../App";

const SAMPLE_RESPONSE_FILE = path.join(__dirname, "../../sample-response.json");

const generateItems = () => {
  const response = fs.readFileSync(SAMPLE_RESPONSE_FILE);
  const json = JSON.parse(response);

  return json.slice(0, 30).map(item => ({
    ...item,
    isLoved: false
  }))
}

expect.addSnapshotSerializer(serailizer);

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
      });
    });
  });

  describe("user entering search query", () => {
    let items;

    beforeEach(() => {
      items = generateItems();
      wrapper = shallow(
        <LoveableFilterbleTable items={items} schema={tableSchema} />
      );

      const searchBox = wrapper.find("input");
      searchBox.simulate("change", {target: {value: "coin"}});
    });

    it("render a subset of matching [items]", () => {
      const matching = items.filter(item => item.name.match(/coin/i));
      const notmatching = items.filter(item => !item.name.match(/coin/i));

      matching.forEach(match => {
        expect(
          wrapper.containsMatchingElement(
            <td>
              {match.name}
            </td>
          )
        ).toBe(true);
      });

      notmatching.forEach(match => {
        expect(
          wrapper.containsMatchingElement(
            <td>
              {match.name}
            </td>
          )
        ).toBe(false);
      });

      expect(wrapper.find("tbody").first().html()).toMatchSnapshot();
    });

    it("should filter items", () => {
      expect(wrapper.find("tbody > tr > .item-name").map(item => item.html())).toMatchSnapshot();
    });

    it("should filter items <with serializer>", () => {
      expect(wrapper.find("tbody")).toMatchSnapshot();
    });

    describe("users clears search query", () => {
      beforeEach(() => {
        const searchBox = wrapper.find("input");
        searchBox.simulate("change", {target: {value: ""}});
      });

      it("should render all [items] again", () => {
        expect(wrapper.find("tbody > tr").length).toEqual(items.length);
      });
    });
  });

  // Not too awesome better to test against user behaviour/interaction/expectations
  // describe("user entering search query <simulating vs setState()>", () => {
  //   let items;

  //   beforeEach(() => {
  //     items = generateItems();
  //     wrapper = shallow(<LoveableFilterbleTable items={items} schema={tableSchema} />);

  //     wrapper.instance().updateFilter("coin", items); //instance returns JS instance of the component so we can access the JS function directly
  //     wrapper.update();
  //   });

  //   it("should update state", () => {
  //     expect(wrapper.state("matches").map(match => match.name)).toMatchSnapshot();
  //   });
  // });
});