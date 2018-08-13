import React from 'react';
import cleaner from '../../ingredients/cleaner';
import analyze from '../../ingredients/analyze';
import detector from '../../ingredients/detector';

import ResultListing from './resultlisting';
import ProductListing from './productlisting';
import Link from 'gatsby-link'


import { Button, Form, FormGroup, Label, Input, FormText, Card, CardTitle, CardText, CardSubtitle} from 'reactstrap';

/* todo
     ReactGA.event({
        category: 'curlsbot',
        action: text,
        label: notCG
      });
*/

class Results extends React.Component {

  render() {
    let results = this.props.data;
    let sodiumc14 = false;
    let parabens = false;
    let soap = false;

    if (results.other.caution.includes("sodiumc14")){
         sodiumc14 = true;
    }

    if (results.other.caution.includes("parabens")){
         parabens = true;
    }

    if (results.other.bad.includes("soap")){
         soap = true;
    }
    return (
      <div >

      {results.silicones.bad.length > 0 &&
        <Card body outline color="danger">
        <CardTitle>Silicones Detected</CardTitle>
        <CardSubtitle>I'm 99% sure these are non-CG silicones, which means they are not water soluble and can build up in your hair.</CardSubtitle>
        <CardText><ResultListing list={results.silicones.bad}/>

        </CardText>
        </Card>

      }
      {results.silicones.caution.length > 0 &&
        <Card body outline color="warning">
        <CardTitle>Water Soluble Silicones</CardTitle>
        <CardSubtitle>These silicones are water soluble because they contain the prefixes ppg or peg. They may be fine for many people, but Lorraine Massey says <a href="https://www.facebook.com/eligenuario/photos/a.1108591662605744.1073741828.1108572312607679/1229058860559023/?type=3&theater">she doesn't recommend using them:</a></CardSubtitle>
        <CardText><ResultListing list={results.silicones.caution}/></CardText>
        </Card>
      }
      {results.silicones.unknown.length > 0 && 
        <Card body outline color="warning">
        <CardTitle>Unknown Silicones</CardTitle>
        <CardSubtitle>I don't know these silicones yet, but if you <a href="http://m.me/curlsbot">message me I'll take a personalized look and get back to you ASAP!</a>:</CardSubtitle>
        <CardText>
        <ResultListing list={results.silicones.unknown}/>
        </CardText>
        </Card>
      }

      {results.sulfates.bad.length > 0 && 
       <Card body outline color="danger">
       <CardTitle>Harsh Sulfates Detected</CardTitle>
       <CardSubtitle>Yikes! These are either harsh sulfates or similar sulfer-based compounds which are not curly girl approved:</CardSubtitle>
       <CardText><ResultListing list={results.sulfates.bad}/>

       </CardText>
       </Card>
     }

     {results.sulfates.good.length > 0 && 
      <Card body outline color="success">
      <CardTitle>Curly Girl Approved Sulfates/Sulfate-like ingredients</CardTitle>
      <CardSubtitle>These are either gentle CG-approved sulfates or non-cleanser sulfates (like magnesium sulfate which is used to provide texture)</CardSubtitle>
      <CardText><ResultListing list={results.sulfates.good}/></CardText>
      </Card>
    }


    {results.alcohol.bad.length > 0 && 
      <Card body outline color="danger">
      <CardTitle>Harsh Alcohols Detected</CardTitle>
      <CardSubtitle>These alcohols will dry out your hair, they are not curly girl approved:</CardSubtitle>
      <CardText><ResultListing list={results.alcohol.bad}/>

      </CardText>
      </Card>

    }

    {results.alcohol.good.length > 0 && 
      <Card body outline color="success">
      <CardTitle>Curly Girl Approved Alcohols</CardTitle>
      <CardSubtitle>These alcohols won't dry our your hair, they are curly girl approved:</CardSubtitle>
      <CardText><ResultListing list={results.alcohol.good}/></CardText>
      </Card>
    }
    {results.alcohol.unknown.length > 0 && 
      <Card body outline color="warning">
      <CardTitle>Unknown Alcohols</CardTitle>
      <CardSubtitle>I don't know anything about these alcohols, but if you <a href="http://m.me/curlsbot">message me I'll take a personalized look and get back to you ASAP!</a></CardSubtitle>
      <CardText>
      <ResultListing list={results.alcohol.unknown}/>
      </CardText>
      </Card>

    }

    {results.wax.good.length > 0 && 
      <Card body outline color="success">
      <CardTitle>Ok Waxes & Oils</CardTitle>
      <CardSubtitle>These have been modified to make them water soluble: </CardSubtitle>
      <CardText><ResultListing list={results.wax.good}/></CardText>
      </Card>

    }

    {results.wax.bad.length > 0 && 
      <Card body outline color="danger">
      <CardTitle>Non-Curly Girl Waxes and Oils Detected </CardTitle>
      <CardSubtitle>These waxes and oils can cause buildup that is difficult to remove and keeps your hair from absorbing moisture properly:</CardSubtitle>
      <CardText><ResultListing list={results.wax.bad}/>

      </CardText>
      </Card>

    }

    {results.wax.unknown.length > 0 && 
      <Card body outline color="warning">
      <CardTitle>Unknown Waxes and Oils</CardTitle>
      <CardSubtitle>These are some waxes and castor oil types I don't know about, but if you <a href="http://m.me/curlsbot">message me I'll take a personalized look and get back to you ASAP!</a> </CardSubtitle>
      <CardText>
      <ResultListing list={results.wax.unknown}/>
      </CardText>
      </Card>
    }

    {results.other.caution.length > 0 && 
      <Card body outline color="warning">
      <CardTitle>Use caution</CardTitle>

      <CardText>
        {sodiumc14 && <div>
          <strong>Sodium c14-16 olefin sulfonate</strong> is not a traditional sulfate but some people find it drying. If you have high or normal porosity, use only for occasional clarifying.
        </div> }


        {parabens && <div>
          <strong>Parabens</strong>: Lorraine Massey cautions against these in the Curly Girl Handbook saying "In recent years, they’ve become controversial as experts question whether they are safe. (Some say they may be linked to cancer.)" We recommend we do your own research. 
        </div> }
      </CardText>
      </Card>
    }
    {results.other.bad.length > 0 && 
      <Card body outline color="danger">
      <CardTitle>Other Non-CG ingredients</CardTitle>

      <CardText>
        {soap && <div>
          <strong>Soap</strong> the ingredients indicate that this contains soap. Soap is as harsh as sulfates. In addition many soap bars are not properly pH balanced which can further damage hair. I have emailed Lorraine Massey and she says she considers it non-CG. <a href="http://m.me/curlsbot">If you don't think this contains soap, please message me and let me know.</a> 
        </div> }


      </CardText>
      </Card>
    }





    </div>
    );

}

}


export default Results;


