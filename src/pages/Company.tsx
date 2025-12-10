import { Award, Users, Globe, Heart, Leaf, Lightbulb } from "lucide-react";

const Company = () => {
  const values = [
    {
      icon: <Heart className="w-8 h-8 text-emerald-600" />,
      bg: "bg-emerald-100",
      title: "Quality",
      desc: "We deliver premium nursery and farming plants with export-quality standards, ensuring freshness and health in every plant.",
    },
    {
      icon: <Leaf className="w-8 h-8 text-cyan-600" />,
      bg: "bg-cyan-100",
      title: "Sustainability",
      desc: "We're committed to environmental responsibility, promoting sustainable greenery in cities and rural communities.",
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-yellow-600" />,
      bg: "bg-yellow-100",
      title: "Trust",
      desc: "As your trusted partner in growing greener futures, we provide expert care and guidance for all your plant needs.",
    },
  ];

  const stats = [
    {
      icon: <Award className="w-8 h-8 text-white" />,
      bg: "bg-emerald-600",
      value: "Premium",
      color: "text-emerald-600",
      label: "Export Quality Plants",
    },
    {
      icon: <Users className="w-8 h-8 text-white" />,
      bg: "bg-cyan-600",
      value: "1000+",
      color: "text-cyan-600",
      label: "Happy Customers",
    },
    {
      icon: <Globe className="w-8 h-8 text-white" />,
      bg: "bg-yellow-600",
      value: "Global",
      color: "text-yellow-600",
      label: "International Markets",
    },
    {
      icon: <Leaf className="w-8 h-8 text-white" />,
      bg: "bg-green-600",
      value: "500+",
      color: "text-green-600",
      label: "Plant Varieties",
    },
  ];

  const team = [
    {
      img: "https://images.pexels.com/photos/3212513/pexels-photo-3212513.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
      alt: "CEO",
      name: "Rajesh Sharma",
      role: "Chief Executive Officer",
      desc: "Leading VHN Global's mission to connect India's green treasures with the world, with over 20 years in agriculture and exports.",
    },
    {
      img: "https://images.pexels.com/photos/1078736/pexels-photo-1078736.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
      alt: "Head of Operations",
      name: "Priya Patel",
      role: "Head of Operations",
      desc: "Ensuring quality control and sustainable farming practices across our nurseries and export operations.",
    },
    {
      img: "https://images.pexels.com/photos/1123982/pexels-photo-1123982.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
      alt: "Head of International Sales",
      name: "Vikram Singh",
      role: "Head of International Sales",
      desc: "Expanding VHN Global's reach across international markets while maintaining our commitment to quality and sustainability.",
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
              "url('https://images.pexels.com/photos/4207892/pexels-photo-4207892.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop')",
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            About VHN Global
          </h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto mb-4">
            VHN Global delivers premium nursery and farming plants across India
            and international markets—making greenery accessible everywhere.
          </p>
          <p className="text-lg text-emerald-200 font-medium">
            "Growing Green, Connecting Worlds"
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
                  At VHN Global, we believe greenery is more than just
                  plants—it's a way of life. From homes and offices to farms and
                  landscapes, our nursery plants bring freshness, beauty, and
                  sustainability to every space.
                </p>
                <p>
                  We specialize in nursery and farming plants, delivering across
                  India and to international markets with export-quality
                  standards. Whether you're looking for ornamental plants to
                  enhance your home, fruit-bearing trees for your farm, or
                  exotic varieties for landscaping projects, VHN Global is your
                  trusted partner in growing greener futures.
                </p>
                <p>
                  Our mission is simple: Promote sustainable greenery in cities
                  and rural communities, deliver healthy, high-quality plants
                  with expert care, and support farmers, gardeners, and plant
                  lovers with guidance and premium products.
                </p>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.pexels.com/photos/4207892/pexels-photo-4207892.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                alt="VHN Global Nursery"
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
      {/* <section className="py-20">
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
      </section> */}
    </div>
  );
};

export default Company;
