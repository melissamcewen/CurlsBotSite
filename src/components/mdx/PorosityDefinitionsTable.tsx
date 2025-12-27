import React from 'react';

export default function PorosityDefinitionsTable() {
  return (
    <div className="overflow-x-auto rounded-2xl my-8 not-prose border border-base-300 bg-base-100">
      <table className="table w-full">
        <thead>
          <tr className="bg-base-200">
            <th className="font-semibold text-base py-4 px-4 align-top">
              Porosity Type
            </th>
            <th className="font-semibold text-base py-4 px-4 align-top">
              Damage Definition
            </th>
            <th className="font-semibold text-base py-4 px-4 align-top">
              Internet Definition
            </th>
            <th className="font-semibold text-base py-4 px-4 align-top">
              Future Science-based Definition?
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-base-300">
            <td className="font-semibold text-base-content py-5 px-4 align-top bg-base-50">
              Low porosity
            </td>
            <td className="py-5 px-4 align-top leading-relaxed">
              Healthy hair, can use any products without worrying about damage,
              has optimal moisture naturally
            </td>
            <td className="py-5 px-4 align-top leading-relaxed">
              Water and product resistant hair, sensitive to protein, needs
              special treatments to get moisture in, water based products and
              &quot;light&quot; oils, needs clarifying
            </td>
            <td className="py-5 px-4 align-top leading-relaxed">
              STILL healthy hair, but perhaps treatment and humidity resistant
              due to cuticle thickness, lipids, strand thickness, curvature
            </td>
          </tr>
          <tr className="border-b border-base-300">
            <td className="font-semibold text-base-content py-5 px-4 align-top bg-base-50">
              Normal Porosity
            </td>
            <td className="py-5 px-4 align-top leading-relaxed">
              Same as low porosity
            </td>
            <td className="py-5 px-4 align-top leading-relaxed">
              Healthy hair, can pretty much use anything
            </td>
            <td className="py-5 px-4 align-top leading-relaxed">
              ALSO healthy hair but less treatment and humidity resistant
              because of cuticle thickness, lipids, strand thickness, curvature
            </td>
          </tr>
          <tr className="border-b border-base-300">
            <td className="font-semibold text-base-content py-5 px-4 align-top bg-base-50">
              High porosity
            </td>
            <td className="py-5 px-4 align-top leading-relaxed">
              Damaged hair, can benefit from treatments (bond repair, protein),
              increased water resistance, cationic conditioners
            </td>
            <td className="py-5 px-4 align-top leading-relaxed">
              Easily soaked by water and products, benefits from oils/butters,
              &quot;seal&quot; in moisture to prevent escaping
            </td>
            <td className="py-5 px-4 align-top leading-relaxed">
              Damaged hair, can benefit from treatments (bond repair, protein),
              increased water resistance, cationic conditioners
            </td>
          </tr>
          <tr>
            <td className="font-semibold text-base-content py-5 px-4 align-top bg-base-50">
              Mixed porosity
            </td>
            <td className="py-5 px-4 align-top leading-relaxed">
              Most people have lower porosity towards their roots and higher
              towards the ends. The longer the hair, the higher the porosity
            </td>
            <td className="py-5 px-4 align-top leading-relaxed text-base-content/60">
              -
            </td>
            <td className="py-5 px-4 align-top leading-relaxed">
              Most people have lower porosity towards their roots and higher
              towards the ends. The longer the hair, the higher the porosity
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
