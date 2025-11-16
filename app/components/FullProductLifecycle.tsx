interface FullProductLifecycleProps {
  lifecycle: {
    title: string;
    intro: string;
    phases: Array<{
      title: string;
      text: string;
    }>;
  };
}

export default function FullProductLifecycle({ lifecycle }: FullProductLifecycleProps) {

  return (
    <section id="lifecycle" className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{lifecycle.title}</h2>
          <p className="text-lg text-gray-700 leading-relaxed">{lifecycle.intro}</p>
        </div>

        {/* Lifecycle Phases Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {lifecycle.phases.map((phase, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-8 shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mt-2">{phase.title}</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">{phase.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

