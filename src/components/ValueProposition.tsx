import { GraduationCap, Briefcase, Zap, Globe } from "lucide-react";

const ValueProposition = () => {
  const features = [
    {
      icon: GraduationCap,
      title: "Student-Friendly Jobs",
      description: "Flexible opportunities designed around your academic schedule"
    },
    {
      icon: Briefcase,
      title: "Earn While You Learn",
      description: "Gain real-world experience and build your professional network"
    },
    {
      icon: Zap,
      title: "Fast, Secure Payments",
      description: "Get paid quickly and safely for all your completed work"
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "Connect with clients and professionals from around the world"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-primary-light rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:shadow-green transition-smooth">
                  <Icon className="h-8 w-8 text-primary group-hover:text-white transition-smooth" />
                </div>
                <h3 className="text-xl font-semibold text-heading-dark mb-3">
                  {feature.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;