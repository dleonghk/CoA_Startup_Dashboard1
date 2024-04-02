// AboutUs.tsx
import React from "react";
import { Card } from "@tremor/react";

const AboutUs: React.FC = () => {
  const teamMembers = [
    { name: "Dickson Leong", role: "Frontend Developer", description: "Responsible for designing and implementing the user interface." },
    { name: "Alex Forbes", role: "Backend Developer", description: "Handles the server-side logic and database management." },
    { name: "Darren Ni", role: "UI/UX Designer", description: "Creates intuitive and visually appealing user experiences." },
    { name: "Aaron Zaiman", role: "Quality Assurance", description: "Ensures the quality and reliability of the website through testing." },
    { name: "Yasasvi Josyula", role: "Content Writer", description: "Writes engaging and informative content for the website." },
    { name: "Doron Czarny", role: "Project Manager", description: "Coordinates project tasks and ensures timely delivery." },
    { name: "Lachlan Spangler", role: "Marketing Specialist", description: "Promotes the website and attracts users through various marketing channels." },
  ];

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-cyan-200 mb-8">About Us Page</h1>

      <div className="grid grid-cols-1 gap-6">
        <Card className="bg-slate-800 border-none p-6">
          <h2 className="text-xl font-bold mb-4 text-cyan-200">Meet the Team</h2>
          <ul className="divide-y divide-cyan-700">
            {teamMembers.map((member, index) => (
              <li key={index} className="py-4">
                <h3 className="text-lg font-semibold mb-2 text-cyan-200">{member.name}</h3>
                <p className="text-sm text-cyan-100 mb-1">{member.role}</p>
                <p className="text-sm text-cyan-100">{member.description}</p>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="bg-slate-800 border-none p-6">
          <h2 className="text-xl font-bold mb-4 text-cyan-200">Our Mission</h2>
          <p className="text-sm text-cyan-100">
            The mission of our project is to develop a comprehensive analysis and visualization of the startup ecosystem in Atlanta, aiming to provide vital insights for the City of Atlanta and potential investors. Through ecosystem mapping, defining key metrics, benchmarking against national and global standards, and identifying challenges and successes, we seek to offer a dynamic overview of Atlanta's economic metrics, highlight growth trends and investment opportunities, and ultimately contribute to fostering a thriving entrepreneurial environment in the city.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default AboutUs;
