import React from 'react';

export default function BondRepairFrameworkTable() {
  return (
    <div className="not-prose overflow-x-auto rounded-2xl my-8 border border-base-300 bg-base-100">
      <table className="table w-full min-w-[36rem]">
        <caption className="sr-only">
          Hair treatments categorized by reactivity and location in the hair
        </caption>
        <thead>
          <tr className="bg-base-200">
            <th scope="col" className="px-4 py-4" />
            <th scope="col" className="px-4 py-4 text-left font-semibold">
              Internal
            </th>
            <th scope="col" className="px-4 py-4 text-left font-semibold">
              Surface
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-base-300">
            <th
              scope="row"
              className="bg-base-50 px-4 py-5 text-left align-top font-semibold"
            >
              Reactive
              <span className="mt-1 block font-normal text-base-content/70">
                (chemical reactions)
              </span>
            </th>
            <td className="px-4 py-5 align-top leading-relaxed">
              Chemical Treatments (bleach, perms, relaxers—and potentially
              covalent bond repair)
            </td>
            <td className="px-4 py-5 align-top leading-relaxed">
              &quot;White space&quot; (rarely used in haircare)
            </td>
          </tr>
          <tr>
            <th
              scope="row"
              className="bg-base-50 px-4 py-5 text-left align-top font-semibold"
            >
              Non-reactive
            </th>
            <td className="px-4 py-5 align-top leading-relaxed">
              Fiber Actives (includes most at-home &quot;bond builders,&quot;
              citric acid, proteins)
            </td>
            <td className="px-4 py-5 align-top leading-relaxed">
              Conditioners (silicones, cationic surfactants, oils)
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
