import React from 'react';
import {Link} from 'react';

export const Menu = (props) => {
    return(
        <div className="row">
        <div className="col">
            <nav className="navbar navbar-expand-lg navbar-light bg-success">
            <a className="navbar-brand" href="/">Accueil</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                    <a className="nav-item nav-link active" href="/admin">Espace Admin</a>
                        {/* <a className="nav-item nav-link active" href="/annonces">Annonces <span className="sr-only">(current)</span></a>
                        <a className="nav-item nav-link" href="/formAnnonce">Déposer une annonce</a>
                        <a className="nav-item nav-link" href="/favoris">Mes favoris</a> */}
                        {/* <a class="nav-item nav-link" href="#">Pricing</a>
                        <a class="nav-item nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a> */}
                    </div>
                </div>
            </nav>
        </div>
    </div>
    )
}

export default Menu;