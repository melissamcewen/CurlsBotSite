import React from 'react';

export default function ProductComparisonTable() {
  return (
    <div className="overflow-x-auto rounded-xl my-6">
      <table className="table table-zebra w-full bg-base-100">
        <thead>
          <tr>
            <th></th>
            <th>Curly</th>
            <th>Wavy</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Pre-poo</td>
            <td>Curly pre-poo</td>
            <td>Optional, but high protein can help boost waves</td>
          </tr>
          <tr>
            <td>Co-wash</td>
            <td>Curly products</td>
            <td>Skip this</td>
          </tr>
          <tr>
            <td>Shampoo</td>
            <td>Curly shampoo</td>
            <td>Volumizing regular shampoo</td>
          </tr>
          <tr>
            <td>Clarifying Shampoo</td>
            <td>Curly clarifying shampoo</td>
            <td>Optional but essential if using curly products</td>
          </tr>
          <tr>
            <td>Conditioner</td>
            <td>Curly conditioner</td>
            <td>Volumizing regular conditioner</td>
          </tr>
          <tr>
            <td>Deep Conditioner</td>
            <td>Curly deep conditioner</td>
            <td>Skip it or very occasionally</td>
          </tr>
          <tr>
            <td>Leave-In</td>
            <td>Curly leave-in</td>
            <td>Skip this or spray 10-in-1 leave in from regular section</td>
          </tr>
          <tr>
            <td>Cream</td>
            <td>Curly cream</td>
            <td>Skip this</td>
          </tr>
          <tr>
            <td>Gel</td>
            <td>Any gel is fine</td>
            <td>Any gel is fine</td>
          </tr>
          <tr>
            <td>Hairspray</td>
            <td>Curly hair spray</td>
            <td>Regular hair spray</td>
          </tr>
          <tr>
            <td>Mousse</td>
            <td>Any mousse is fine</td>
            <td>Any mousse is fine</td>
          </tr>
          <tr>
            <td>Oil</td>
            <td>Any oils can work but varies</td>
            <td>Skip it or go for a oil/water emulsion/serum instead</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
