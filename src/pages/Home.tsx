import {
  ArrowRight,
  Leaf,
  Droplets,
  Zap,
  Award,
  Users,
  Globe,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useMainCategories, useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";

const Home = () => {
  const { data: mainCategoriesData } = useMainCategories();
  const { data: featuredProductsData } = useProducts({ page: 0, pageSize: 8 });

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-cyan-900 flex items-center">
        <div className="absolute inset-0 bg-black/30"></div>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/1078736/pexels-photo-1078736.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/70 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-2xl">
            <h3 className="text-lg font-semibold text-white/80 mb-1 tracking-wide">
              Growing Green, Connecting Worlds
            </h3>
            <h1 className="text-5xl lg:text-7xl font-bold mb-4 leading-tight tracking-tight">
              Aquascaping
              <span className="text-cyan-300 block">Excellence</span>
            </h1>
            <p className="text-lg mb-8 text-gray-200 leading-relaxed">
              At VHN Global, we bring you premium nursery and farming
              plants—delivered across India and worldwide—making greenery
              accessible, sustainable, and beautiful for every space.{" "}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="bg-emerald-600 hover:bg-emerald-500 px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center group"
              >
                Explore Products
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              {/* <button className="border-2 border-white hover:bg-white hover:text-emerald-800 px-8 py-4 rounded-lg font-semibold transition-all duration-300">
                Watch Tutorial
              </button> */}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-black text-gray-900 mb-3">
              Why Choose VH Global Trader
            </h2>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto">
              Over 55 years of expertise in aquarium technology and plant
              cultivation
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Leaf className="w-8 h-8 text-emerald-600" />,
                bg: "bg-emerald-100",
                title: "Professional & Trustworthy",
                desc: "VHN Global is a trusted nursery brand delivering premium plants across India and worldwide. From ornamental and indoor plants to farming and landscape solutions, we provide sustainable greenery for every need. Growing nature, growing connections.",
              },
              {
                icon: <Droplets className="w-8 h-8 text-cyan-600" />,
                bg: "bg-cyan-100",
                title: "Customer-Friendly & Warm",
                desc: "At VHN Global, we make it easy to bring nature into your home, farm, or workspace. Our wide range of nursery and farming plants are grown with care and delivered with quality. Together, let’s create a greener tomorrow.",
              },
              {
                icon: <Zap className="w-8 h-8 text-yellow-600" />,
                bg: "bg-yellow-100",
                title: "Export-Focused & Modern",
                desc: "VHN Global specializes in exporting high-quality nursery and farming plants, connecting India’s green treasures with the world. With a commitment to freshness, sustainability, and trust, we’re here to grow with you.",
              },
            ].map((feature, idx) => (
              <div
                key={feature.title}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div
                  className={`w-16 h-16 ${feature.bg} rounded-lg flex items-center justify-center mb-6`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-extrabold text-gray-900 mb-3">
              Product Categories
            </h2>
            <p className="text-xl text-gray-500">
              Everything you need for professional aquascaping
            </p>
          </div>

          {mainCategoriesData?.data ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mainCategoriesData.data.slice(0, 6).map((category) => (
                <Link
                  to={`/products?main=${category.productMainCategoryId}`} 
                  key={category.productMainCategoryId}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden mx-auto rounded-xl mb-4">
                    <img
                      src={`/images/${category.name
                        .toLowerCase()
                        .replace(/ & /g, "_")
                        .replace(/ /g, "_")}.webp`}
                      alt={category.name}
                      className="w-full h-[370px] object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {category.shortDescription}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex justify-center">
              <LoadingSpinner size="lg" />
            </div>
          )}
        </div>
      </section>

      {/* Excellence Section */}
      <section className="py-20 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                55 Years of
                <span className="text-emerald-700 block">Innovation</span>
              </h2>
              <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                Since 1966, VH Global Trader has been at the forefront of
                aquarium technology, developing innovative solutions that help
                aquascapers create and maintain breathtaking underwater worlds.
              </p>

              <div className="grid sm:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div className="font-bold text-2xl text-emerald-600">55+</div>
                  <div className="text-sm text-gray-500">Years Experience</div>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-cyan-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="font-bold text-2xl text-cyan-600">500K+</div>
                  <div className="text-sm text-gray-500">Happy Customers</div>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div className="font-bold text-2xl text-yellow-600">60+</div>
                  <div className="text-sm text-gray-500">Countries</div>
                </div>
              </div>

              <Link
                to="/company"
                className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors group"
              >
                Learn More
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3212513/pexels-photo-3212513.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                alt="Professional Aquascaping"
                className="w-full rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-emerald-600 rounded-xl opacity-20"></div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-cyan-500 rounded-xl opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-heading text-gray-900 mb-3">
              Featured Products
            </h2>
            <p className="text-xl text-gray-500">
              Our most popular aquascaping solutions
            </p>
          </div>

          {featuredProductsData?.data?.content ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProductsData.data.content.slice(0, 8).map((product) => (
                <ProductCard
                  key={product.productId}
                  product={product}
                  viewMode="grid"
                />
              ))}
            </div>
          ) : (
            <div className="flex justify-center">
              <LoadingSpinner size="lg" />
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors group"
            >
              View All Products
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      {/* <section className="py-16 bg-emerald-800 pb-32 -mb-[50px] relative z-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
            Get the latest aquascaping tips, product updates, and exclusive
            offers delivered to your inbox.
          </p>

          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            />
            <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Home;
