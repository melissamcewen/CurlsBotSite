import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'


const Shea = () => (
  <div>
    <Helmet
      title="Non-curly hair Shea Moisture Products"
      meta={[
        { name: 'description', content: 'Shea Moisture products that are not curly hair approved' },
        { name: 'keywords', content: 'products, Shea Moisture, curly hair, alcohols, sulfates' },
        {
          property: 'og:image',
          content: 'http://www.curlsbot.com/img/icon.png'
        }
      ]}
    />
    <h1>Non-curly hair Shea Moisture Products</h1>
    <p>Shea Moisture is a popular brand for many following the "curly hair" system but unfortunately a few products contain ingredients that <a href="https://www.wikihow.com/Determine-if-a-Hair-Product-is-Curly-Girl-Approved">can dry out hair (alcohols and harsh sulfates) or build up (waxes). I recommend always checking the list and not assuming it's curl-friendly just because it's Shea Moisture. </a> Message <a href="https://www.facebook.com/CurlsBot/">Curlsbot</a> if you know any others.</p>
    <h2>Harsh cleansers</h2>
    <h3>Sodium cocoyl sarcosinate</h3>
    <ul>
      <li>FRAGRANCE-FREE, GLUTEN FREE BABY WASH & SHAMPOO</li>
    </ul>
    <h3>Sodium lauryl sulfoacetate</h3>
    <ul>
      <li>MONGONGO & HEMP SEED OILS HIGH POROSITY MOISTURE-SEAL SHAMPOO</li>
    </ul>

    <hr />
    <h2>Alcohols</h2>
    <h3>Unknown</h3>
    <em>They claim these are "non-drying" but this is impossible to verify if they don't list the specific alcohol</em>
    <ul>
      <li>COCONUT & HIBISCUS FRIZZ-FREE CURL MOUSSE</li>
    </ul>
    <h3>Denatured alcohol</h3>
    <ul>
      <li>MANUKA HONEY & MAFURA OIL INTENSIVE HYDRATION COMPLEX</li>
    </ul>

    <h3>SD Alcohol</h3>
    <ul>
      <li>SACHA INCHI OIL OMEGA-3-6-9 RESCUE + REPAIR HAIR & SCALP TONIC</li>
      <li>FRUIT FUSION COCONUT WATER WEIGHTLESS TEXTURE SPRAY</li>
      <li>FRUIT FUSION COCONUT WATER WEIGHTLESS STYLING MOUSSE</li>
    </ul>

    <h3>Ethanol</h3>
    <ul>
       <li>AFRICAN BLACK SOAP DANDRUFF CONTROL CONDITIONER</li>
       <li>AFRICAN BLACK SOAP DANDRUFF CONTROL SHAMPOO</li>
       <li>AFRICAN BLACK SOAP DANDRUFF CONTROL PRE-POO RINSE</li>

    </ul>

    <h3>Isopropyl alcohol</h3>
    <ul>
      <li>JOJOBA OIL & UCUUBA BUTTER TRACK TENSION & ITCH RELIEF SERUM</li>
      <li>DRAGON'S BLOOD & COFFEE CHERRY VOLUME + LIFTING SPRAY</li>
    </ul>

    <hr />
    <h2>Waxes</h2>
     <ul>
      <li>PEACE ROSE OIL COMPLEX NOURISH & SILKEN CONDITIONER</li>
      <li>RAW SHEA BUTTER & ARGAN OIL REPAIR & TRANSITION KIT</li>
      <li>PEACE ROSE OIL COMPLEX NOURISH & SILKEN HOLD MIST</li>
      <li>PEACE ROSE OIL COMPLEX NOURISH & SILKEN DRY SHAMPOO</li>
      <li>MANUKA HONEY & YOGURT HYDRATE + REPAIR SPLIT END BALM</li>
    </ul>

    <hr />
    <h2>Otherwise Questionable</h2>
    <h3>Dimethiconol Cystheine- possible silicone-like buildup</h3>
     <ul>
      <li>TAHITIAN NONI & MONOI SMOOTH & REPAIR HAIR & SCALP WEEKLY THERAPY</li>
      <li>TAHITIAN NONI & MONOI SMOOTH & REPAIR CONDITIONING SHAMPOO</li>
    </ul>

    <h3>Hydrolyzed Vegetable Protein PG-Propyl Silanetriol- possible silicone-like buildup, but should be water soluble with a strong enough sulfate-free shampoo. Some FB groups list as OK, some do not.</h3>
    <ul>
      <li>JAMAICAN BLACK CASTOR OIL STRENGTHEN & RESTORE SHAMPOO</li>
      <li>JAMAICAN BLACK CASTOR OIL STRENGTHEN & RESTORE LEAVE-IN CONDITIONER</li>
      <li>JAMAICAN BLACK CASTOR OIL STRENGTHEN & RESTORE STYLING LOTION</li>
      <li>JAMAICAN BLACK CASTOR OIL STRENGTHEN & RESTORE TREATMENT MASQUE</li>
      <li>MANUKA HONEY & MAFURA OIL INTENSIVE HYDRATION CONDITIONER</li>
      <li>100% VIRGIN COCONUT OIL LEAVE IN TREATMENT</li>
      <li>JAMAICAN BLACK CASTOR OIL STRENGTHEN & RESTORE MOISTURE THERMAL PROTECT SET & HOLD SPRITZ </li>
      <li>ZANZIBAR MARINE COMPLEX AGE-DEFY & COLOR PROTECT HEAT SHIELD CREAM</li>
      <li>MANUKA HONEY & YOGURT HYDRATE + REPAIR PROTEIN-STRONG TREATMENT 8OZ</li>
      <li>JOJOBA OIL & UCUUBA BUTTER BRAID-UP CONDITIONING GEL</li>
    </ul>


  </div>
)

export default Shea
