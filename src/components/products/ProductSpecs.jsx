export default function ProductSpecs({ specs }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <tbody>
          {specs.map((spec, index) => (
            <tr
              key={index}
              className={`border-b border-mutedGray ${
                index % 2 === 0 ? 'bg-white' : 'bg-white/50'
              }`}
            >
              <td className="py-4 px-6 font-cairo font-bold text-primary">
                {spec.label}
              </td>
              <td className="py-4 px-6 text-black">
                {spec.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
