interface VentajasDesventajasProps {
  ventajas: string[]
  desventajas: string[]
}

export function VentajasDesventajas({ ventajas, desventajas }: VentajasDesventajasProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50">
        <h3 className="text-primary font-bold text-xl mb-5 flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Ventajas
        </h3>
        <ul className="space-y-3">
          {ventajas.map((item, index) => (
            <li key={index} className="flex items-start gap-3 text-sm text-foreground/75 leading-relaxed">
              <span className="text-primary mt-0.5">•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50">
        <h3 className="text-rose-500 font-bold text-xl mb-5 flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          Desventajas
        </h3>
        <ul className="space-y-3">
          {desventajas.map((item, index) => (
            <li key={index} className="flex items-start gap-3 text-sm text-foreground/75 leading-relaxed">
              <span className="text-rose-500 mt-0.5">•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
