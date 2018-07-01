import React from 'react';
import cleaner from '../../ingredients/cleaner';
import analyze from '../../ingredients/analyze';
import detector from '../../ingredients/detector';

import ResultListing from './resultlisting';
import ProductListing from './productlisting';
import Link from 'gatsby-link'


import { Button, Form, FormGroup, Label, Input, FormText, Card, CardTitle, CardText, CardSubtitle} from 'reactstrap';

class Results extends React.Component {


  render() {
  let data = this.props.test;
  let results = analyze(data);
  let detect = "";

  if (data == ""){
    console.log("meow");
  } else {
    detect= detector(results)
  }


  return (
    <div >
    {results.silicones.bad.length > 0 &&
      <Card body outline color="danger">
        <CardTitle>Silicones Detected</CardTitle>
        <CardSubtitle>Yikes, it seems to me this product has these bad silicones, they can build up on your hair and mean this product is not curly girl approved. If you believe they might actually be water soluble <a href="http://m.me/curlsbot">message me - I'll take a personalized look and get back to you ASAP!</a>:</CardSubtitle>
        <CardText><ResultListing list={results.silicones.bad}/>

        </CardText>
      </Card>

    }
    {results.silicones.good.length > 0 &&
      <Card body outline color="success">
            <CardTitle>OK Silicones</CardTitle>
            <CardSubtitle>These look like 'good silicones' because they are water soluble, they are perfectly OK. You can tell these silicones are OK because they contain the prefixes ppg or peg:</CardSubtitle>
            <CardText><ResultListing list={results.silicones.good}/></CardText>
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

    {results.other.bad.length > 0 && 
      <Card body outline color="danger">
            <CardTitle>Other Water Insoluble Ingredients</CardTitle>
            <CardSubtitle>These ingredients are chemicals known to build up on hair: </CardSubtitle>
            <CardText><ResultListing list={results.other.bad}/></CardText>
           </Card>
    }

    {results.length > 0 &&
        <Card body outline color="success">
            <CardTitle>Questions? Concerns?</CardTitle>

            <Button href="https://www.facebook.com/groups/1804576666517325">Start a discussion at our group</Button>
            <CardText></CardText>
        </Card>
   
      }



      {detect == "bad" &&
        <Card body inverse color="danger">
            <CardTitle>Result: Not Curly Girl Approved</CardTitle>
           <CardText>My final verdict? Looks like this product is NOT curly girl approved. Try checking out one of our recommend products like  <ProductListing /> or take our  <Link to="/porosity/" className="btn btn-secondary">porosity quiz</Link> for customized recommendations.</CardText>
        </Card>
      }

      {detect == "unknown" &&
        <Card body inverse color="warning">
          <CardTitle>Result: Unknown</CardTitle>
           <CardText>My final verdict? I can't say if this is approved or not, you'll need to do your own research by looking up the unknown ingredients or <a href="http://m.me/curlsbot">messaging us</a>. Try checking out one of our recommend products like  <ProductListing /> or take our  <Link to="/porosity/" className="btn btn-secondary">porosity quiz</Link> for customized recommendations. </CardText>
        </Card>
      }

      {detect == "good" &&
        <Card body inverse color="success">
            <CardTitle>Result: Curly Girl Approved</CardTitle>
           <CardText>Woohoo, I can't find anything wrong with this, looks like it's curly girl approved! But don't forget to read the label carefully and do a backup check yourself – ingredients listed online are not always accurate.</CardText>
        </Card>
      }


    </div>
  );

}

}


export default Results;


