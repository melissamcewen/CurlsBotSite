import React from 'react';

export default function RoutineTable() {
  return (
    <div className="overflow-x-auto rounded-xl my-6">
      <table className="table table-zebra w-full bg-base-100">
        <thead>
          <tr>
            <th>Step</th>
            <th>Curly Routine</th>
            <th>Wavy-Curly Routine</th>
            <th>Soft Wavy Routine</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Dry Detangle</td>
            <td>❌ Not recommended</td>
            <td>✅ Optional</td>
            <td>✅ Optional</td>
          </tr>
          <tr>
            <td>Pre-Poo</td>
            <td>Optional for added protection</td>
            <td>
              Optional – try a <strong>protein-rich</strong> pre-poo to boost
              wave/curl formation
            </td>
            <td>
              Optional – use one labeled for <strong>shine or softness</strong>
            </td>
          </tr>
          <tr>
            <td>Shampoo</td>
            <td>Co-wash or gentle sulfate-free shampoo</td>
            <td>Volumizing shampoo</td>
            <td>Volumizing shampoo</td>
          </tr>
          <tr>
            <td>Conditioner</td>
            <td>Rich curly conditioner (for moisture + slip)</td>
            <td>
              Lightweight or volumizing conditioner – just enough to detangle
            </td>
            <td>Any basic conditioner – detangle only if needed</td>
          </tr>
          <tr>
            <td>Step 1: Style</td>
            <td>Leave-in conditioner</td>
            <td>Apply custard or gel on soaking wet hair</td>
            <td>Apply gel on soaking wet hair</td>
          </tr>
          <tr>
            <td>Step 2: Style</td>
            <td>Curl cream on soaking wet hair</td>
            <td>Microplop (light squeeze with towel or tee)</td>
            <td>
              Section hair, <strong>brush style</strong> with BounceCurl Edge
              Define + light heat protectant spray
            </td>
          </tr>
          <tr>
            <td>Step 3: Style</td>
            <td>Glaze gel over damp hair</td>
            <td>
              Section hair, brush style with BounceCurl Volume Brush, then glaze
              mousse on each section
            </td>
            <td>
              <strong>Halo diffuse</strong> for ~10 minutes
            </td>
          </tr>
          <tr>
            <td>Step 4: Drying</td>
            <td>Halo diffuse → Pixie diffuse until dry</td>
            <td>
              Pixie diffuse to ~60%, scrunch in more mousse (
              <strong>Smasters method</strong>), then diffuse until dry
            </td>
            <td>Finish with pixie diffusing or air-drying</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
