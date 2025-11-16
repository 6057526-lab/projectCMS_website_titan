interface CompanySectionProps {
  company: {
    title: string;
    subtitle: string;
    text: string;
    slogan: string;
    finalCta: string;
  };
}

export default function CompanySection({ company }: CompanySectionProps) {

  return (
    <section id="company" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {company.title}
            </h2>
            <p className="text-xl text-primary font-semibold">{company.subtitle}</p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              {company.text.split("\n").map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed mb-6">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Slogan */}
            <div className="mt-12 pt-8 border-t-2 border-primary">
              <p className="text-2xl md:text-3xl font-bold text-center text-primary mb-6">
                {company.slogan}
              </p>
              <p className="text-lg text-center text-gray-700">{company.finalCta}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

