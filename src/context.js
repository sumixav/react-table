import React, { Component } from 'react'
const UserContext = React.createContext();

class UserProvider extends Component {
    state = {
        users: [],
        sortedUsers:[],
        searchText: '',
        columns:[],
        pages:[],
        currentPage:null,
        totalPages:0,
        loading:true,
        maxRecordsPerPage: 5,
        currentUsers:[],
        matchedUsers:[],
        isMatchedUsers: false

    }

    getTotalPages = () =>{
        
        return (this.state.users.length / this.state.maxRecordsPerPage)
    }

    getPages = () =>{

    }
    onPageChanged = (data) => {
        const { users } = this.state;
        const { currentPage, totalPages, pageLimit } = data;

        const offset = (currentPage - 1) * pageLimit;
        const currentUsersA = users.slice(offset, offset + pageLimit);

        this.setState({currentPage, totalPages, currentUsers:currentUsersA});


    }

    findUserbyId = (idstr) =>{
        let id = parseInt(idstr)
        let arr = this.state.users;
        return arr.find(item =>{            
            return (item.id === id)
        })
        
    }


    handleSearch = (name) =>{
 
        let arr = [...this.state.users]
        let matchedUsers = [];
        for (let element of arr){
            if (element['first_name'].toLowerCase() === name.toLowerCase()){
                matchedUsers.push(element)
            }
        }
        console.log(matchedUsers);
        console.log(matchedUsers.length)
        if (matchedUsers.length !== 0)  {this.setState({matchedUsers:matchedUsers, isMatchedUsers:true} )} 
        else { this.setState({matchedUsers:[], isMatchedUsers : false})}
      
    }
    getData = async() => {
        try{
            let res = await fetch('http://demo9197058.mockable.io/users')
            let data = await res.json();
            console.log(data)
        let elem = data[0];
        var clone = Object.assign({}, {...elem});
        delete clone.id;
        this.setState({
            users: data,
            sortedUsers:[],
            currentUsers:[],
            columns: Object.keys(clone),
            loading:false,
        })

        return this.state.users
    }catch(err){
        console.log(err)
    }
    }

    

    handleChange = (event) =>{
        console.log(event.target.value)
    }

    componentDidMount(){
        this.getData();
    }

    render() {
        return (
            <UserContext.Provider
                value={{ ...this.state, getUserbyFirstName : this.getUserbyFirstName, handleSearch:this.handleSearch, findUserbyId: this.findUserbyId, getTotalPages: this.getTotalPages, getData:this.getData, onPageChanged:this.onPageChanged }}>
                {this.props.children}
            </UserContext.Provider>
        );
        
    }
}



export { UserProvider, UserContext }
