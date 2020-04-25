import React from 'react'

import './TravelPage.module.css'

class Layout extends React.Component {
    render() {

        return (
            <div className="container">
                <Header />
                <Board />
                <SideBar />
                <Footer />

            </div>
        )
    }
}