import React from 'react';
import list from '../data/products'
import ReactGA from 'react-ga'



class ProductListing extends React.Component {
 



  componentWillMount() {

    const pickProduct = 
    list[Math.floor(Math.random() * list.length)];

      this.setState({
      product: pickProduct
    });
  }

  render() {
    return (
       <ReactGA.OutboundLink eventLabel={this.state.product.url} to={this.state.product.url} target="_blank" className="btn btn-secondary">{this.state.product.name} </ReactGA.OutboundLink>
    );

  };

}

export default ProductListing

