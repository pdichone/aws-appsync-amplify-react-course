import React , {Component} from 'react'



class Header extends Component {
    
    render() {
    return(
        <header style={{textAlign: 'center'}}>
            <h1 style={headerStyle}>Self. Gratitude. Blog </h1>
        </header>
    )
    }

   
}
const headerStyle = {
    background: '#353635',
    color: '#fff',
    textAlign: 'center',
    padding: '10px'
}
export default Header