import Navbar from '../components/Navbar';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const About = () => {
  const [hovered, setHovered] = useState(null);


  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-6 md:px-12">
          {/* Intro Section */}
          <div className="mb-16">
            <h1 className="text-5xl font-extrabold text-gray-900 text-center leading-tight mb-8">
              Transforming Lives Through Ethical Pet Adoption
            </h1>
            <p className="text-xl text-gray-700 text-center max-w-4xl mx-auto leading-relaxed">
              At <span className="text-orange-600 font-bold">PawNest</span>, we believe every pet deserves a second chance. Our mission is to connect pets with loving families, advocate responsible rehoming practices, and inspire communities to make compassionate decisions. Together, we can reduce pet homelessness and create a world where every animal feels safe, loved, and valued.
            </p>
          </div>

          {/* Our Approach Section */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">Our Vision & Approach</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-white p-8 shadow-lg rounded-lg">
                <h3 className="text-2xl font-semibold text-orange-600 mb-4">A Pet's Journey Home</h3>
                <p className="text-gray-700 leading-relaxed">
                  From the moment a pet joins our platform, we ensure they receive the attention they deserve. Each pet profile is crafted to showcase their unique traits and needs, helping potential adopters find the perfect match.
                </p>
              </div>
              <div className="bg-white p-8 shadow-lg rounded-lg">
                <h3 className="text-2xl font-semibold text-orange-600 mb-4">Community Collaboration</h3>
                <p className="text-gray-700 leading-relaxed">
                  We collaborate with shelters, rescues, and individuals to provide a seamless adoption process. Our focus on transparency ensures trust and confidence in every adoption story.
                </p>
              </div>
            </div>
          </div>

          {/* Core Values Section */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 shadow-lg rounded-lg">
                <h3 className="text-2xl font-bold text-orange-600 mb-4">Kindness To All</h3>
                <p className="text-gray-700 leading-relaxed">
                  Every pet deserves kindness and respect. We emphasize compassion in every step of the rehoming process.
                </p>
              </div>
              <div className="bg-white p-6 shadow-lg rounded-lg">
                <h3 className="text-2xl font-bold text-orange-600 mb-4">Transparency</h3>
                <p className="text-gray-700 leading-relaxed">
                  We maintain honesty and openness to build trust between adopters, shelters, and our team.
                </p>
              </div>
              <div className="bg-white p-6 shadow-lg rounded-lg">
                <h3 className="text-2xl font-bold text-orange-600 mb-4">Community Empowerment</h3>
                <p className="text-gray-700 leading-relaxed">
                  By educating and engaging the community, we foster a culture of responsible pet ownership.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Us Section */}
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-8">Get In Touch</h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto mb-6 leading-relaxed">
              Have questions, feedback, or want to get involved? We're here to help. Contact us today and let's make a difference together.
            </p>
            <a
              href="mailto:contact@petrehome.com"
              className="inline-block px-8 py-4 bg-orange-600 text-white text-lg rounded-lg hover:bg-orange-700 transition-colors duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
