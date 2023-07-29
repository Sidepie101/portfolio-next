import React from 'react';
import drinkImage from '/images/drink_manager.png';
import '/styles/Projects.css';
import Image from 'next/image';

function DrinkManagerProject() {
  return (
      <div className="projects-container">
        <h1 className="projects-title">Let's check out some of my projects</h1>
        <div className="project">
          <div className="project-content">
            <div className="project-details">
              <h2 className="project-title">Cafe Manager in C# and SQL</h2>
              <p className="project-description">
                Drink Management App: Developed with C# and SQL Express, this app serves as a comprehensive database
                management tool for drinks. It allows users to create, update, and delete drink entries, while providing
                essential details such as prices, sizes, types, and unique codes for each drink.
              </p>
            </div>
            <Image src={drinkImage} 
            height={400}
            width={700}
            alt="Drink Manager"
            className="project-image-wide" />
          </div>
        </div>
        <div className='link-container'>
        <a href="https://github.com/Sidepie101/Drink-Manager" className="project-link" target="_blank" rel="noopener noreferrer">
        <span> Check the code on GitHub</span> 
          
        </a>
        </div>
      </div>
  );
}

export default DrinkManagerProject;