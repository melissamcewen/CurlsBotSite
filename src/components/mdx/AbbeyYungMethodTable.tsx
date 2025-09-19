export default function AbbeyYungMethodTable() {
  const steps = [
    {
      step: 1,
      name: 'Pre-wash bond repair treatment',
      productType: 'Bond repair treatment (Eprès Bond Repair Treatment)',
      frequency: '2x a week',
      required: 'Optional',
    },
    {
      step: 2,
      name: 'Pre-shampoo oil treatment',
      productType: 'Oil treatments (OGX Coconut Oil line)',
      frequency: 'As needed',
      required: 'Optional',
    },
    {
      step: 3,
      name: 'Clarifying / deep cleaning shampoo',
      productType: 'Clarifying or purifying shampoos',
      frequency: 'At least once a week',
      required: 'Required',
    },
    {
      step: 4,
      name: 'Gentle cleansing shampoo',
      productType: 'Shampoos for damaged/dry hair or dandruff shampoos',
      frequency: 'Other wash days',
      required: 'Optional',
    },
    {
      step: 5,
      name: 'Post-shampoo bond repair treatment',
      productType: 'Bond treatments (K18, drugstore alternatives)',
      frequency: '2x a week',
      required: 'Optional',
    },
    {
      step: 6,
      name: 'Rinse-out conditioner',
      productType: 'Conditioner, gloss, or mask depending on hair needs',
      frequency: 'Every wash',
      required: 'Required',
    },
    {
      step: 7,
      name: 'Post-wash bond repair',
      productType: 'Bond repair treatment (Living Proof Triple Bond Complex)',
      frequency: 'As needed for very damaged hair',
      required: 'Optional',
    },
    {
      step: 8,
      name: 'Leave-in conditioner + heat protection',
      productType: 'Leave-ins with heat protection (light, medium, or heavy)',
      frequency: 'Every wash',
      required: 'Required',
    },
    {
      step: 9,
      name: 'Styling products',
      productType: 'Mousses, hairsprays, balms, texture sprays',
      frequency: 'As desired',
      required: 'Optional',
    },
    {
      step: 10,
      name: 'Style sealers',
      productType: 'Lotions, creams, oil serums (light, medium, or heavy)',
      frequency: 'After styling',
      required: 'Optional',
    },
    {
      step: 11,
      name: 'Between-wash care',
      productType: 'Masks, mist serums, spray leave-ins, dry shampoo',
      frequency: 'Between washes as needed',
      required: 'Optional',
    },
  ];

  return (
    <div className="overflow-x-auto my-8">
      <table className="table table-xs table-zebra w-full">
        <thead>
          <tr>
            <th className="text-base-content font-semibold">Step</th>
            <th className="text-base-content font-semibold">Name</th>
            <th className="text-base-content font-semibold">Product Type</th>
            <th className="text-base-content font-semibold">Frequency</th>
            <th className="text-base-content font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {steps.map((step) => (
            <tr key={step.step}>
              <td className="font-medium">{`#${step.step}`}</td>
              <td className="font-medium">{step.name}</td>
              <td>{step.productType}</td>
              <td>{step.frequency}</td>
              <td>
                <span
                  className={`badge ${
                    step.required === 'Required'
                      ? 'badge-info'
                      : 'badge-warning'
                  }`}
                >
                  {step.required}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
