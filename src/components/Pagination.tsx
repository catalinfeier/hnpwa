import React, { FC } from "react";
import { inject, observer } from "mobx-react";
import { withRouter, matchPath } from "react-router-dom";

class Pagination extends React.Component<any, any> {
  render() {
    const currentPage = Number(this.props.match.params.page);
    const hasPrevious: boolean = currentPage > 1;
    const hasNext: boolean = currentPage < 10;
    return (
      <div>
        <button
          disabled={!hasPrevious}
          onClick={() => {
            this.props.onChange(currentPage - 1);
          }}
        >
          {"<"}
        </button>
        {currentPage} / 10 <button disabled={!hasNext}
        onClick={() => {
          this.props.onChange(currentPage + 1);
        }}
        >></button>
      </div>
    );
  }
}

export default withRouter(Pagination);
