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
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {company.title}
            </h2>
            <p className="text-lg md:text-xl text-primary font-semibold">{company.subtitle}</p>
          </div>

          {/* Content */}
          <article className="bg-white rounded-xl shadow-sm p-6 md:p-12 border border-gray-100">
            <div className="prose prose-base lg:prose-lg max-w-none text-gray-700">
              {company.text.split("\n").map((paragraph, index) => (
                <p key={index} className="leading-relaxed mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Slogan */}
            <div className="mt-10 pt-8 border-t-2 border-primary/10">
              <p className="text-2xl md:text-3xl font-bold text-center text-primary mb-4">
                {company.slogan}
              </p>
              <p className="text-base md:text-lg text-center text-gray-600">{company.finalCta}</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
