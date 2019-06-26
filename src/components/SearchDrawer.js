import PropTypes from "prop-types";
import React, { Component } from "react";
import SearchResults from "./SearchResults";

export default class SearchDrawer extends Component {
  static propTypes = {
    results: PropTypes.array,
    onResultClicked: PropTypes.func,
    onSearchInputRef: PropTypes.func
  };

  state = {
    searchString: ""
  };

  filterChange = () => {
    this.setState({
      searchString: this.searchInput.value
    });
  };

  searchResults = () => {
    const { searchString } = this.state;
    const { results } = this.props;

    const matchingResults = results.filter(
      c =>
        c.name.toLowerCase().indexOf(searchString.toLowerCase()) >= 0 ||
        c.cards.some(
          card =>
            card.name.toLowerCase().indexOf(searchString.toLowerCase()) >= 0
        ) ||
        c.lists.some(
          list =>
            list.name.toLowerCase().indexOf(searchString.toLowerCase()) >= 0
        )
    );

    return (
      <SearchResults
        matchingResults={matchingResults}
        onResultClicked={() => {
          this.props.onResultClicked();
          this.searchInput.value = "";
          this.filterChange();
        }}
      />
    );
  };

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Search..."
          onKeyUp={this.filterChange}
          ref={el => {
            this.searchInput = el;
            if (this.props.onSearchInputRef) {
              this.props.onSearchInputRef(el);
            }
          }}
          style={{
            border: "none",
            display: "block",
            fontSize: 24,
            fontWeight: 200,
            outline: "none",
            padding: "0 0 0 12px"
          }}
        />
        {this.searchResults()}
      </div>
    );
  }
}
