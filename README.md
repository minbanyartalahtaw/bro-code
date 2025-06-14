# Interface for Google Gemini ai API

A modern web application interface for running google gemini ai, built with Next.js for the frontend, Node.js for the backend, and MongoDB for data storage. This guide covers project setup, installation instructions for all dependencies (Node.js, MongoDB) on macOS and Linux, and how to get started.

---

## **Project Features**

- Next.js frontend for interactive user experience
- Node.js backend API for model communication and data management
- MongoDB as the primary database
- Gemini API for AI-powered features

---

## **Installation Guide**

### **Node.js and npm Installation**

#### On macOS

- Download the Node.js macOS installer from [the official Node.js website.](https://nodejs.org/en)
- Verify installation:

```bash
node -v
npm -v
```

You should see version numbers for both Node.js and npm.

#### On Linux (Ubuntu/Debian)

```bash
sudo apt update
sudo apt upgrade
sudo apt install nodejs
sudo apt install npm
node -v
npm -v
```

You should see version numbers confirming successful installation.

---

### **MongoDB Installation**

#### On macOS (with Homebrew)

- Install Homebrew (if not already installed):

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

- Update Homebrew and tap MongoDB formula:

```bash
brew update
brew tap mongodb/brew
```

- Install MongoDB Community Edition:

```bash
brew install mongodb-community
```

#### On Linux (Ubuntu/Debian)

- visit to the [MongoDB Offical Page](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-debian/)

---

## **Getting Started**

#### Download the Project

- Download the project as a ZIP file from https://github.com/minbanyartalahtaw/local-ai-interface
- Extract the ZIP file to your desired directory.

#### Navigate to the Project Directory

```bash
cd path/to/your/project-directory
```

---

## **Project Setup**

#### Install Project Dependencies

```bash
npm install
```

This command installs all required packages for both frontend and backend.

#### Configure Environment Variables

- Create a `.env` file in the root directory.

```bash
MONGODB_URI="mongodb://localhost:27017/bro-code"    # or your mongodb url
AI_MODEL="gemini-2.0-flash"                         # Model You want to use
API_KEY="your-gemini-ai-api"
```

[Click Here to get API key](https://aistudio.google.com/prompts/new_chat)

### Start the Application

- For development:

```bash
npm run dev
```

- For production:

```bash
npm run build
npm start
```

---

## **Summary Table: Installation Steps**

| Component | macOS                               | Linux                                       |
| --------- | ----------------------------------- | ------------------------------------------- |
| Node.js   | Download `.pkg` and install[1]      | `sudo apt install nodejs npm` or use NVM[2] |
| MongoDB   | `brew install mongodb-community`[3] | Download, extract, and run binary[4]        |

---

## **Notes**

- Ensure MongoDB is running before starting the Node.js backend.
- For detailed configuration, consult the respective official documentation for each dependency.

---
