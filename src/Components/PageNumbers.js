import React from 'react'

const PageNumbers = ({totalPages, currentPage, maxRecordsPerPage}) => {
    return (
        <p>
            {` ${currentPage} - ${currentPage + maxRecordsPerPage - 1} of ${totalPages}`}
        </p>
    )
}

export default PageNumbers
