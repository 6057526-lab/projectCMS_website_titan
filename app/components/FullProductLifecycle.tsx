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
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{lifecycle.title}</h2>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">{lifecycle.intro}</p>
        </div>

        {/* Lifecycle Phases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {lifecycle.phases.map((phase, index) => (
            <article
              key={index}
              className="bg-white rounded-lg p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
            >
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg md:text-xl mr-4">
                  {index + 1}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mt-1">{phase.title}</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-base pl-0 md:pl-16">{phase.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
