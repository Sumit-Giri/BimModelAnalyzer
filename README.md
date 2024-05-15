# BIM Model Analyzer

BIM Model Analyzer is a web application designed to analyze Building Information Models (BIM) and generate a bill of materials (BOM) from them. It utilizes Autodesk Forge Viewer for displaying BIM models and provides functionality to calculate and export BOM data in Excel format.

## Features

- **Autodesk Forge Integration:** Display BIM models in the web interface using Autodesk Forge Viewer.
- **BOM Calculation:** Analyze BIM models to generate a bill of materials including quantities, cost, and total cost of building components.
- **Excel Export:** Export BOM data to Excel format for further analysis and reporting.
- **User-friendly Interface:** Intuitive web interface for uploading BIM files, viewing models, and downloading BOM data.

## Installation

1. Clone the repository:
    ```
    git clone https://github.com/yourusername/BIM-Model-Analyzer.git
    ```

2. Install dependencies:
    ```
    cd BIM-Model-Analyzer
    npm install
    ```

3. Set up Autodesk Forge credentials:
    - Open the `config.ts` file in the project directory.
    - Replace the placeholder values for `FORGE_CLIENT_ID` and `FORGE_CLIENT_SECRET` with your actual Autodesk Forge credentials.
  
4. Start the server:
    ```
    npm start
    ```

5. Open the application in your web browser at [http://localhost:3000](http://localhost:3000).

