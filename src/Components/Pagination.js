import React, { Component } from 'react';
import PropTypes from 'prop-types';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

//range of numbers
const getRange = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
}

class Pagination extends Component {

  constructor(props) {
    super(props);
    const { totalRecords = null, pageLimit = 30, pageNeighbours = 0 } = props;
    this.pageLimit = pageLimit;
    this.totalRecords = totalRecords;
    this.pageNeighbours = Math.max(0, Math.min(pageNeighbours, 2));
    this.totalPages = Math.ceil(this.totalRecords / this.pageLimit);
    this.state = { currentPage: 1 };
  }

  componentDidMount() {
    this.gotoPage(1);
  }



  handleClick = page => evt => {
    evt.preventDefault();
    this.gotoPage(page);
  }

  handleMoveLeft = e => {
    e.preventDefault();
    this.gotoPage(this.state.currentPage - (this.pageNeighbours * 2) - 1);
  }

  handleMoveRight = e => {
    e.preventDefault();
    this.gotoPage(this.state.currentPage + (this.pageNeighbours * 2) + 1);
  }
  gotoPage = page => {
    const { onPageChanged = f => f } = this.props;
    const currentPage = Math.max(0, Math.min(page, this.totalPages));
    const paginationData = {
      currentPage,
      totalPages: this.totalPages,
      pageLimit: this.pageLimit,
      totalRecords: this.totalRecords
    };
    this.setState({ currentPage }, () => onPageChanged(paginationData));
  }

    fetchPageNumbers = () => {

    const totalPages = this.totalPages;
    const currentPage = this.state.currentPage;
    const pageNeighbours = this.pageNeighbours;
     const totalNumbers = (this.pageNeighbours * 2) + 3;
    const totalBlocks = totalNumbers + 2;
    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
      let pages = getRange(startPage, endPage);

      const hiddenLeft = startPage > 2;
      const hiddenRight = (totalPages - endPage) > 1;
      const hiddenPgs = totalNumbers - (pages.length + 1);

      switch (true) {
        //(1) < {5 6} [7] {8 9} (10)
        case (hiddenLeft && !hiddenRight): {
          const extraPages = getRange(startPage - hiddenPgs, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }
        //

        //(1) {2 3} [4] {5 6} > (10)
        case (!hiddenLeft && hiddenRight): {
          const extraPages = getRange(endPage + 1, endPage + hiddenPgs);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        //(1) < {4 5} [6] {7 8} > (10)
        case (hiddenLeft && hiddenRight):
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }

      return [1, ...pages, totalPages];

    }

    return getRange(1, totalPages);

  }

  render() {

    if (!this.totalRecords || this.totalPages === 1) return null;

    const { currentPage } = this.state;
    const pages = this.fetchPageNumbers();

    return (
      
        <nav >
          <ul className="pagination justify-content-center">
            { pages.map((page, index) => {

              if (page === LEFT_PAGE) return (
                <li key={index} className="page-item">
                  <button className="page-link" onClick={this.handleMoveLeft}>
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                  </button>
                </li>
              );

              if (page === RIGHT_PAGE) return (
                <li key={index} className="page-item">
                  <button className="page-link" onClick={this.handleMoveRight}>
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                  </button>
                </li>
              );

              return (
                <li key={index} className={`page-item${ currentPage === page ? ' active' : ''}`}>
                  <button className="page-link"onClick={ this.handleClick(page) }>{ page }</button>
                </li>
              );

            }) }

          </ul>
        </nav>
      
    );

  }
}

Pagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  pageNeighbours: PropTypes.number,
  onPageChanged: PropTypes.func
};

export default Pagination;
