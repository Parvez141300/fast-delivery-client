import React from "react";

const AboutUs = () => {
  // Dynamic content for About Us
  const aboutContent = {
    companyInfo: {
      name: "Fast Delivery",
      tagline: "Your Trusted Partner in Fast & Reliable Delivery Services",
      description:
        "Fast Delivery is Bangladesh's leading door-to-door delivery service, revolutionizing the way parcels are delivered across the country. With our extensive network and cutting-edge technology, we ensure your packages reach their destination safely, quickly, and affordably.",
      founded: "2024",
      employees: "500+",
      deliveries: "1M+",
    },
    features: [
      {
        icon: "🚚",
        title: "Fast Delivery",
        description:
          "Same-day and next-day delivery options across major cities",
      },
      {
        icon: "💰",
        title: "Affordable Pricing",
        description: "Competitive rates with no hidden charges",
      },
      {
        icon: "📱",
        title: "Real-time Tracking",
        description: "Live tracking of your parcels from pickup to delivery",
      },
      {
        icon: "🛡️",
        title: "Secure Handling",
        description: "100% secure handling with insurance options",
      },
      {
        icon: "🌍",
        title: "Nationwide Coverage",
        description: "Serving all 64 districts of Bangladesh",
      },
      {
        icon: "⏰",
        title: "24/7 Support",
        description: "Round-the-clock customer support service",
      },
    ],
    team: [
      {
        name: "Parvez Hossain Alif",
        position: "CEO & Founder",
        image: "https://i.ibb.co.com/0y2MLK8X/my-passport-pic-93kb.jpg",
        description: "10+ years in logistics and supply chain management",
      },
      {
        name: "Ayesha Siddik",
        position: "COO",
        image: "https://i.ibb.co.com/84451f1W/fotos-H9lg5-Noj660-unsplash.jpg",
        description: "Operations expert with background in e-commerce",
      },
      {
        name: "Abu Sayed",
        position: "CTO",
        image: "https://i.ibb.co.com/0y2MLK8X/my-passport-pic-93kb.jpg",
        description: "Tech enthusiast driving innovation in delivery solutions",
      },
      {
        name: "Sufian Al Mahadi",
        position: "Customer Service Head",
        image: "https://i.ibb.co.com/0y2MLK8X/my-passport-pic-93kb.jpg",
        description: "Dedicated to ensuring exceptional customer experiences",
      },
    ],
    milestones: [
      {
        year: "2024",
        event: "Company Founded",
        description: "Started operations in Dhaka with 10 team members",
      },
      {
        year: "2024",
        event: "10,000 Deliveries",
        description: "Reached milestone of 10,000 successful deliveries",
      },
      {
        year: "2025",
        event: "Nationwide Expansion",
        description: "Expanded services to all 64 districts",
      },
      {
        year: "2025",
        event: "1M+ Deliveries",
        description: "Celebrated 1 million successful deliveries",
      },
    ],
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="hero bg-gradient-to-r from-primary to-secondary text-white rounded-lg">
        <div className="hero-content text-center">
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">
              About {aboutContent.companyInfo.name}
            </h1>
            <p className="text-xl mb-8">{aboutContent.companyInfo.tagline}</p>
            <p className="text-lg opacity-90">
              {aboutContent.companyInfo.description}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-8 bg-base-200 rounded-b-lg shadow-md">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="stat">
              <div className="stat-value text-primary">
                {aboutContent.companyInfo.founded}
              </div>
              <div className="stat-desc">Year Founded</div>
            </div>
            <div className="stat">
              <div className="stat-value text-secondary">
                {aboutContent.companyInfo.employees}
              </div>
              <div className="stat-desc">Team Members</div>
            </div>
            <div className="stat">
              <div className="stat-value text-accent">
                {aboutContent.companyInfo.deliveries}
              </div>
              <div className="stat-desc">Successful Deliveries</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-8">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
            <p>
              We're committed to providing the best delivery experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {aboutContent.features.map((feature, index) => (
              <div
                key={index}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
              >
                <div className="card-body text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="card-title justify-center text-xl mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-8 bg-base-200 rounded-lg">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p>
              The passionate people behind company
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {aboutContent.team.map((member, index) => (
              <div key={index} className="card bg-base-100 shadow-lg">
                <div className="card-body text-center">
                  <div className="flex justify-center">
                  <img src={member?.image} alt={member?.name} className="w-32 h-36 rounded-lg object-cover" />
                  </div>
                  <h3 className="card-title justify-center text-lg">
                    {member.name}
                  </h3>
                  <p className="text-primary font-semibold">
                    {member.position}
                  </p>
                  <p className="text-sm text-gray-600">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Milestones Section */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p>Milestones we're proud of</p>
          </div>

          <div className="timeline">
            {aboutContent.milestones.map((milestone, index) => (
              <div
                key={index}
                className={`timeline-item ${
                  index % 2 === 0 ? "timeline-start" : "timeline-end"
                } mb-8`}
              >
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="card bg-base-100 shadow-lg">
                    <div className="card-body">
                      <div className="badge badge-primary badge-lg mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="card-title text-lg">{milestone.event}</h3>
                      <p>{milestone.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
