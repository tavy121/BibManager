import React from 'react';
import { Switch, Route} from 'react-router-dom';

import Bibs from './Bibs';
import About from './About'
import BibDetails from './BibDetails';
import AddBib from './AddBib';
import EditBib from './EditBib';

const Main = () =>(
    <main>
        <Switch>
            <Route exact path='/' component={Bibs} />
            <Route exact path='/about' component={About} />
            <Route exact path='/bibs/add' component = {AddBib} />
            <Route exact path='/bibs/edit/:id' component = {EditBib} />
            <Route exact path='/bibs/:id' component = {BibDetails} />
        </Switch>
    </main>
);

export default Main;