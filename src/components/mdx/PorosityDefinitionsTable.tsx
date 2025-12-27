import React from 'react';

export default function PorosityDefinitionsTable() {
  return (
    <div className="overflow-x-auto rounded-2xl my-6 not-prose">
      <table className="table table-zebra w-full bg-base-100">
        <thead>
          <tr>
            <th className="font-semibold">Porosity Type</th>
            <th className="font-semibold">Damage Definition</th>
            <th className="font-semibold">Internet Definition</th>
            <th className="font-semibold">Future Science-based Definition?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="font-medium">Low porosity</td>
            <td>
              Healthy hair, can use any products without worrying about damage,
              has optimal moisture naturally
            </td>
            <td>
              Water and product resistant hair, sensitive to protein, needs
              special treatments to get moisture in, water based products and
              &quot;light&quot; oils, needs clarifying
            </td>
            <td>
              STILL healthy hair, but perhaps treatment and humidity resistant
              due to cuticle thickness, lipids, strand thickness, curvature
            </td>
          </tr>
          <tr>
            <td className="font-medium">Normal Porosity</td>
            <td>Same as low porosity</td>
            <td>Healthy hair, can pretty much use anything</td>
            <td>
              ALSO healthy hair but less treatment and humidity resistant
              because of cuticle thickness, lipids, strand thickness, curvature
            </td>
          </tr>
          <tr>
            <td className="font-medium">High porosity</td>
            <td>
              Damaged hair, can benefit from treatments (bond repair, protein),
              increased water resistance, cationic conditioners
            </td>
            <td>
              Easily soaked by water and products, benefits from oils/butters,
              &quot;seal&quot; in moisture to prevent escaping
            </td>
            <td>
              Damaged hair, can benefit from treatments (bond repair, protein),
              increased water resistance, cationic conditioners
            </td>
          </tr>
          <tr>
            <td className="font-medium">Mixed porosity</td>
            <td>
              Most people have lower porosity towards their roots and higher
              towards the ends. The longer the hair, the higher the porosity
            </td>
            <td>-</td>
            <td>
              Most people have lower porosity towards their roots and higher
              towards the ends. The longer the hair, the higher the porosity
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
