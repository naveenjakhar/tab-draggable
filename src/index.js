import React, { Component } from "react";
import Tabs from "react-draggable-tabs";
import ReactDOM from "react-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.moveTab = this.moveTab.bind(this);
    this.selectTab = this.selectTab.bind(this);
    this.closedTab = this.closedTab.bind(this);
    this.addTab = this.addTab.bind(this);
    this.state = {
      tabs: [
        {
          id: 1,
          content: "Tab 1",
          active: true,
          display: (
            <h1>This Is Tab one</h1>
          )
        },
        {
          id: 2,
          content: (
            <span>
              <i className="fa fa-paw" aria-hidden="true" /> Tab 2
            </span>
          ),
          display: (
            <h1>This Is Tab Two</h1>
          )
        },
        {
          id: 3,
          content: "Tab 3",
          display: (
            <h1>This Is Tab Three</h1>
          )
        }
      ]
    };
  }

  moveTab(dragIndex, hoverIndex) {
    this.setState((state, props) => {
      let newTabs = [...state.tabs]
      newTabs.splice(hoverIndex, 0, newTabs.splice(dragIndex, 1)[0]);

      return { tabs: newTabs };
    });
  }

  selectTab(selectedIndex, selectedID) {
    this.setState((state, props) => {
      const newTabs = state.tabs.map(tab => ({
        ...tab,
        active: tab.id === selectedID
      }));
      return { tabs: newTabs };
    });
  }

  closedTab(removedIndex, removedID) {
    this.setState((state, props) => {
      let newTabs = [...state.tabs];
      newTabs.splice(removedIndex, 1);

      if (state.tabs[removedIndex].active && newTabs.length !== 0) {
        
        const newActive = removedIndex === 0 ? 0 : removedIndex - 1;
        newTabs[newActive].active = true;
      }

      return { tabs: newTabs };
    });
  }

  addTab() {
    this.setState((state, props) => {
      let newTabs = [...state.tabs];
      newTabs.push({
        id: newTabs.length + 1,
        content: `Tab ${newTabs.length + 1}`,
        display: <h1 key={newTabs.length + 1}>This Is Tab  {newTabs.length + 1}</h1>
      });

      return { tabs: newTabs };
    });
  }
  
  render() {
    const activeTab = this.state.tabs.filter(tab => tab.active === true);
    return (
      <div>
        <Tabs
          moveTab={this.moveTab}
          selectTab={this.selectTab}
          closeTab={this.closedTab}
          tabs={this.state.tabs}
        >
          <button onClick={this.addTab}>+</button>
        </Tabs>
        {activeTab.length !== 0 ? activeTab[0].display : "You Don't have any tab click on (+) "}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
