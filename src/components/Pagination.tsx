import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

const Container = styled.section`
  padding: 15px 0;
  border-bottom: 1px solid lightgrey;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  &:disabled {
    cursor: not-allowed;
  }
`;

class Pagination extends React.Component<any, any> {
  render() {
    const currentPage = Number(this.props.match.params.page);
    const hasPrevious: boolean = currentPage > 1;
    const hasNext: boolean = currentPage < 10;
    return (
      <Container>
        <Button
          disabled={!hasPrevious}
          onClick={() => {
            this.props.onChange(currentPage - 1);
          }}
        >
          {"< Prev"}
        </Button>
        {currentPage} / 10{" "}
        <Button
          disabled={!hasNext}
          onClick={() => {
            this.props.onChange(currentPage + 1);
          }}
        >
          Next >
        </Button>
      </Container>
    );
  }
}

export default withRouter(Pagination);
