import React from 'react'

const PageNumbers = ({totalRecords, currentPage, maxRecordsPerPage}) => {
    console.log()
    return (
        <p>
            {` ${((currentPage - 1) * maxRecordsPerPage) + 1} - ${currentPage * maxRecordsPerPage } of ${totalRecords}`}
        </p>
    )
}

export default PageNumbers
