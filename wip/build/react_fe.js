var Hexagon = React.createClass({
  displayName: "Hexagon",

  render: function () {
    return React.createElement(
      "div",
      { "class": "hex" },
      React.createElement("div", { "class": "left" }),
      React.createElement("div", { "class": "middle" }),
      React.createElement("div", { "class": "middle middle-shade" }),
      React.createElement("div", { "class": "right" })
    );
  }
});