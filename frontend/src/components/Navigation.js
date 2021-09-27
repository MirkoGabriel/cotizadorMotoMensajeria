import React, { Component } from 'react'

import img from '../img/logo.png'

export default class Navigation extends Component {
    render() {
        return (
            <nav class="navbar navbar-expand-lg navbar-light bg-dark p-4" id="menu">
                <div class="container-fluid">
                    <a class="navbar-brand col-9" href="/">
                        <img src={img} alt="" id="logo"/>
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link" href="/">Nosotros</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/cotizador">Cotizar</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/">Contacto</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}
