import React from "react";


export default class Header extends React.Component {

    render() {
        return (
            <>
                <nav className="navbar text-white bg-dark">
                    <h3><a href="/" style={{ color: "white", textDecoration: "none" }}>Lorem Ipsum</a></h3>
                    {this.props.children}
                </nav>

            </>
        );
    }
}