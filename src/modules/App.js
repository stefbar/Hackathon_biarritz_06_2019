import PropTypes from "prop-types";
import React, { Component } from "react";
import Flag, { FlagGroup } from "@atlaskit/flag";
import Modal from "@atlaskit/modal-dialog";
import Page from "@atlaskit/page";
import "@atlaskit/css-reset";
import axios from "axios";

import StarterNavigation from "../components/StarterNavigation";
import { Board } from "../components/Board";
import ContentWrapper from "../components/ContentWrapper";
const getBoardLink = id =>
  `https://api.trello.com/1/boards/${id}?actions=none&boardStars=none&cards=visible&card_pluginData=false&checklists=none&customFields=false&fields=name&labels=none&lists=open&members=none&memberships=none&membersInvited=none&membersInvited_fields=none&pluginData=false&organization=false&organization_pluginData=false&myPrefs=false&tags=false%27,&key=f2630fd595d26282413189669b232d7e&token=fc8f07ea56d59149961df072326d559175c77fddb22ec2bb39d190bd96d4c844&card_fields=name,pos,idList&list_fields=name,pos`;

export default class App extends Component {
  async componentDidMount() {
    let response = await axios.all([
      axios.get(getBoardLink("puz1Y7SH")),
      axios.get(getBoardLink("Q8QmjZRM")),
      axios.get(getBoardLink("r7R0FlvS")),
      axios.get(getBoardLink("Ksfkrm5X")),
      axios.get(getBoardLink("BIWTUmyi"))
    ]);
    const boards = response.map(res => {
      const { id, name, cards, lists } = res.data;
      return {
        id,
        name,
        lists: lists.map(list => {
          const { id, name, pos } = list;
          let listCards = cards
            .filter(card => card.idList === id)
            .map(card => ({
              id: card.id,
              name: card.name,
              pos: card.pos,
              isChecked: false
            }));
          return {
            id,
            name,
            pos,
            isChecked: false,
            numCardsChecked: 0,
            cards: listCards
          };
        })
      };
    });

    this.setState({ boards });
  }

  state = {
    activeId: "#",
    flags: [],
    isModalOpen: false,
    isDrawerOpen: false,
    boards: []
  };

  static childContextTypes = {
    showDrawer: PropTypes.func,
    showModal: PropTypes.func,
    addFlag: PropTypes.func
  };

  getChildContext() {
    return {
      showDrawer: this.showDrawer,
      showModal: this.showModal,
      addFlag: this.addFlag
    };
  }

  setActiveId = id => {
    this.setState({ activeId: id });
  };

  showModal = () => {
    this.setState({ isModalOpen: true });
  };

  showDrawer = () => {
    this.setState({ isDrawerOpen: true });
  };

  hideModal = () => {
    this.setState({ isModalOpen: false });
  };

  addFlag = () => {
    this.setState({ flags: [{ id: Date.now() }].concat(this.state.flags) });
  };

  onFlagDismissed = dismissedFlagId => {
    this.setState({
      flags: this.state.flags.filter(flag => flag.id !== dismissedFlagId)
    });
  };

  render() {
    return (
      <div>
        <Page
          navigationWidth={304}
          navigation={
            <StarterNavigation
              navLinks={this.state.boards.map(board => {
                const { id, name } = board;
                return {
                  id,
                  name,
                  url: `#${name}`
                };
              })}
              activeId={this.state.activeId}
              results={this.state.boards}
            />
          }
        >
          <ContentWrapper>
            {this.state.boards.map(board => (
              <React.Fragment key={board.id}>
                <h1 id={`${board.name.trim().replace(/[ /]/gi, "-")}`}>
                  {board.name}
                </h1>
                <Board board={board} />
              </React.Fragment>
            ))}
          </ContentWrapper>
        </Page>
        <div>
          <FlagGroup onDismissed={this.onFlagDismissed}>
            {this.state.flags.map(flag => (
              <Flag
                id={flag.id}
                key={flag.id}
                title="Flag Title"
                description="Flag description"
              />
            ))}
          </FlagGroup>
          {this.state.isModalOpen && (
            <Modal
              style={{ textAlign: "center" }}
              height={500}
              heading="How Minion works"
              actions={[
                { text: "Take me to the magic", onClick: this.hideModal }
              ]}
              onClose={this.hideModal}
            >
              <p>
                Minion is a sourcing tool to help you easily and quickly create
                diverse boolean strings
              </p>
              <h3>How it Works</h3>
              <ol>
                <li>Explore diversity catgories in the navigation</li>
                <li>Select the diversity trms you are interested in</li>
                <li>
                  Specify some candidate terms or just copy the boolean string
                  and help grow our team.
                </li>
              </ol>
            </Modal>
          )}
        </div>
      </div>
    );
  }
}
