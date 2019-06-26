import React from "react";
import Nav, {
  AkContainerTitle,
  AkCreateDrawer,
  AkNavigationItem,
  AkSearchDrawer
} from "@atlaskit/navigation";
import SearchIcon from "@atlaskit/icon/glyph/search";
import CreateIcon from "@atlaskit/icon/glyph/add";
import AtlassianIcon from "@atlaskit/icon/glyph/atlassian";
import ArrowleftIcon from "@atlaskit/icon/glyph/arrow-left";

import CreateDrawer from "../components/CreateDrawer";
import SearchDrawer from "../components/SearchDrawer";
import HelpDropdownMenu from "../components/HelpDropdownMenu";
import atlaskitLogo from "../images/minion.png";

export default class StarterNavigation extends React.Component {
  shouldComponentUpdate() {
    return true;
  }
  state = {
    openDrawer: ""
  };
  openDrawer = openDrawer => {
    this.setState({ openDrawer });
  };

  render() {
    const backIcon = <ArrowleftIcon label="Back icon" size="medium" />;
    const globalPrimaryIcon = (
      <AtlassianIcon label="Atlassian icon" size="xlarge" />
    );
    console.log(this.props.results);
    return (
      <Nav
        isOpen={true}
        width={304}
        containerHeaderComponent={() => (
          <AkContainerTitle
            href="#"
            icon={<img alt="atlaskit logo" height={300} src={atlaskitLogo} />}
            text="Minion"
          />
        )}
        globalPrimaryIcon={globalPrimaryIcon}
        globalSearchIcon={<SearchIcon label="Search icon" />}
        hasBlanket
        isResizable={false}
        isCollapsible={false}
        drawers={[
          <AkSearchDrawer
            backIcon={backIcon}
            isOpen={this.state.openDrawer === "search"}
            key="search"
            onBackButton={() => this.openDrawer(null)}
            primaryIcon={globalPrimaryIcon}
          >
            <SearchDrawer
              onResultClicked={() => this.openDrawer(null)}
              onSearchInputRef={ref => {
                this.searchInputRef = ref;
              }}
              results={this.props.results}
            />
          </AkSearchDrawer>,
          <AkCreateDrawer
            backIcon={backIcon}
            isOpen={this.state.openDrawer === "create"}
            key="create"
            onBackButton={() => this.openDrawer(null)}
            primaryIcon={globalPrimaryIcon}
          >
            <CreateDrawer onItemClicked={() => this.openDrawer(null)} />
          </AkCreateDrawer>
        ]}
        globalCreateIcon={<CreateIcon label="Create icon" />}
        globalHelpItem={HelpDropdownMenu}
        onSearchDrawerOpen={() => this.openDrawer("search")}
        onCreateDrawerOpen={() => this.openDrawer("create")}
      >
        {this.props.navLinks.map(link => {
          const { url, name, id } = link;
          return (
            <a key={url} href={url.trim().replace(/[ /]/gi, "-")}>
              <AkNavigationItem
                text={name}
                isSelected={this.props.activeId === id}
              />
            </a>
          );
        }, this)}
      </Nav>
    );
  }
}
