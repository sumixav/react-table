import React, { useContext, Fragment } from 'react'
import { UserContext } from '../context'




const Detail = (props) => {
    const context = useContext(UserContext)
    const { id } = props.match.params
    console.log(id)

    const user = context.findUserbyId(id)
    if (!user) {
        return <div>no such user found!</div>
    }
    const { first_name, last_name, company_name, city, state, zip, email, web, age } = user;
 
    return (
        <Fragment>
            <h2>{`${first_name} ${last_name}`}</h2>
            <table className="table">
                <tbody>
                    <tr>
                        <td>Company</td>
                        <td>{company_name}</td>
                    </tr>
                    <tr>
                        <td>City</td>
                        <td>{city}</td>
                    </tr>
                    <tr>
                        <td>State</td>
                        <td>{state}</td>
                    </tr>
                    <tr>
                        <td>ZIP</td>
                        <td>{zip}</td>
                    </tr>
                    <tr>
                        <td>email</td>
                        <td>{email}</td>
                    </tr>
                    <tr>
                        <td>Web</td>
                        <td>{web}</td>
                    </tr>
                    <tr>
                        <td>Age</td>
                        <td>{age}</td>
                    </tr>
                </tbody>
            </table>

        </Fragment>
    )
}

export default Detail

