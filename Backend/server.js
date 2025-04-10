import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.API_KEY;

// Function to make the Gemini API call
async function callGeminiAPI(inputText) {
  try {
      const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDtAu_iWTatGcXZucyYEJH0Vcwf7hSJi54`,
          {
              model: "gemini-2.0-flash",
              contents: [
                  {
                      parts: [
                          {
                              text: inputText, 
                          },
                      ],
                  },
              ],
          },
          {
              headers: {
                  'Content-Type': 'application/json',
              },
          }
      );
      return response.data;
  } catch (error) {
      console.error("Error in Gemini API call:", error.response?.data || error.message);
      throw error; // Re-throw the error for the calling function to handle
  }
}

// Main function to test the API
// async function main() {
//     const inputText = "What is AI?";

//     try {
//         const response = await callGeminiAPI(inputText);
//         console.log("API Response (main):", response);
//     } catch (error) {
//         console.error("Error in main function:", error.response?.data || error.message);
//     }
// }

// // Call the main function for testing (consider removing in production)
// main();

app.post('/api/generate', async (req, res) => {
    const { inputText } = req.body;

    if (!inputText) {
        return res.status(400).json({ error: "Missing 'inputText' in the request body" });
    }

    try {
        const data = await callGeminiAPI(inputText);
        res.json(data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            error: error.response?.data || "Failed to fetch response from API",
        });
    }
});

const PORT = process.env.PORT || 5000; // Use environment variable for port
app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
});