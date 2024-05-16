
import React from "react";
import { useNavigate } from "react-router-dom";

export interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/viewer"); // Redirect to the Viewer component
  };

  return (
    <section>
      <section id="navbar">
        <a href="/" id="logoA">
          <h1 id="logo">BIM Model Analyzer</h1>
        </a>
        {}
      </section>
      <section id="home">
        <h1 id="homeH1">Effortless Revit BOM Management</h1>
        <p id="homeP">
          Discover seamless Bill of Material management for Revit projects with
          our platform! Upload your Revit files, visualize the model, and with a
          click, generate accurate Bills of Material. Powered by Autodesk Forge
          API, our system ensures efficiency and accuracy in data extraction.
          Download your Bill of Material in Excel format for easy cost
          estimation and project planning. Simplify your Revit workflow today!
        </p>

        <button className="Landingbtn" onClick={handleButtonClick}>
          Go to BIM Model Analyzer <i className="fi fi-rr-arrow-right"></i>
        </button>
        <section id="howToUse">
          <h1>How to Use</h1>
          <div id="leftContent">
            <div id="left">
              <h3>Step - 1</h3>
              <h1>Upload a Revit File</h1>
              <p>
              The user is required to upload a Revit file from their computer.
              </p>
            </div>
            <div id="right">
              <div className="c-Box">
                <img src="images/step1.jpg" alt="" />
              </div>
            </div>
          </div>
          <div id="leftContent">
            <div id="right">
              <div className="c-Box">
                <img src="images/step2.jpg" alt="" />
              </div>
            </div>
            <div id="left">
              <h3>Step - 2</h3>
              <h1>Displaying the Revit model.</h1>
              <p>
              The Revit file is displayed in the Revit model section.
              </p>
            </div>
          </div>
          <div id="leftContent">
            <div id="left">
              <h3>Step - 3</h3>
              <h1>Calculating Bill Of Material</h1>
              <p>
              The user will receive a Bill of Material for the Revit file.
              </p>
            </div>
            <div id="right">
              <div className="c-Box">
                <img src="images/step3.jpg" alt="" />
              </div>
            </div>
          </div>
          <div id="leftContent">
            <div id="right">
              <div className="c-Box">
                <img src="images/step4.jpg" alt="" />
              </div>
            </div>
            <div id="left">
              <h3>Step - 4</h3>
              <h1>Download Bill of Material</h1>
              <p>          
               Users can download the Bill of Material in Excel format.
              </p>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
};

export default HomePage;
