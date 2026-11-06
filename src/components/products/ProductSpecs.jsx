export default function ProductSpecs({ specs }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <tbody>
          {specs.map((spec, index) => (
            <tr
              key={index}
              className={`border-b border-steel-200 transition-colors hover:bg-primary-50 ${
                index % 2 === 0 ? 'bg-white' : 'bg-steel-50'
              }`}
            >
              <td className="py-4 px-6 font-cairo font-bold text-primary-800">
                {spec.label}
              </td>
              <td className="py-4 px-6 text-steel-700">
                {spec.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
