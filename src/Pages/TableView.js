import React, { useContext, Fragment } from 'react'
import Table from '../Components/Table'
import Search from '../Components/Search'
import Pagination from '../Components/Pagination'
import Loading from '../Components/Loading'
import { UserContext } from '../context'
import RecordNos from '../Components/RecordNos'


const TableView = () => {
    const context = useContext(UserContext)
    let { isMatchedUsers, loading, matchedUsers, columns, users, maxRecordsPerPage, onPageChanged, currentUsers, totalPages, currentPage } = context;



    if (loading) {
        return <Loading />
    }
    else {
        return (
            <Fragment>

                <div className="header-section">
                    <div>
                        <Search />
                    </div>
                    <div>
                        <RecordNos totalRecords={users.length} currentPage={currentPage} maxRecordsPerPage={maxRecordsPerPage} />
                    </div>
                </div>

                <Table columns={columns} users={isMatchedUsers ? matchedUsers : currentUsers} />
                <Pagination totalRecords={users.length} pageLimit={maxRecordsPerPage} pageNeighbours={4} onPageChanged={onPageChanged} />
            
            </Fragment>
        )
    }
}

export default TableView

