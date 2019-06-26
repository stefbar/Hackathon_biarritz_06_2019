import React from "react";
import styled from "@emotion/styled";
import { Checkbox } from "@atlaskit/checkbox";

const Card = props => (
  <div className={props.className} key={props.id}>
    {props.children}
  </div>
);
const StyledCard = styled(Card)`
  text-align: left;
  margin: 8px 0;
  background: #f1f3f5;
  box-shadow: 0 1px 1px 0 #d6d6d0;
  padding: 8px;
`;

const List = props => (
  <div className={props.className} key={props.id}>
    {props.children}
  </div>
);

const StyledList = styled(List)`
  position: static;
  text-align: center;
  margin: 16px 16px;
  display: flex;
  flex-flow: column nowrap;
  background: #f8f9fa;
  color: #495057;
  padding: 16px;
  min-width: 20%;
  height: 100%;
  box-sizing: content-box; /* So the width will be 100% + 17px */
  & > p {
    margin-top: 40px;
  }
  overflow: scroll;
`;

class BoardImpl extends React.Component {
  state = {
    board: this.props.board
  };
  onChange = ({ type, id, cardIndex, listIndex, checkIt }) => {
    const { board } = this.state;

    const newBoard = board;
    if (type === "list") {
      newBoard.lists[listIndex].isChecked = checkIt;
      newBoard.lists[listIndex].numCardsChecked = checkIt
        ? newBoard.lists[listIndex].cards.length
        : 0;
      newBoard.lists[listIndex].cards = newBoard.lists[listIndex].cards.map(
        card => ({
          ...card,
          isChecked: checkIt
        })
      );
    } else if (type === "card") {
      let { numCardsChecked } = newBoard.lists[listIndex];
      newBoard.lists[listIndex].cards[cardIndex].isChecked = checkIt;
      newBoard.lists[listIndex].numCardsChecked = checkIt
        ? ++numCardsChecked
        : --numCardsChecked;
      newBoard.lists[listIndex].isChecked =
        numCardsChecked === newBoard.lists[listIndex].cards.length
          ? true
          : false;
    } else if (type === "board") {
      newBoard.lists = newBoard.lists.forEach((list, listIndex) => {
        this.onChange({
          type: "list",
          listIndex,
          id: list.id,
          checkIt: true
        });
      });
    }
    this.setState({
      board: newBoard
    });
  };

  render() {
    const { board } = this.state;

    return (
      <section className={this.props.className} id={this.props.id}>
        {board.lists.map((list, listIndex) => (
          <StyledList key={list.id} id={list.id}>
            <h2>{list.name}</h2>
            <p>
              <Checkbox
                isChecked={list.isChecked}
                isIndeterminate={
                  list.numCardsChecked > 0 &&
                  list.numCardsChecked < list.cards.length
                }
                onChange={() => {
                  this.onChange({
                    type: "list",
                    listIndex,
                    id: list.id,
                    checkIt: !list.isChecked
                  });
                }}
                label={`Select all ${list.cards.length} cards`}
                name={list.id}
              />
            </p>
            {list.cards.map((card, cardIndex) => (
              <StyledCard key={card.id} id={card.id}>
                <Checkbox
                  isChecked={card.isChecked}
                  onClick={() => {
                    this.onChange({
                      type: "card",
                      cardIndex,
                      listIndex,
                      checkIt: !card.isChecked
                    });
                  }}
                  label={card.name}
                  value={card.id}
                  name={card.idList}
                />
              </StyledCard>
            ))}
          </StyledList>
        ))}
      </section>
    );
  }
}

export const Board = styled(BoardImpl)`
  margin: 32px -32px 32px 0;
  display: flex;
  box-shadow: 0 10px 6px 0 #777;
  position: relative;
  max-height: 90vh;
  height: 100%;
  width: 120%;
  overflow: auto;
`;
