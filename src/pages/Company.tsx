import React from "react";
import { Award, Users, Globe, Heart, Leaf, Lightbulb } from "lucide-react";

const Company = () => {
  const values = [
    {
      icon: <Heart className="w-8 h-8 text-emerald-600" />,
      bg: "bg-emerald-100",
      title: "Passion",
      desc: "Our love for aquatic life and aquascaping drives every product we create and every service we provide.",
    },
    {
      icon: <Leaf className="w-8 h-8 text-cyan-600" />,
      bg: "bg-cyan-100",
      title: "Sustainability",
      desc: "We're committed to environmental responsibility in all our processes, from production to packaging.",
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-yellow-600" />,
      bg: "bg-yellow-100",
      title: "Innovation",
      desc: "Continuous research and development ensure we stay at the forefront of aquarium technology.",
    },
  ];

  const stats = [
    {
      icon: <Award className="w-8 h-8 text-white" />,
      bg: "bg-emerald-600",
      value: "55+",
      color: "text-emerald-600",
      label: "Years of Excellence",
    },
    {
      icon: <Users className="w-8 h-8 text-white" />,
      bg: "bg-cyan-600",
      value: "500K+",
      color: "text-cyan-600",
      label: "Satisfied Customers",
    },
    {
      icon: <Globe className="w-8 h-8 text-white" />,
      bg: "bg-yellow-600",
      value: "60+",
      color: "text-yellow-600",
      label: "Countries Served",
    },
    {
      icon: <Leaf className="w-8 h-8 text-white" />,
      bg: "bg-green-600",
      value: "200+",
      color: "text-green-600",
      label: "Plant Varieties",
    },
  ];

  const team = [
    {
      img: "https://images.pexels.com/photos/3212513/pexels-photo-3212513.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
      alt: "CEO",
      name: "Dr. Marcus Weber",
      role: "Chief Executive Officer",
      desc: "Leading VH Global Trader's global expansion and innovation initiatives with 25+ years of industry experience.",
    },
    {
      img: "https://images.pexels.com/photos/1078736/pexels-photo-1078736.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
      alt: "CTO",
      name: "Dr. Sarah Chen",
      role: "Chief Technology Officer",
      desc: "Spearheading R&D efforts and breakthrough innovations in aquarium technology and plant cultivation.",
    },
    {
      img: "https://images.pexels.com/photos/1123982/pexels-photo-1123982.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
      alt: "Head of Operations",
      name: "Michael Schmidt",
      role: "Head of Operations",
      desc: "Ensuring quality control and efficient global distribution of our premium product line.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-emerald-800">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/3212513/pexels-photo-3212513.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop')",
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            About VH Global Trader
          </h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
            Leading the aquascaping revolution for over five decades with
            innovative products and unwavering commitment to quality.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-heading font-extrabold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-gray-500 text-lg leading-relaxed">
                <p>
                  Founded in 1966 by Ludwig VH Global Trader, our company began
                  as a small aquarium store in Vinningen, Germany. What started
                  as a passion for aquatic life has evolved into a global leader
                  in aquascaping technology and innovation.
                </p>
                <p>
                  Today, VH Global Trader is synonymous with quality and
                  innovation in the aquarium industry. Our research and
                  development team continuously works to create products that
                  not only meet but exceed the expectations of aquascaping
                  enthusiasts worldwide.
                </p>
                <p>
                  From our state-of-the-art facility in Germany, we supply
                  aquarium professionals and hobbyists in over 60 countries with
                  premium plants, substrates, fertilizers, and complete system
                  solutions.
                </p>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1426718/pexels-photo-1426718.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                alt="VH Global Trader Facility"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-3 font-heading">
              Our Values
            </h2>
            <p className="text-xl text-gray-500">What drives us every day</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div className="text-center" key={i}>
                <div
                  className={`w-16 h-16 ${v.bg} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  {v.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">
                  {v.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <div key={i}>
                <div
                  className={`w-16 h-16 ${s.bg} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  {s.icon}
                </div>
                <div className={`text-3xl font-bold ${s.color} mb-2`}>
                  {s.value}
                </div>
                <div className="text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold font-heading text-gray-900 mb-3">
              Leadership Team
            </h2>
            <p className="text-xl text-gray-500">
              The experts behind our success
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div
                className="bg-white rounded-xl shadow-lg p-8 text-center"
                key={i}
              >
                <img
                  src={member.img}
                  alt={member.alt}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-emerald-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-500 text-sm">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Company;
