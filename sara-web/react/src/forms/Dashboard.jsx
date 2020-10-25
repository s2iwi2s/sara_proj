import React from 'react';
import faker from 'faker'

import AuthenticationService from '../security/AuthenticationService'

const Dashboard = props => {
  const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
  return (
    <div className="container marketing pt-4">

      <div className="row">
        <div className="col-lg-4">
          <img alt="" className="bd-placeholder-img rounded-circle" width="140" height="140" src={faker.image.fashion(140, 140)} />
          <h2>{faker.commerce.productName()}</h2>
          <p>{faker.random.words(30)}</p>
          <p><a className="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
        </div>
        <div className="col-lg-4">
          <img alt="" className="bd-placeholder-img rounded-circle" width="140" height="140" src={faker.image.business(140, 140)} />
          <h2>{faker.commerce.productName()}</h2>
          <p>{faker.random.words(30)}</p>
          <p><a className="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
        </div>
        <div className="col-lg-4">
          <img alt="" className="bd-placeholder-img rounded-circle" width="140" height="140" src={faker.image.people(140, 140)} />
          <h2>{faker.commerce.productName()}</h2>
          <p>{faker.random.words(30)}</p>
          <p><a className="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
        </div>
      </div>
      {isUserLoggedIn &&
        <>
          <hr className="featurette-divider" />

          <div className="row featurette">
            <div className="col-md-7">
              <h2 className="featurette-heading">First featurette heading. <span className="text-muted">It’ll blow your mind.</span></h2>
              <p className="lead">{faker.random.words(50)}</p>
            </div>
            <div className="col-md-5">
              <img alt="" className="bd-placeholder-img rounded-circle" width="500" height="500" src={faker.image.business(500, 500)} />
            </div>
          </div>

          <hr className="featurette-divider" />

          <div className="row featurette">
            <div className="col-md-7 order-md-2">
              <h2 className="featurette-heading">Oh yeah, it’s that good. <span className="text-muted">See for yourself.</span></h2>
              <p className="lead">{faker.random.words(20)}</p>
            </div>
            <div className="col-md-5 order-md-1">
              <img alt="" className="bd-placeholder-img rounded-circle" width="500" height="500" src={faker.image.transport(500, 500)} />
            </div>
          </div>

          <hr className="featurette-divider" />

          <div className="row featurette">
            <div className="col-md-7">
              <h2 className="featurette-heading">And lastly, this one. <span className="text-muted">Checkmate.</span></h2>
              <p className="lead">{faker.random.words(30)}</p>
            </div>
            <div className="col-md-5">
              <img alt="" className="bd-placeholder-img rounded-circle" width="500" height="500" src={faker.image.sports(500, 500)} />
            </div>
          </div>

          <hr className="featurette-divider" />
        </>}
    </div >
  )
}
export default Dashboard;