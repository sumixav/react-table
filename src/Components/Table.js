import React, { useState } from 'react'
import styled from "styled-components";
import { FaSort } from 'react-icons/fa';
import { rgba } from "polished";
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';


const Main = styled.div`

display: flex;
  flex-direction: column;
  padding-top: 30px;
  padding-bottom:30px;
  box-sizing: border-box;
`;

const T = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: #686f7a;
  
`;

const Th = styled.th`
padding:.4rem;
text-transform:capitalize
  text-align:  left;
  font-size: 18px;
  color: #686f7a;
  font-weight: 500;
  opacity: 0.65;
  border: 1px solid #ddd;
  &:hover {
      background:#ddd
    cursor: pointer;
  }
  transition: background 0.3s ease-in-out;
  
`;

const Td = styled.td`
  text-align: left;
  border: 1px solid #ddd;
  padding:0.4rem
  
`;

const Tr = styled.tr`

border-bottom: 2px solid ${rgba(150, 150, 150, 0.5)};

&:nth-child(even) {background: #f2f2f2;};
&:hover {
    background: #b0caf4;
  console
  }
transition: background .3s ease-in-out;
  
`;
const linkStyle = {
    textDecoration: 'none',
    display: 'inline-block',
    color: '#222'
}

const Table = ({ columns, users }) => {
     
    const [sortDir, setSortDir] = useState('asc')

    const sortbyCol = (key) => {
       
            if (sortDir === 'asc'){
                users.sort(function (a, b) {
                    if (a[key] < b[key]) return -1;
                    if (a[key] > b[key]) return 1;
                    return 0;
                })
                setSortDir('desc')
               
            }
            else if (sortDir === 'desc'){
                users.sort(function (a, b) {
                    if (a[key] < b[key]) return 1;
                    if (a[key] > b[key]) return -1;
                    return 0;
                })
                setSortDir('asc')
            }
    }

    const renderColumns = () => {
        return columns.map((col, index) => {
           let col_str = col.replace(/_/, ' ');  
            return (
                <Th onClick={() => sortbyCol(col)} key={index}>
                {col_str}
                <FaSort />                
                </Th>
            )
        })
    }

    const renderRows = (usersa) => {
        return usersa.map(user => {
            return (
                <Tr key={user.id} >
                    {renderCells(user)}
                </Tr>

            )
        })

    }

    const renderCells = (user) => {
        let arr = [];
        for (let [key, value] of Object.entries(user)) {
            if (key === 'id') continue;
            arr.push(value)
        }
        return arr.map((item, index) => {
            return (
                <Td
                    key={index}>
                    <Link key={index}
                        style={linkStyle}
                        to={`/users/${user.id}`}>
                        {item}
                    </Link>
                </Td>
            )
        });
    }
   
    return (

        <Main>
            <T>
                <thead>
                    <tr>{renderColumns()}</tr>
                </thead>
                <tbody>{renderRows(users)}</tbody>
            </T>

        </Main>
    )


}

Table.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.string).isRequired,
    users:PropTypes.arrayOf(PropTypes.object).isRequired,
    
  
  };
export default Table
